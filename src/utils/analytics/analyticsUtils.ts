import { DailyPractice, SessionRecord, TechniqueStats, Milestone } from '../../types/Analytics';
import { COLORS } from '../../constants/styles/COLORS';

/**
 * Format date to YYYY-MM-DD
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Get color intensity for streak grid based on minutes practiced
 */
export const getStreakColor = (minutes: number): string => {
  if (minutes === 0) return 'transparent';
  if (minutes <= 5) return `${COLORS.colors.primary}33`; // 20% opacity
  if (minutes <= 15) return `${COLORS.colors.primary}80`; // 50% opacity
  if (minutes <= 30) return `${COLORS.colors.primary}BF`; // 75% opacity
  return COLORS.colors.primary; // 100% opacity
};

/**
 * Get intensity level (0-4) based on minutes
 */
export const getIntensityLevel = (minutes: number): number => {
  if (minutes === 0) return 0;
  if (minutes <= 5) return 1;
  if (minutes <= 15) return 2;
  if (minutes <= 30) return 3;
  return 4;
};

/**
 * Generate array of dates for last N days
 */
export const getLast7Days = (): string[] => {
  const dates: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(formatDate(date));
  }
  return dates;
};

/**
 * Generate array of dates for last 12 weeks (84 days)
 */
export const getLast12Weeks = (): string[] => {
  const dates: string[] = [];
  for (let i = 83; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(formatDate(date));
  }
  return dates;
};

/**
 * Get day labels for last 7 days (e.g., Mon, Tue, etc.)
 */
export const getDayLabels = (): string[] => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const labels: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    labels.push(days[date.getDay()]);
  }
  return labels;
};

/**
 * Aggregate daily data into weekly data (last 4 weeks)
 */
export const aggregateWeeklyData = (dailyData: DailyPractice[]) => {
  const weeks = [];
  for (let weekNum = 0; weekNum < 4; weekNum++) {
    const weekStart = 7 * weekNum;
    const weekEnd = weekStart + 7;
    const weekData = dailyData.slice(-28).slice(weekStart, weekEnd);

    const totalMinutes = weekData.reduce((sum, day) => sum + day.minutes, 0);
    const totalSessions = weekData.reduce((sum, day) => sum + day.sessions, 0);

    weeks.push({
      week: `Week ${4 - weekNum}`,
      minutes: totalMinutes,
      sessions: totalSessions,
    });
  }
  return weeks.reverse();
};

/**
 * Calculate current streak from daily practice data
 */
export const calculateCurrentStreak = (dailyData: DailyPractice[]): number => {
  if (dailyData.length === 0) return 0;

  const sortedData = [...dailyData].sort((a, b) => b.date.localeCompare(a.date));
  const today = formatDate(new Date());

  let streak = 0;
  let currentDate = new Date();

  for (const practice of sortedData) {
    const practiceDate = formatDate(currentDate);
    if (practice.date === practiceDate && practice.minutes > 0) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

/**
 * Calculate consistency score (0-100) based on practice frequency
 */
export const calculateConsistencyScore = (dailyData: DailyPractice[]): number => {
  if (dailyData.length === 0) return 0;

  const last30Days = dailyData.slice(-30);
  const daysWithPractice = last30Days.filter(day => day.minutes > 0).length;

  return Math.round((daysWithPractice / 30) * 100);
};

/**
 * Find most common practice hour from session history
 */
export const findBestPracticeHour = (sessions: SessionRecord[]): number => {
  if (sessions.length === 0) return -1;

  const hourCounts: { [key: number]: number } = {};

  sessions.forEach(session => {
    const hour = new Date(session.timestamp).getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });

  const mostCommonHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0];
  return mostCommonHour ? parseInt(mostCommonHour[0]) : -1;
};

/**
 * Format hour to readable time (e.g., "7 AM", "3 PM")
 */
export const formatHour = (hour: number): string => {
  if (hour === -1) return 'N/A';
  if (hour === 0) return '12 AM';
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return '12 PM';
  return `${hour - 12} PM`;
};

/**
 * Calculate milestones based on stats
 */
export const calculateMilestones = (
  totalMinutes: number,
  currentStreak: number,
  totalSessions: number
): Milestone[] => {
  return [
    {
      id: 'first_session',
      title: 'First Breath',
      description: 'Complete your first session',
      achieved: totalSessions >= 1,
      progress: totalSessions >= 1 ? 100 : 0,
      target: 1,
      icon: '🎉',
    },
    {
      id: 'streak_7',
      title: '7-Day Streak',
      description: 'Practice for 7 days in a row',
      achieved: currentStreak >= 7,
      progress: Math.min((currentStreak / 7) * 100, 100),
      target: 7,
      icon: '🔥',
    },
    {
      id: 'streak_30',
      title: '30-Day Streak',
      description: 'Practice for 30 days in a row',
      achieved: currentStreak >= 30,
      progress: Math.min((currentStreak / 30) * 100, 100),
      target: 30,
      icon: '⭐',
    },
    {
      id: 'minutes_100',
      title: '100 Minutes',
      description: 'Complete 100 minutes of practice',
      achieved: totalMinutes >= 100,
      progress: Math.min((totalMinutes / 100) * 100, 100),
      target: 100,
      icon: '💯',
    },
    {
      id: 'minutes_500',
      title: '500 Minutes',
      description: 'Complete 500 minutes of practice',
      achieved: totalMinutes >= 500,
      progress: Math.min((totalMinutes / 500) * 100, 100),
      target: 500,
      icon: '🏆',
    },
    {
      id: 'minutes_1000',
      title: '1000 Minutes',
      description: 'Complete 1000 minutes of practice',
      achieved: totalMinutes >= 1000,
      progress: Math.min((totalMinutes / 1000) * 100, 100),
      target: 1000,
      icon: '👑',
    },
  ];
};

/**
 * Get practice data for a specific date
 */
export const getPracticeForDate = (
  date: string,
  dailyData: DailyPractice[]
): DailyPractice => {
  const practice = dailyData.find(d => d.date === date);
  return practice || { date, minutes: 0, sessions: 0 };
};
