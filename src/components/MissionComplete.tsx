import type { Mission } from '../types'

interface Props { mission: Mission; isLast: boolean; onContinue: () => void; label: string }
export function MissionComplete({ mission, isLast, onContinue, label }: Props) {
  return <section className="mission-complete fade-in"><div className="complete-seal">{mission.icon}</div><span className="eyebrow">Misión {String(mission.number).padStart(2, '0')} completada</span><h2>{mission.completionTitle}</h2><p>{mission.completionMessage}</p><button className="button button-primary" onClick={onContinue}>{isLast ? 'Ver resultado' : label} <span>→</span></button></section>
}
