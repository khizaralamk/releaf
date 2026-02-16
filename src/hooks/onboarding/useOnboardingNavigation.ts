import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navigation } from '../../types/Type';
import { STORAGE_KEYS } from '../../constants/storage/STORAGE_KEYS';

export const useOnboardingNavigation = (currentScreen: number) => {
  const navigation = useNavigation<Navigation>();

  const goToNext = () => {
    if (currentScreen === 1) {
      navigation.navigate('Onboarding2');
    } else if (currentScreen === 2) {
      navigation.navigate('Onboarding3');
    }
  };

  const skip = async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.onboardingCompleted, 'true');
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTab' }],
    });
  };

  const finish = async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.onboardingCompleted, 'true');
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTab' }],
    });
  };

  return { goToNext, skip, finish };
};
