import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navigation } from '../../types/Type';
import { SPLASH_DURATION } from '../../constants/timings/TIMINGS';
import { STORAGE_KEYS } from '../../constants/storage/STORAGE_KEYS';

export const useSplashNavigation = () => {
  const navigation = useNavigation<Navigation>();

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboardingCompleted = await AsyncStorage.getItem(
        STORAGE_KEYS.onboardingCompleted
      );

      setTimeout(() => {
        if (onboardingCompleted === 'true') {
          navigation.navigate('BottomTab');
        } else {
          navigation.navigate('Onboarding1');
        }
      }, SPLASH_DURATION);
    };

    checkOnboarding();
  }, [navigation]);
};
