import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { Fonts } from '../../styles/fonts/fonts';
import { DailyPractice } from '../../types/Analytics';
import { getLast7Days, getDayLabels, getPracticeForDate } from '../../utils/analytics/analyticsUtils';

interface WeeklyChartProps {
  dailyPractice: DailyPractice[];
}

const CHART_HEIGHT = 120;
const CHART_PADDING = 40;

export const WeeklyChart: React.FC<WeeklyChartProps> = ({ dailyPractice }) => {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - CHART_PADDING * 2;
  const barWidth = (chartWidth - 48) / 7; // 48px for gaps (8px * 6 gaps)

  const dates = getLast7Days();
  const dayLabels = getDayLabels();

  const weekData = dates.map((date) => getPracticeForDate(date, dailyPractice));
  const maxMinutes = Math.max(...weekData.map((d) => d.minutes), 20); // Min scale of 20

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {/* Y-axis grid lines */}
        <View style={styles.gridLines}>
          {[0, 1, 2, 3, 4].map((index) => {
            const value = Math.round((maxMinutes / 4) * (4 - index));
            return (
              <View key={index} style={styles.gridLineRow}>
                <Text style={styles.yAxisLabel}>{value}</Text>
                <View style={styles.gridLine} />
              </View>
            );
          })}
        </View>

        {/* Bars */}
        <View style={styles.barsContainer}>
          {weekData.map((data, index) => {
            const barHeight = (data.minutes / maxMinutes) * (CHART_HEIGHT - 20);
            return (
              <View key={index} style={styles.barWrapper}>
                <View style={styles.barColumn}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: Math.max(barHeight, data.minutes > 0 ? 4 : 0),
                        width: barWidth,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.xAxisLabel}>{dayLabels[index]}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  chartContainer: {
    position: 'relative',
    height: CHART_HEIGHT + 30, // Extra space for labels
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: CHART_HEIGHT,
    justifyContent: 'space-between',
  },
  gridLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yAxisLabel: {
    fontSize: 10,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    width: 30,
  },
  gridLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.colors.border,
    marginLeft: 8,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: CHART_HEIGHT,
    paddingLeft: 38,
    gap: 8,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  barColumn: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  bar: {
    backgroundColor: COLORS.colors.primary,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    minHeight: 4,
  },
  xAxisLabel: {
    fontSize: 11,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.textSecondary,
    marginTop: 8,
  },
});
