import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/HomeScreen';
import AllTechniquesScreen from '../../screens/breathing/AllTechniquesScreen';
import TechniqueDetailScreen from '../../screens/breathing/TechniqueDetailScreen';
import BreathingSessionScreen from '../../screens/breathing/BreathingSessionScreen';
import PricingScreen from '../../screens/pricing/PricingScreen';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AllTechniques" component={AllTechniquesScreen} />
      <Stack.Screen name="TechniqueDetail" component={TechniqueDetailScreen} />
      <Stack.Screen
        name="BreathingSession"
        component={BreathingSessionScreen}
        options={{ presentation: 'fullScreenModal' }}
      />
      <Stack.Screen
        name="Pricing"
        component={PricingScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
