import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { Fonts } from '../../styles/fonts/fonts';
import { formatHour } from '../../utils/analytics/analyticsUtils';

interface PracticeInsightsProps {
  bestPracticeHour: number;
  favoriteTechnique: string;
  averageSessionDuration: number;
  consistencyScore: number;
}

export const PracticeInsights: React.FC<PracticeInsightsProps> = ({
  bestPracticeHour,
  favoriteTechnique,
  averageSessionDuration,
  consistencyScore,
}) => {
  const insights = [
    {
      id: 'time',
      label: 'Best Time',
      value: formatHour(bestPracticeHour),
    },
    {
      id: 'consistency',
      label: 'Consistency',
      value: `${consistencyScore}%`,
    },
    {
      id: 'average',
      label: 'Avg Session',
      value: averageSessionDuration > 0 ? `${averageSessionDuration} min` : 'N/A',
    },
    {
      id: 'favorite',
      label: 'Favorite',
      value: favoriteTechnique,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {insights.map((insight) => (
          <View key={insight.id} style={styles.insightCard}>
            <Text style={styles.label}>{insight.label}</Text>
            <Text style={styles.value}>{insight.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  insightCard: {
    width: '48.5%',
    backgroundColor: COLORS.colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
    marginBottom: 6,
  },
  value: {
    fontSize: 18,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.text,
    letterSpacing: -0.4,
  },
});
