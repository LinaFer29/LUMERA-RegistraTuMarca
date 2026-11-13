import { useMemo, useState } from 'react'
import gameData from './data/game.json'
import sourceData from './data/sources.json'
import { useGameProgress } from './hooks/useGameProgress'
import type { GameData, Question } from './types'
import { ProgressBar } from './components/ProgressBar'
import { LandingPage } from './components/LandingPage'
import { QuestionCard } from './components/QuestionCard'
import { MissionComplete } from './components/MissionComplete'
import { FinalReport } from './components/FinalReport'
import { SourcesModal } from './components/SourcesModal'
import { ConceptsModal } from './components/ConceptsModal'
import { TeamSection } from './components/TeamSection'
import './styles.css'

const data = gameData as GameData
const sources = sourceData.sources

export default function App() {
  const { progress, setProgress, reset, incrementAttempt } = useGameProgress()
  const [modal, setModal] = useState<'sources' | 'concepts' | null>(null)
  const [showCompletion, setShowCompletion] = useState(false)

  const currentQuestions: Question[] = progress.screen === 'tutorial' ? data.tutorial.questions : data.missions[progress.missionIndex]?.questions ?? []
  const currentQuestion = currentQuestions[progress.questionIndex]
  const currentMission = data.missions[progress.missionIndex]
  const hasProgress = progress.screen !== 'landing' || progress.tutorialComplete
  const completedCount = progress.completedMissions.length
  const missionPercent = useMemo(() => progress.screen === 'final' ? 100 : Math.round(((progress.screen === 'tutorial' ? 0 : completedCount) / data.missions.length) * 100), [progress.screen, completedCount])

  const start = () => setProgress((current) => ({ ...current, screen: 'tutorial', questionIndex: 0 }))
  const resume = () => setProgress((current) => ({ ...current, screen: current.screen === 'landing' ? 'tutorial' : current.screen }))
  const home = () => { setShowCompletion(false); setProgress((current) => ({ ...current, screen: 'landing' })) }
  const beginMission = (index: number) => { setShowCompletion(false); setProgress((current) => ({ ...current, screen: 'mission', missionIndex: index, questionIndex: 0 })) }

  const solveQuestion = () => {
    if (progress.questionIndex < currentQuestions.length - 1) {
      setProgress((current) => ({ ...current, questionIndex: current.questionIndex + 1 }))
    } else if (progress.screen === 'tutorial') {
      setProgress((current) => ({ ...current, screen: 'mission', missionIndex: 0, questionIndex: 0, tutorialComplete: true }))
    } else {
      setProgress((current) => ({ ...current, completedMissions: current.completedMissions.includes(currentMission.id) ? current.completedMissions : [...current.completedMissions, currentMission.id] }))
      setShowCompletion(true)
    }
  }

  const continueFromMission = () => {
    if (progress.missionIndex >= data.missions.length - 1) setProgress((current) => ({ ...current, screen: 'final' }))
    else beginMission(progress.missionIndex + 1)
  }

  return <div className="app-shell">
    <ProgressBar data={data} progress={progress} onJumpHome={home} />
    <div className="progress-mobile"><span>Progreso de misión</span><strong>{missionPercent}%</strong><div><i style={{ width: `${missionPercent}%` }} /></div></div>
    {progress.screen === 'landing' && <LandingPage data={data} onStart={start} onResume={resume} onSources={() => setModal('sources')} hasProgress={hasProgress} />}
    {progress.screen === 'tutorial' && <main className="mission-page page-shell fade-in"><MissionHeader eyebrow={data.labels.tutorial} title={data.tutorial.title} description={data.tutorial.description} icon="T" /><QuestionCard key={currentQuestion.id} question={currentQuestion} sources={sources} labels={data.labels} onSolved={solveQuestion} onAttempt={incrementAttempt} /><div className="mission-footer"><span>Entrenamiento · {progress.questionIndex + 1} de {currentQuestions.length}</span><button className="text-button" onClick={() => setModal('sources')}>Ver fuentes</button></div></main>}
    {progress.screen === 'mission' && currentMission && <main className="mission-page page-shell fade-in"><MissionHeader eyebrow={`Misión ${String(currentMission.number).padStart(2, '0')} · ${currentMission.kicker}`} title={currentMission.title} description={currentMission.description} icon={currentMission.icon} intro={currentMission.intro} />{showCompletion ? <MissionComplete mission={currentMission} isLast={progress.missionIndex === data.missions.length - 1} onContinue={continueFromMission} label={data.labels.continue} /> : <QuestionCard key={currentQuestion.id} question={currentQuestion} sources={sources} labels={data.labels} onSolved={solveQuestion} onAttempt={incrementAttempt} />}<div className="mission-footer"><span>Decisión {progress.questionIndex + 1} de {currentQuestions.length}</span><button className="text-button" onClick={() => setModal('sources')}>Ver fuentes</button></div></main>}
    {progress.screen === 'final' && <FinalReport data={data} onConcepts={() => setModal('concepts')} onSources={() => setModal('sources')} onRestart={reset} />}
    <TeamSection members={data.team} />
    <footer className="site-footer"><span>{data.brand} · {data.title}</span><span>{data.disclaimer}</span></footer>
    {modal === 'sources' && <SourcesModal sources={sources} onClose={() => setModal(null)} />}
    {modal === 'concepts' && <ConceptsModal concepts={data.concepts} onClose={() => setModal(null)} />}
  </div>
}

function MissionHeader({ eyebrow, title, description, icon, intro }: { eyebrow: string; title: string; description: string; icon: string; intro?: string }) {
  return <header className="mission-header"><div className="mission-icon">{icon}</div><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p>{intro && <div className="mission-intro"><span>✦</span><p>{intro}</p></div>}</div></header>
}
