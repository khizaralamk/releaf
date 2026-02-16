import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants/storage/STORAGE_KEYS';

interface BreathingStats {
  todayMinutes: number;
  streakDays: number;
  totalMinutes: number;
}

export const useBreathingStats = () => {
  const [stats, setStats] = useState<BreathingStats>({
    todayMinutes: 0,
    streakDays: 0,
    totalMinutes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [totalMinutes, lastPracticeDate, streakCount] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.totalMinutes),
        AsyncStorage.getItem(STORAGE_KEYS.lastPracticeDate),
        AsyncStorage.getItem(STORAGE_KEYS.streakCount),
      ]);

      const today = new Date().toDateString();
      const todayMinutes = lastPracticeDate === today ?
        parseInt(await AsyncStorage.getItem(`${STORAGE_KEYS.totalMinutes}_today`) || '0') :
        0;

      setStats({
        todayMinutes,
        streakDays: parseInt(streakCount || '0'),
        totalMinutes: parseInt(totalMinutes || '0'),
      });
    } catch (error) {
      console.error('Error loading breathing stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStats = async (minutesToAdd: number) => {
    try {
      const today = new Date().toDateString();
      const lastPracticeDate = await AsyncStorage.getItem(STORAGE_KEYS.lastPracticeDate);

      // Update total minutes
      const newTotalMinutes = stats.totalMinutes + minutesToAdd;
      await AsyncStorage.setItem(STORAGE_KEYS.totalMinutes, newTotalMinutes.toString());

      // Update today's minutes
      const newTodayMinutes = stats.todayMinutes + minutesToAdd;
      await AsyncStorage.setItem(`${STORAGE_KEYS.totalMinutes}_today`, newTodayMinutes.toString());
      await AsyncStorage.setItem(STORAGE_KEYS.lastPracticeDate, today);

      // Update streak
      let newStreakDays = stats.streakDays;
      if (lastPracticeDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (lastPracticeDate === yesterday) {
          newStreakDays += 1;
        } else {
          newStreakDays = 1;
        }
        await AsyncStorage.setItem(STORAGE_KEYS.streakCount, newStreakDays.toString());
      }

      setStats({
        todayMinutes: newTodayMinutes,
        streakDays: newStreakDays,
        totalMinutes: newTotalMinutes,
      });
    } catch (error) {
      console.error('Error updating breathing stats:', error);
    }
  };

  return { stats, loading, updateStats };
};
