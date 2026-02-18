import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from '../../utils/Util';
import SplashScreen from '../../screens/splash/SplashScreen';
import OnboardingScreen1 from '../../screens/onboarding/OnboardingScreen1';
import OnboardingScreen2 from '../../screens/onboarding/OnboardingScreen2';
import OnboardingScreen3 from '../../screens/onboarding/OnboardingScreen3';
import BreathingSessionScreen from '../../screens/breathing/BreathingSessionScreen';
import BottomTabNavigation from '../bottom/BottomTabNavigation';

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 250,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen 
          name="Onboarding1" 
          component={OnboardingScreen1} 
          options={{headerShown:false}}
          
          />
        <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
        <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />
        <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
        <Stack.Screen
          name="BreathingSession"
          component={BreathingSessionScreen}
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
