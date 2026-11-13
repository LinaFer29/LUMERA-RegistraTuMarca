import type { GameData } from '../types'

interface Props { concepts: GameData['concepts']; onClose: () => void }
export function ConceptsModal({ concepts, onClose }: Props) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="modal concepts-modal" role="dialog" aria-modal="true" aria-labelledby="concepts-title"><button className="modal-close" onClick={onClose} aria-label="Cerrar conceptos">×</button><span className="eyebrow">Tu caja de herramientas</span><h2 id="concepts-title">Conceptos aprendidos</h2><div className="concepts-grid">{concepts.map((concept) => <article key={concept.title} className="concept-card"><span>{concept.icon}</span><h3>{concept.title}</h3><p>{concept.text}</p></article>)}</div></section></div>
}
