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

export const StatsCard: React.FC<StatsCardProps> = ({
  todayMinutes,
  streakDays,
  totalMinutes,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{todayMinutes}</Text>
        <Text style={styles.statLabel}>Today</Text>
        <Text style={styles.statUnit}>mins</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.statItem}>
        <Text style={styles.statValue}>{streakDays}</Text>
        <Text style={styles.statLabel}>Streak</Text>
        <Text style={styles.statUnit}>days</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.statItem}>
        <Text style={styles.statValue}>{totalMinutes}</Text>
        <Text style={styles.statLabel}>Total</Text>
        <Text style={styles.statUnit}>mins</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: SIZINGS.spacing.xl,
    marginVertical: SIZINGS.spacing.xl,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.primary,
    letterSpacing: -1,
  },
  statLabel: {
    fontSize: 13,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.textSecondary,
    marginTop: 6,
    letterSpacing: -0.2,
  },
  statUnit: {
    fontSize: 11,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.gray_400,
    marginTop: 2,
    letterSpacing: 0,
  },
  separator: {
    width: 1,
    backgroundColor: COLORS.colors.border,
    marginHorizontal: SIZINGS.spacing.sm,
  },
});
