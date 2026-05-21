import { cn } from '@/lib/utils'

interface AvatarProps {
  username: string
  color: string
  avatar: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Avatar({ username, color, avatar, size = 'md', className }: AvatarProps) {
  const sizes = {
    sm: 'w-7 h-7 text-sm',
    md: 'w-9 h-9 text-base',
    lg: 'w-12 h-12 text-xl',
  }

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-medium shrink-0',
        sizes[size],
        className
      )}
      style={{ backgroundColor: color }}
      title={username}
    >
      <span className="leading-none">{avatar}</span>
    </div>
  )
}
