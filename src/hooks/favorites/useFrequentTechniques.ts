import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants/storage/STORAGE_KEYS';
import { BREATHING_TECHNIQUES } from '../../constants/breathing/BREATHING_TECHNIQUES';

interface TechniqueUsage {
  techniqueId: string;
  techniqueName: string;
  sessionCount: number;
  totalMinutes: number;
  lastUsed: number;
}

export const useFrequentTechniques = () => {
  const [frequentTechniques, setFrequentTechniques] = useState<TechniqueUsage[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFrequentTechniques = async () => {
    try {
      const storedStats = await AsyncStorage.getItem(STORAGE_KEYS.techniqueStats);

      if (storedStats) {
        const stats = JSON.parse(storedStats);

        // Sort by session count (most used first) and take top 5
        const sortedTechniques = stats
          .sort((a: TechniqueUsage, b: TechniqueUsage) => b.sessionCount - a.sessionCount)
          .slice(0, 5);

        setFrequentTechniques(sortedTechniques);
      } else {
        // If no stats exist, return empty array
        setFrequentTechniques([]);
      }
    } catch (error) {
      console.error('Error loading frequent techniques:', error);
      setFrequentTechniques([]);
    } finally {
      setLoading(false);
    }
  };

  // Record technique usage
  const recordTechniqueUsage = async (
    techniqueId: string,
    durationMinutes: number
  ) => {
    try {
      const storedStats = await AsyncStorage.getItem(STORAGE_KEYS.techniqueStats);
      let stats: TechniqueUsage[] = storedStats ? JSON.parse(storedStats) : [];

      const technique = BREATHING_TECHNIQUES.find((t) => t.id === techniqueId);
      if (!technique) return;

      const existingIndex = stats.findIndex((s) => s.techniqueId === techniqueId);

      if (existingIndex >= 0) {
        // Update existing
        stats[existingIndex] = {
          ...stats[existingIndex],
          sessionCount: stats[existingIndex].sessionCount + 1,
          totalMinutes: stats[existingIndex].totalMinutes + durationMinutes,
          lastUsed: Date.now(),
        };
      } else {
        // Add new
        stats.push({
          techniqueId,
          techniqueName: technique.name,
          sessionCount: 1,
          totalMinutes: durationMinutes,
          lastUsed: Date.now(),
        });
      }

      await AsyncStorage.setItem(STORAGE_KEYS.techniqueStats, JSON.stringify(stats));
      await loadFrequentTechniques();
    } catch (error) {
      console.error('Error recording technique usage:', error);
    }
  };

  useEffect(() => {
    loadFrequentTechniques();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    frequentTechniques,
    loading,
    recordTechniqueUsage,
    refreshFrequentTechniques: loadFrequentTechniques,
  };
};
