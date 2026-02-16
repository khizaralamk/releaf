import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants/storage/STORAGE_KEYS';

export const useUserName = () => {
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserName();
  }, []);

  const loadUserName = async () => {
    try {
      const name = await AsyncStorage.getItem(STORAGE_KEYS.userName);
      if (name) {
        setUserName(name);
      }
    } catch (error) {
      console.error('Error loading user name:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveUserName = async (name: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.userName, name);
      setUserName(name);
    } catch (error) {
      console.error('Error saving user name:', error);
    }
  };

  return { userName, loading, saveUserName };
};
