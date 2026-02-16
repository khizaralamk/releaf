export interface DailyPractice {
  date: string; // YYYY-MM-DD format
  minutes: number;
  sessions: number;
}

export interface SessionRecord {
  id: string;
  techniqueId: string;
  techniqueName: string;
  duration: number; // in minutes
  timestamp: number; // Unix timestamp
  completed: boolean;
}

export interface TechniqueStats {
  techniqueId: string;
  name: string;
  totalSessions: number;
  totalMinutes: number;
  lastUsed: number; // Unix timestamp
}

export interface WeeklyData {
  week: string; // Week label (e.g., "Week 1")
  minutes: number;
  sessions: number;
}

export interface AnalyticsData {
  dailyPractice: DailyPractice[];
  sessionHistory: SessionRecord[];
  techniqueStats: TechniqueStats[];
  totalMinutes: number;
  totalSessions: number;
  currentStreak: number;
  longestStreak: number;
  averageSessionDuration: number;
  favoritesTechnique: string;
  bestPracticeHour: number;
  consistencyScore: number; // 0-100
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  achieved: boolean;
  progress: number; // 0-100
  target: number;
  icon: string;
}
