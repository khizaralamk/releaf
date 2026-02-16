import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BreathingTechnique } from './Breathing';

export type Navigation = NativeStackNavigationProp<STACK_NAVIGATOR_PARAMS>;

export type STACK_NAVIGATOR_PARAMS = {
  Splash: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Home: undefined;
  BottomTab: undefined;
  AllTechniques: undefined;
  TechniqueDetail: { technique: BreathingTechnique };
  BreathingSession: { techniqueId: string };
  Pricing: undefined;
};

export type BOTTOM_TAB_NAVIGATOR_PARAMS = {
  Home: undefined;
  Favorites: undefined;
  Analytics: undefined;
  Settings: undefined;
};
