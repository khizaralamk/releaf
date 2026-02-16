export interface BreathingTechnique {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  holdAfterExhale?: number;
  icon: string;
  category: 'relaxation' | 'focus' | 'stress-relief' | 'custom';
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  benefits?: string[];
}

export interface BreathingSession {
  id: string;
  date: string;
  technique: string;
  duration: number;
  completed: boolean;
}

export interface UserStats {
  totalMinutes: number;
  streakDays: number;
  lastPracticeDate: string;
  sessionsCompleted: number;
}
