import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { Fonts } from '../../styles/fonts/fonts';
import { TechniqueStats } from '../../types/Analytics';

interface TechniqueBreakdownProps {
  techniqueStats: TechniqueStats[];
  totalMinutes: number;
}

export const TechniqueBreakdown: React.FC<TechniqueBreakdownProps> = ({
  techniqueStats,
  totalMinutes,
}) => {
  if (techniqueStats.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Complete a breathing session to see your technique breakdown
        </Text>
      </View>
    );
  }

  const sortedTechniques = [...techniqueStats].sort(
    (a, b) => b.totalMinutes - a.totalMinutes
  );

  return (
    <View style={styles.container}>
      {sortedTechniques.map((technique) => {
        const percentage =
          totalMinutes > 0 ? (technique.totalMinutes / totalMinutes) * 100 : 0;
        return (
          <View key={technique.techniqueId} style={styles.techniqueRow}>
            <View style={styles.techniqueInfo}>
              <Text style={styles.techniqueName}>{technique.name}</Text>
              <Text style={styles.techniqueStats}>
                {technique.totalMinutes} min · {technique.totalSessions} sessions
              </Text>
            </View>
            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${Math.max(percentage, 5)}%` },
                ]}
              />
            </View>
            <Text style={styles.percentage}>{percentage.toFixed(0)}%</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    textAlign: 'center',
  },
  techniqueRow: {
    gap: 8,
  },
  techniqueInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  techniqueName: {
    fontSize: 15,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.3,
  },
  techniqueStats: {
    fontSize: 12,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
  },
  progressContainer: {
    height: 8,
    backgroundColor: COLORS.colors.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.colors.primary,
    borderRadius: 4,
  },
  percentage: {
    fontSize: 13,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.text,
    alignSelf: 'flex-end',
  },
});
