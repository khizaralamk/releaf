import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { Fonts } from '../../styles/fonts/fonts';

interface SummaryCardProps {
  totalMinutes: number;
  currentStreak: number;
  todayMinutes: number;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  totalMinutes,
  currentStreak,
  todayMinutes,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainStat}>
        <Text style={styles.mainValue}>{totalMinutes}</Text>
        <Text style={styles.mainLabel}>Total Minutes</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.value}>{currentStreak}</Text>
          <Text style={styles.label}>Day Streak</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.stat}>
          <Text style={styles.value}>{todayMinutes}</Text>
          <Text style={styles.label}>Today</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.colors.surface,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
    padding: SIZINGS.spacing.lg,
  },
  mainStat: {
    alignItems: 'center',
    paddingBottom: SIZINGS.spacing.md,
  },
  mainValue: {
    fontSize: 48,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.primary,
    letterSpacing: -2,
    marginBottom: 4,
  },
  mainLabel: {
    fontSize: 14,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.colors.border,
    marginVertical: SIZINGS.spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.text,
    letterSpacing: -0.8,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
  },
  separator: {
    width: 1,
    backgroundColor: COLORS.colors.border,
    marginHorizontal: SIZINGS.spacing.md,
  },
});
