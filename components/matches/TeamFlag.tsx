import { getTeamName } from '@/data/teams'

interface TeamFlagProps {
  code: string
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
  namePosition?: 'right' | 'below'
  align?: 'left' | 'center' | 'right'
}

export function TeamFlag({
  code,
  size = 'md',
  showName = true,
  namePosition = 'right',
  align = 'left',
}: TeamFlagProps) {
  const isTBD = code === 'TBD'

  const flagSizes = {
    sm: { w: 20, h: 15 },
    md: { w: 28, h: 21 },
    lg: { w: 40, h: 30 },
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-medium',
  }

  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  const { w, h } = flagSizes[size]
  const name = isTBD ? 'TBD' : getTeamName(code)

  if (namePosition === 'below') {
    return (
      <div className={`flex flex-col items-center gap-1 ${alignClasses[align]}`}>
        {isTBD ? (
          <div
            className="bg-gray-200 rounded-sm flex items-center justify-center text-gray-400 text-xs"
            style={{ width: w, height: h }}
          >
            ?
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://flagcdn.com/${w}x${h}/${code}.png`}
            width={w}
            height={h}
            alt={name}
            className="rounded-sm object-cover"
            loading="lazy"
          />
        )}
        {showName && (
          <span className={`${textSizes[size]} text-gray-700 text-center leading-tight`}>
            {name}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${alignClasses[align]}`}>
      {isTBD ? (
        <div
          className="bg-gray-200 rounded-sm flex items-center justify-center text-gray-400 text-xs shrink-0"
          style={{ width: w, height: h }}
        >
          ?
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://flagcdn.com/${w}x${h}/${code}.png`}
          width={w}
          height={h}
          alt={name}
          className="rounded-sm object-cover shrink-0"
          loading="lazy"
        />
      )}
      {showName && (
        <span className={`${textSizes[size]} text-gray-700 truncate`}>{name}</span>
      )}
    </div>
  )
}
