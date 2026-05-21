import { Button } from '@/components/ui/Button'

interface WelcomeStepProps {
  onNext: () => void
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">
          WM 2026 Tippspiel
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Gib deine Tipps ab, bevor das Spiel beginnt. Nach Anpfiff siehst du, was die anderen getippt haben. Wer am Ende die meisten Punkte hat, gewinnt.
        </p>
      </div>

      {/* Scoring example */}
      <div className="bg-gray-50 rounded-2xl p-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">So funktioniert die Wertung:</p>
        <div className="flex flex-col gap-3">
          <ScoringRow
            label="Deutschland vs. Frankreich"
            subLabel="Du tippst 2:1 — Ergebnis ist 2:1"
            points={3}
            pointsLabel="Exaktes Ergebnis"
            color="green"
          />
          <ScoringRow
            label="Deutschland vs. Frankreich"
            subLabel="Du tippst 2:1 — Ergebnis ist 3:1"
            points={2}
            pointsLabel="Richtiger Sieger"
            color="yellow"
          />
          <ScoringRow
            label="Deutschland vs. Frankreich"
            subLabel="Du tippst 1:2 — Ergebnis ist 2:1"
            points={0}
            pointsLabel="Falsch"
            color="red"
          />
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500 space-y-1">
          <p>Halbfinale: doppelte Punkte</p>
          <p>Finale: dreifache Punkte</p>
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-4 text-sm text-blue-700">
        Tipps können bis <strong>30 Minuten vor Anpfiff</strong> abgegeben und geändert werden. Danach sind sie gesperrt.
      </div>

      <Button size="lg" className="w-full" onClick={onNext}>
        Los geht&apos;s
      </Button>
    </div>
  )
}

function ScoringRow({
  label,
  subLabel,
  points,
  pointsLabel,
  color,
}: {
  label: string
  subLabel: string
  points: number
  pointsLabel: string
  color: 'green' | 'yellow' | 'red'
}) {
  const colors = {
    green: 'bg-green-100 text-green-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    red: 'bg-red-100 text-red-600',
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-600">{label}</p>
        <p className="text-xs text-gray-400">{subLabel}</p>
      </div>
      <div className={`shrink-0 px-2.5 py-1 rounded-xl text-xs font-bold ${colors[color]}`}>
        {points === 0 ? '0 Pkt.' : `+${points} Pkt.`}
        <span className="font-normal ml-1">— {pointsLabel}</span>
      </div>
    </div>
  )
}
