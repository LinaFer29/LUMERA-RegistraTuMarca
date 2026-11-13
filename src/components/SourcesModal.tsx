import type { Source } from '../types'

interface Props { sources: Source[]; onClose: () => void }
export function SourcesModal({ sources, onClose }: Props) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="sources-title"><button className="modal-close" onClick={onClose} aria-label="Cerrar fuentes">×</button><span className="eyebrow">Referencias del recorrido</span><h2 id="sources-title">Fuentes consultadas</h2><p className="modal-intro">Las explicaciones se han simplificado para facilitar el aprendizaje. Consulta aquí los marcos de referencia.</p><div className="source-list">{sources.map((source) => <article className="source-item" key={source.id}><span className="source-number">{source.id === 'nice' ? 'N' : source.id === 'sic' ? 'S' : 'D'}</span><div><h3>{source.name}</h3><p>{source.organization} · {source.article}</p><small>{source.description}</small><a href={source.url} target="_blank" rel="noreferrer">Consultar fuente ↗</a></div></article>)}</div></section></div>
}
