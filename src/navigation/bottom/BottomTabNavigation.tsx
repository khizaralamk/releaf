import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { HomeIcon, HeartIcon, ChartBarIcon, Cog6ToothIcon, BookOpenIcon } from 'react-native-heroicons/outline';
import { HomeIcon as HomeSolidIcon, HeartIcon as HeartSolidIcon, ChartBarIcon as ChartBarSolidIcon, Cog6ToothIcon as Cog6ToothSolidIcon, BookOpenIcon as BookOpenSolidIcon } from 'react-native-heroicons/solid';
import { Tab } from '../../utils/Util';
import HomeStackNavigator from '../stack/HomeStackNavigator';
import FavoritesScreen from '../../screens/favorites/FavoritesScreen';
import AnalyticsScreen from '../../screens/analytics/AnalyticsScreen';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import JournalScreen from '../../screens/journal/JournalScreen';
import { CustomTabBar } from '../../components/navigation/CustomTabBar';

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => {
        const homeRoute = props.state.routes.find((route) => route.name === 'Home');
        const routeName = homeRoute ? getFocusedRouteNameFromRoute(homeRoute) ?? 'Home' : 'Home';

        const hideTabBar = ['AllTechniques', 'TechniqueDetail', 'BreathingSession', 'Pricing'].includes(routeName);

        if (hideTabBar) {
          return null;
        }

        return <CustomTabBar {...props} />;
      }}
      screenOptions={{
        headerShown: false,
        animation: 'none',
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
        name="Journal"
        component={JournalScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <BookOpenSolidIcon color={color} size={22} />
            ) : (
              <BookOpenIcon color={color} size={22} />
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
