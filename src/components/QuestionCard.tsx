import { useEffect, useState } from 'react'
import type { Question, Source } from '../types'
import { FeedbackPanel } from './FeedbackPanel'

interface Props { question: Question; sources: Source[]; labels: Record<string, string>; onSolved: () => void; onAttempt: (questionId: string) => void }

export function QuestionCard({ question, sources, labels, onSolved, onAttempt }: Props) {
  const [selected, setSelected] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle')
  const isMultiple = question.type === 'multiple'

  useEffect(() => {
    setSelected([])
    setStatus('idle')
  }, [question.id])

  const toggle = (id: string) => {
    if (status === 'correct') return
    setSelected((current) => isMultiple ? current.includes(id) ? current.filter((item) => item !== id) : [...current, id] : [id])
    if (status === 'wrong') setStatus('idle')
  }

  const submit = () => {
    if (selected.length === 0) return
    const expected = [...question.correctAnswers].sort().join('|')
    const actual = [...selected].sort().join('|')
    onAttempt(question.id)
    setStatus(expected === actual ? 'correct' : 'wrong')
  }

  const visual = question.visual
  return (
    <article className="question-card fade-in">
      {visual?.kind === 'comparison' && <div className="comparison-visual"><div>{visual.items?.[0]}</div><span>VS.</span><div>{visual.items?.[1]}</div></div>}
      {visual?.kind === 'elements' && <div className="element-orbit" aria-label="Elementos que pueden identificar a LÚMERA">{visual.items?.map((item) => <span key={item}>{item}</span>)}</div>}
      {visual?.kind === 'strength' && <StrengthMeter labels={visual.labels ?? []} />}
      {visual?.kind === 'timeline' && <Timeline labels={visual.labels ?? []} />}
      <div className="question-head">
        <span className="eyebrow">{question.eyebrow}</span>
        <h2>{question.question}</h2>
        {question.context && <p className="question-context">{question.context}</p>}
      </div>
      <div className={`answer-grid ${isMultiple ? 'answer-grid-multiple' : ''}`} role={isMultiple ? 'group' : 'radiogroup'} aria-label="Opciones de respuesta">
        {question.options.map((option, index) => {
          const isSelected = selected.includes(option.id)
          return <button key={option.id} className={`answer-option ${isSelected ? 'is-selected' : ''}`} onClick={() => toggle(option.id)} aria-pressed={isSelected} role={isMultiple ? 'checkbox' : 'radio'}>
            <span className="option-marker">{isSelected ? '✓' : String.fromCharCode(65 + index)}</span>
            {option.icon && <span className="option-icon">{option.icon}</span>}
            <span className="option-copy"><strong>{option.text}</strong>{option.detail && <small>{option.detail}</small>}</span>
          </button>
        })}
      </div>
      {visual?.note && <p className="visual-note">{visual.note}</p>}
      {status === 'idle' && <button className="button button-primary submit-button" onClick={submit} disabled={selected.length === 0}>{labels.check} <span aria-hidden="true">→</span></button>}
      {status !== 'idle' && <FeedbackPanel correct={status === 'correct'} question={question} sources={sources} onRetry={() => setStatus('idle')} onContinue={onSolved} labels={labels} />}
    </article>
  )
}

function StrengthMeter({ labels }: { labels: string[] }) {
  return <div className="strength-meter" aria-label="Escala de fuerza distintiva"><div className="meter-line" />{labels.map((label, index) => <div className={`meter-stop stop-${index}`} key={label}><span>{label}</span><i /></div>)}</div>
}

function Timeline({ labels }: { labels: string[] }) {
  return <div className="timeline" aria-label="Etapas del proceso">{labels.map((label, index) => <div className="timeline-item" key={label}><span className="timeline-number">{index + 1}</span><span>{label}</span>{index < labels.length - 1 && <i />}</div>)}</div>
}
