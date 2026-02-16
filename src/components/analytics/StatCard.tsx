import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { Fonts } from '../../styles/fonts/fonts';

interface StatCardProps {
  value: string | number;
  label: string;
  subtitle?: string;
  badge?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  subtitle,
  badge,
}) => {
  return (
    <View style={styles.card}>
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.colors.surface,
    padding: SIZINGS.spacing.lg,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
    alignItems: 'center',
    minWidth: 120,
  },
  badge: {
    backgroundColor: COLORS.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.white,
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 32,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.primary,
    letterSpacing: -1,
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.gray_400,
    marginTop: 2,
  },
});
