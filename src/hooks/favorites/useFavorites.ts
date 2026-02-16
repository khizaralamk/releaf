import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants/storage/STORAGE_KEYS';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from storage
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(STORAGE_KEYS.favoriteTechniques);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save favorites to storage
  const saveFavorites = async (newFavorites: string[]) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.favoriteTechniques,
        JSON.stringify(newFavorites)
      );
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  // Toggle favorite status
  const toggleFavorite = async (techniqueId: string) => {
    const newFavorites = favorites.includes(techniqueId)
      ? favorites.filter((id) => id !== techniqueId)
      : [...favorites, techniqueId];

    await saveFavorites(newFavorites);
    return newFavorites.includes(techniqueId);
  };

  // Check if technique is favorited
  const isFavorite = (techniqueId: string) => {
    return favorites.includes(techniqueId);
  };

  useEffect(() => {
    loadFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
    refreshFavorites: loadFavorites,
  };
};
