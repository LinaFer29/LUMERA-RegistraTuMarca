import { useEffect, useState } from 'react'
import type { GameProgress } from '../types'

const STORAGE_KEY = 'lumera-game-progress'

export const initialProgress: GameProgress = {
  screen: 'landing',
  missionIndex: 0,
  questionIndex: 0,
  completedMissions: [],
  tutorialComplete: false,
  answered: {},
}

function readProgress(): GameProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? { ...initialProgress, ...JSON.parse(stored) } : initialProgress
  } catch {
    return initialProgress
  }
}

export function useGameProgress() {
  const [progress, setProgress] = useState<GameProgress>(readProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const reset = () => setProgress(initialProgress)
  const incrementAttempt = (questionId: string) => setProgress((current) => ({
    ...current,
    answered: { ...current.answered, [questionId]: (current.answered[questionId] ?? 0) + 1 },
  }))

  return { progress, setProgress, reset, incrementAttempt }
}
