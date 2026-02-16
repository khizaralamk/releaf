import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants/storage/STORAGE_KEYS';
import {
  AnalyticsData,
  DailyPractice,
  SessionRecord,
  TechniqueStats,
} from '../../types/Analytics';
import {
  calculateCurrentStreak,
  calculateConsistencyScore,
  findBestPracticeHour,
} from '../../utils/analytics/analyticsUtils';

export const useAnalyticsData = () => {
  const [data, setData] = useState<AnalyticsData>({
    dailyPractice: [],
    sessionHistory: [],
    techniqueStats: [],
    totalMinutes: 0,
    totalSessions: 0,
    currentStreak: 0,
    longestStreak: 0,
    averageSessionDuration: 0,
    favoritesTechnique: 'None',
    bestPracticeHour: -1,
    consistencyScore: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      const [
        practiceHistoryStr,
        sessionHistoryStr,
        techniqueStatsStr,
        totalMinutesStr,
      ] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.practiceHistory),
        AsyncStorage.getItem(STORAGE_KEYS.sessionHistory),
        AsyncStorage.getItem(STORAGE_KEYS.techniqueStats),
        AsyncStorage.getItem(STORAGE_KEYS.totalMinutes),
      ]);

      const dailyPractice: DailyPractice[] = practiceHistoryStr
        ? JSON.parse(practiceHistoryStr)
        : [];
      const sessionHistory: SessionRecord[] = sessionHistoryStr
        ? JSON.parse(sessionHistoryStr)
        : [];
      const techniqueStats: TechniqueStats[] = techniqueStatsStr
        ? JSON.parse(techniqueStatsStr)
        : [];

      const totalMinutes = parseInt(totalMinutesStr || '0');
      const totalSessions = sessionHistory.length;
      const currentStreak = calculateCurrentStreak(dailyPractice);
      const consistencyScore = calculateConsistencyScore(dailyPractice);
      const bestPracticeHour = findBestPracticeHour(sessionHistory);

      // Calculate average session duration
      const averageSessionDuration =
        totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;

      // Find favorite technique
      const sortedTechniques = [...techniqueStats].sort(
        (a, b) => b.totalMinutes - a.totalMinutes
      );
      const favoritesTechnique =
        sortedTechniques.length > 0 ? sortedTechniques[0].name : 'None';

      // Calculate longest streak (simplified - can be enhanced)
      const longestStreak = currentStreak; // For now, same as current

      setData({
        dailyPractice,
        sessionHistory,
        techniqueStats,
        totalMinutes,
        totalSessions,
        currentStreak,
        longestStreak,
        averageSessionDuration,
        favoritesTechnique,
        bestPracticeHour,
        consistencyScore,
      });
    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    loadAnalyticsData();
  };

  return { data, loading, refreshData };
};
