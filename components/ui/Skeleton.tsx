import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse bg-gray-200 rounded-xl', className)} />
  )
}

export function MatchCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
      <Skeleton className="h-4 w-24 mb-3" />
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Skeleton className="h-6 w-8 rounded" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-8 w-16 rounded-lg" />
        <div className="flex items-center gap-2 flex-1 justify-end">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-8 rounded" />
        </div>
      </div>
    </div>
  )
}
