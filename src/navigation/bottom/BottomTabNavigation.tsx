import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { HomeIcon, HeartIcon, ChartBarIcon, Cog6ToothIcon } from 'react-native-heroicons/outline';
import { HomeIcon as HomeSolidIcon, HeartIcon as HeartSolidIcon, ChartBarIcon as ChartBarSolidIcon, Cog6ToothIcon as Cog6ToothSolidIcon } from 'react-native-heroicons/solid';
import { Tab } from '../../utils/Util';
import HomeStackNavigator from '../stack/HomeStackNavigator';
import FavoritesScreen from '../../screens/favorites/FavoritesScreen';
import AnalyticsScreen from '../../screens/analytics/AnalyticsScreen';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import { CustomTabBar } from '../../components/navigation/CustomTabBar';

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => {
        // Get the current route name from the Home stack
        const homeRoute = props.state.routes.find((route) => route.name === 'Home');
        const routeName = homeRoute ? getFocusedRouteNameFromRoute(homeRoute) ?? 'Home' : 'Home';

        // Hide tab bar on sub-screens
        const hideTabBar = ['AllTechniques', 'TechniqueDetail', 'BreathingSession', 'Pricing'].includes(routeName);

        // Return null to hide the tab bar, otherwise render CustomTabBar
        if (hideTabBar) {
          return null;
        }

        return <CustomTabBar {...props} />;
      }}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <HomeSolidIcon color={color} size={22} />
            ) : (
              <HomeIcon color={color} size={22} />
            ),
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <HeartSolidIcon color={color} size={22} />
            ) : (
              <HeartIcon color={color} size={22} />
            ),
        }}
      />

      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <ChartBarSolidIcon color={color} size={22} />
            ) : (
              <ChartBarIcon color={color} size={22} />
            ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Cog6ToothSolidIcon color={color} size={22} />
            ) : (
              <Cog6ToothIcon color={color} size={22} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
