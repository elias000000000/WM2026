'use client'

import { PLAYER_AVATARS } from '@/data/teams'
import { cn } from '@/lib/utils'

interface AvatarPickerProps {
  value: string
  color: string
  onChange: (avatar: string) => void
}

export function AvatarPicker({ value, color, onChange }: AvatarPickerProps) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">Avatar</p>
      <div className="flex flex-wrap gap-2">
        {PLAYER_AVATARS.map((av) => (
          <button
            key={av}
            type="button"
            onClick={() => onChange(av)}
            className={cn(
              'w-11 h-11 rounded-full flex items-center justify-center text-xl transition-all active:scale-95',
              value === av
                ? 'ring-2 ring-offset-2 ring-gray-900 scale-110'
                : 'bg-gray-100 hover:scale-105'
            )}
            style={value === av ? { backgroundColor: color } : {}}
          >
            {av}
          </button>
        ))}
      </div>
    </div>
  )
}
