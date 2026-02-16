import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { Fonts } from '../../styles/fonts/fonts';
import { useAnalyticsData } from '../../hooks/analytics/useAnalyticsData';
import { SummaryCard } from '../../components/analytics/SummaryCard';
import { StreakGrid } from '../../components/analytics/StreakGrid';
import { WeeklyChart } from '../../components/analytics/WeeklyChart';
import { TechniqueBreakdown } from '../../components/analytics/TechniqueBreakdown';
import { PracticeInsights } from '../../components/analytics/PracticeInsights';
import { Milestones } from '../../components/analytics/Milestones';
import { calculateMilestones } from '../../utils/analytics/analyticsUtils';

const AnalyticsScreen = () => {
  const { data, loading } = useAnalyticsData();

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const milestones = calculateMilestones(
    data.totalMinutes || 0,
    data.currentStreak || 0,
    data.totalSessions || 0
  );

  // Get today's minutes safely
  const todayMinutes =
    data.dailyPractice && data.dailyPractice.length > 0
      ? data.dailyPractice[data.dailyPractice.length - 1]?.minutes || 0
      : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.section}>
          <SummaryCard
            totalMinutes={data.totalMinutes || 0}
            currentStreak={data.currentStreak || 0}
            todayMinutes={todayMinutes}
          />
        </View>

        {/* Streak Grid Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Practice Journey</Text>
          <StreakGrid dailyPractice={data.dailyPractice || []} />
        </View>

        {/* Quick Insights Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insights</Text>
          <PracticeInsights
            bestPracticeHour={data.bestPracticeHour || -1}
            favoriteTechnique={data.favoritesTechnique || 'None'}
            averageSessionDuration={data.averageSessionDuration || 0}
            consistencyScore={data.consistencyScore || 0}
          />
        </View>

        {/* Weekly Activity Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last 7 Days</Text>
          <WeeklyChart dailyPractice={data.dailyPractice || []} />
        </View>

        {/* Technique Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Techniques Used</Text>
          <TechniqueBreakdown
            techniqueStats={data.techniqueStats || []}
            totalMinutes={data.totalMinutes || 0}
          />
        </View>

        {/* Milestones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Milestones</Text>
          <Milestones milestones={milestones} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingVertical: SIZINGS.spacing.lg,
    paddingHorizontal: SIZINGS.spacing.xl,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.text,
    letterSpacing: -0.8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZINGS.spacing.xl,
    paddingBottom: 100,
  },
  section: {
    marginBottom: SIZINGS.spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.3,
    marginBottom: SIZINGS.spacing.md,
  },
});

export default AnalyticsScreen;
