import type { GameData, GameProgress } from '../types'

interface Props { data: GameData; progress: GameProgress; onJumpHome: () => void }

export function ProgressBar({ data, progress, onJumpHome }: Props) {
  const steps = [data.labels.tutorial, ...data.missions.map((mission) => String(mission.number)), 'Resultado']
  const activeIndex = progress.screen === 'landing' ? -1 : progress.screen === 'tutorial' ? 0 : progress.screen === 'final' ? steps.length - 1 : progress.missionIndex + 1
  return (
    <header className="topbar">
      <button className="brand-mark" onClick={onJumpHome} aria-label="Volver al inicio">
        <span className="brand-symbol">✦</span><span>{data.brand}</span>
      </button>
      <nav className="progress-nav" aria-label="Progreso de la misión">
        {steps.map((step, index) => (
          <div className={`progress-step ${index <= activeIndex ? 'is-done' : ''} ${index === activeIndex ? 'is-active' : ''}`} key={step}>
            <span className="progress-dot">{index === 0 ? 'T' : index === steps.length - 1 ? '✓' : index}</span>
            <span className="progress-label">{step}</span>
          </div>
        ))}
      </nav>
      <div className="topbar-actions">
        <span className="mission-count">{Math.max(0, progress.completedMissions.length)} / 7</span>
      </div>
    </header>
  )
}
