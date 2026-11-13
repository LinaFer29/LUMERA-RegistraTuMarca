export type QuestionType = 'single' | 'multiple' | 'boolean' | 'scenario'

export interface AnswerOption {
  id: string
  text: string
  detail?: string
  icon?: string
}

export interface QuestionVisual {
  kind: 'elements' | 'strength' | 'comparison' | 'timeline' | 'badge'
  items?: string[]
  labels?: string[]
  note?: string
}

export interface Question {
  id: string
  type: QuestionType
  eyebrow?: string
  question: string
  context?: string
  options: AnswerOption[]
  correctAnswers: string[]
  hint: string
  retryMessage: string
  successTitle: string
  explanation: string
  sourceIds?: string[]
  visual?: QuestionVisual
}

export interface Mission {
  id: string
  number: number
  title: string
  kicker: string
  description: string
  icon: string
  intro?: string
  completionTitle: string
  completionMessage: string
  questions: Question[]
}

export interface Source {
  id: string
  name: string
  organization: string
  article?: string
  url: string
  description: string
}

export interface TutorialData {
  title: string
  description: string
  questions: Question[]
  completionTitle: string
  completionMessage: string
}

export interface GameData {
  brand: string
  title: string
  subtitle: string
  intro: string[]
  labels: Record<string, string>
  tutorial: TutorialData
  missions: Mission[]
  concepts: { title: string; text: string; icon: string }[]
  team: string[]
  final: { title: string; eyebrow: string; message: string; indicators: string[] }
  disclaimer: string
}

export interface GameProgress {
  screen: 'landing' | 'tutorial' | 'mission' | 'final'
  missionIndex: number
  questionIndex: number
  completedMissions: string[]
  tutorialComplete: boolean
  answered: Record<string, number>
}
