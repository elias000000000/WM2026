'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { saveTip } from '@/app/actions/tips'

interface TipInputProps {
  matchId: string
  initialHome?: number
  initialAway?: number
  onSaved?: () => void
}

export function TipInput({ matchId, initialHome = 0, initialAway = 0, onSaved }: TipInputProps) {
  const [home, setHome] = useState(initialHome)
  const [away, setAway] = useState(initialAway)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function change(setter: (v: number) => void, current: number, delta: number) {
    const next = Math.max(0, Math.min(20, current + delta))
    setter(next)
    setSaved(false)
  }

  function handleSave() {
    setError(null)
    startTransition(async () => {
      const result = await saveTip(matchId, home, away)
      if (result.error) {
        setError(result.error)
      } else {
        setSaved(true)
        onSaved?.()
        setTimeout(() => setSaved(false), 2000)
      }
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {/* Home score */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => change(setHome, home, -1)}
            className="w-7 h-7 rounded-lg bg-gray-100 text-gray-600 font-bold text-base flex items-center justify-center active:bg-gray-200 transition-colors"
            disabled={isPending}
          >
            −
          </button>
          <motion.span
            key={home}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="w-8 text-center text-xl font-bold text-gray-900 tabular-nums"
          >
            {home}
          </motion.span>
          <button
            type="button"
            onClick={() => change(setHome, home, 1)}
            className="w-7 h-7 rounded-lg bg-gray-100 text-gray-600 font-bold text-base flex items-center justify-center active:bg-gray-200 transition-colors"
            disabled={isPending}
          >
            +
          </button>
        </div>

        <span className="text-gray-400 font-bold">:</span>

        {/* Away score */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => change(setAway, away, -1)}
            className="w-7 h-7 rounded-lg bg-gray-100 text-gray-600 font-bold text-base flex items-center justify-center active:bg-gray-200 transition-colors"
            disabled={isPending}
          >
            −
          </button>
          <motion.span
            key={away}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="w-8 text-center text-xl font-bold text-gray-900 tabular-nums"
          >
            {away}
          </motion.span>
          <button
            type="button"
            onClick={() => change(setAway, away, 1)}
            className="w-7 h-7 rounded-lg bg-gray-100 text-gray-600 font-bold text-base flex items-center justify-center active:bg-gray-200 transition-colors"
            disabled={isPending}
          >
            +
          </button>
        </div>

        {/* Save button */}
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="ml-auto px-4 py-1.5 rounded-xl text-sm font-semibold transition-all active:scale-95 disabled:opacity-50"
          style={{
            backgroundColor: saved ? '#16A34A' : '#1D4ED8',
            color: 'white',
          }}
        >
          {isPending ? '...' : saved ? 'Gespeichert' : 'Tippen'}
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}
