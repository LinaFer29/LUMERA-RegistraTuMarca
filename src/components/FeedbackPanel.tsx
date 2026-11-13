import type { Question, Source } from '../types'

interface Props {
  correct: boolean
  question: Question
  sources: Source[]
  onRetry: () => void
  onContinue: () => void
  labels: Record<string, string>
}

export function FeedbackPanel({ correct, question, sources, onRetry, onContinue, labels }: Props) {
  const relatedSources = sources.filter((source) => question.sourceIds?.includes(source.id))
  return (
    <section className={`feedback-panel ${correct ? 'feedback-success' : 'feedback-retry'}`} aria-live="polite">
      <div className="feedback-icon" aria-hidden="true">{correct ? '✓' : '!'}</div>
      <div className="feedback-copy">
        <p className="feedback-title">{correct ? question.successTitle : question.retryMessage}</p>
        {!correct ? <p className="hint-text"><strong>Pista:</strong> {question.hint}</p> : (
          <>
            <p className="learning-label">{labels.learned}</p>
            <p className="explanation">{question.explanation}</p>
            {relatedSources.length > 0 && <details className="foundation"><summary>{labels.foundation}</summary><div>{relatedSources.map((source) => <p key={source.id}><strong>{source.name}</strong> · {source.article ?? source.description} <a href={source.url} target="_blank" rel="noreferrer">Abrir fuente ↗</a></p>)}</div></details>}
          </>
        )}
        <button className={correct ? 'button button-primary' : 'button button-quiet'} onClick={correct ? onContinue : onRetry}>
          {correct ? labels.continue : labels.retry}
        </button>
      </div>
    </section>
  )
}
