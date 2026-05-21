'use client'

import { PLAYER_COLORS } from '@/data/teams'
import { cn } from '@/lib/utils'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">Farbe</p>
      <div className="flex flex-wrap gap-2">
        {PLAYER_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={cn(
              'w-9 h-9 rounded-full transition-all active:scale-95',
              value === color ? 'ring-2 ring-offset-2 ring-gray-900 scale-110' : 'hover:scale-105'
            )}
            style={{ backgroundColor: color }}
            aria-label={color}
          />
        ))}
      </div>
    </div>
  )
}
