import React from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { GreetingHeader } from '../../components/home/GreetingHeader';
import { DailyTip } from '../../components/home/DailyTip';
import { BreathingCircle } from '../../components/home/BreathingCircle';
import { StatsCard } from '../../components/home/StatsCard';
import { TechniquesGrid } from '../../components/home/TechniquesGrid';
import { useUserName } from '../../hooks/home/useUserName';
import { useBreathingStats } from '../../hooks/home/useBreathingStats';
import { Navigation } from '../../types/Type';
import { COLORS } from '../../constants/styles/COLORS';

const HomeScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { userName, loading: userLoading } = useUserName();
  const { stats, loading: statsLoading } = useBreathingStats();

  const handleCirclePress = () => {
    // Navigate directly to breathing session with default technique (box breathing)
    navigation.navigate('BreathingSession', { techniqueId: 'box' });
  };

  const handleProPress = () => {
    navigation.navigate('Pricing');
  };

  if (userLoading || statsLoading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.colors.background} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.colors.background} />
      <LinearGradient
        colors={[COLORS.colors.background, COLORS.colors.dark_surface, COLORS.colors.background]}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Greeting Header */}
          <GreetingHeader name={userName || 'Friend'} onProPress={handleProPress} />

          {/* Breathing Circle */}
          <BreathingCircle
            inhale={4}
            hold={4}
            exhale={4}
            onPress={handleCirclePress}
          />

          {/* Stats Card */}
          <StatsCard
            todayMinutes={stats.todayMinutes}
            streakDays={stats.streakDays}
            totalMinutes={stats.totalMinutes}
          />

          {/* Breathing Techniques Grid */}
          <TechniquesGrid />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
});

export default HomeScreen;
