import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { Fonts } from '../../styles/fonts/fonts';

const TIPS = [
  'Take 3 deep breaths before important moments',
  'Practice breathing exercises for better sleep',
  'Consistent practice builds lasting calm',
  'Even 2 minutes of breathing helps reduce stress',
  'Morning breathing sets a positive tone for the day',
  'Focus on the exhale to activate relaxation',
  'Breathing exercises lower blood pressure naturally',
];

export const DailyTip: React.FC = () => {
  const getDailyTip = () => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
        86400000
    );
    return TIPS[dayOfYear % TIPS.length];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>TIP</Text>
        </View>
        <Text style={styles.title}>Daily Insight</Text>
      </View>
      <Text style={styles.tip}>{getDailyTip()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZINGS.spacing.xl,
    marginVertical: SIZINGS.spacing.md,
    padding: 16,
    backgroundColor: COLORS.colors.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: COLORS.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.white,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 13,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.2,
  },
  tip: {
    fontSize: 14,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    lineHeight: 20,
    letterSpacing: -0.1,
  },
});
