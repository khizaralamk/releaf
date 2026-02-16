import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { Fonts } from '../../styles/fonts/fonts';
import { DailyPractice } from '../../types/Analytics';
import {
  getLast12Weeks,
  getStreakColor,
  getPracticeForDate,
  formatDate,
} from '../../utils/analytics/analyticsUtils';

interface StreakGridProps {
  dailyPractice: DailyPractice[];
}

export const StreakGrid: React.FC<StreakGridProps> = ({ dailyPractice }) => {
  const dates = getLast12Weeks();
  const today = formatDate(new Date());

  // Organize dates into weeks (7 days each)
  const weeks: string[][] = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={styles.container}>
      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendText}>Less</Text>
        <View style={styles.legendSquares}>
          {[0, 1, 2, 3, 4].map((level) => (
            <View
              key={level}
              style={[
                styles.legendSquare,
                {
                  backgroundColor: getStreakColor(
                    level === 0 ? 0 : level === 1 ? 3 : level === 2 ? 10 : level === 3 ? 20 : 35
                  ),
                  borderColor: level === 0 ? COLORS.colors.border : 'transparent',
                  borderWidth: level === 0 ? 1 : 0,
                },
              ]}
            />
          ))}
        </View>
        <Text style={styles.legendText}>More</Text>
      </View>

      {/* Grid */}
      <View style={styles.gridContainer}>
        {/* Day labels */}
        <View style={styles.dayLabelsContainer}>
          {dayLabels.map((day, index) => (
            <Text key={day} style={styles.dayLabel}>
              {index % 2 === 1 ? day : ''}
            </Text>
          ))}
        </View>

        {/* Week columns */}
        <View style={styles.weeksContainer}>
          {weeks.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.weekColumn}>
              {week.map((date) => {
                const practice = getPracticeForDate(date, dailyPractice);
                const isToday = date === today;
                return (
                  <TouchableOpacity
                    key={date}
                    style={[
                      styles.cell,
                      {
                        backgroundColor: getStreakColor(practice.minutes),
                        borderColor: isToday
                          ? COLORS.colors.primary
                          : practice.minutes === 0
                          ? COLORS.colors.border
                          : 'transparent',
                        borderWidth: isToday ? 2 : practice.minutes === 0 ? 1 : 0,
                      },
                    ]}
                    activeOpacity={0.7}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 12,
    gap: 6,
  },
  legendText: {
    fontSize: 11,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
  },
  legendSquares: {
    flexDirection: 'row',
    gap: 3,
  },
  legendSquare: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  gridContainer: {
    flexDirection: 'row',
  },
  dayLabelsContainer: {
    justifyContent: 'space-between',
    marginRight: 4,
    height: 91, // 7 cells * 12px + 6 gaps * 2px = 91px
  },
  dayLabel: {
    fontSize: 10,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    height: 12,
    lineHeight: 12,
  },
  weeksContainer: {
    flexDirection: 'row',
    gap: 2,
    flex: 1,
  },
  weekColumn: {
    gap: 2,
  },
  cell: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
});
