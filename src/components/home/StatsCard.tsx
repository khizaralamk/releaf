import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { Fonts } from '../../styles/fonts/fonts';

interface StatsCardProps {
  todayMinutes: number;
  streakDays: number;
  totalMinutes: number;
}

interface StatItemProps {
  value: number;
  label: string;
  unit: string;
  highlight?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, unit, highlight }) => (
  <View style={styles.statItem}>
    <View style={styles.valueRow}>
      <Text style={[styles.statValue, highlight && styles.statValueHighlight]}>
        {value}
      </Text>
      <Text style={[styles.statUnit, highlight && styles.statUnitHighlight]}>{unit}</Text>
    </View>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export const StatsCard: React.FC<StatsCardProps> = ({
  todayMinutes,
  streakDays,
  totalMinutes,
}) => {
  return (
    <View style={styles.container}>
      <StatItem value={todayMinutes} label="today" unit="min" highlight />
      <View style={styles.separator} />
      <StatItem value={streakDays} label="streak" unit="days" />
      <View style={styles.separator} />
      <StatItem value={totalMinutes} label="total" unit="min" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: SIZINGS.spacing.xl,
    marginVertical: SIZINGS.spacing.lg,
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  statValue: {
    fontSize: 26,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.text,
    letterSpacing: -1,
    lineHeight: 30,
  },
  statValueHighlight: {
    fontSize: 30,
    color: COLORS.colors.primary,
    letterSpacing: -1.5,
    lineHeight: 34,
  },
  statUnit: {
    fontSize: 11,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.gray_400,
    letterSpacing: 0.2,
    paddingBottom: 3,
  },
  statUnitHighlight: {
    color: COLORS.colors.primary,
    opacity: 0.7,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.gray_500,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  separator: {
    width: 1,
    height: 32,
    backgroundColor: COLORS.colors.border,
    marginHorizontal: SIZINGS.spacing.sm,
  },
});
