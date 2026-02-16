import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { Fonts } from '../../styles/fonts/fonts';
import { Milestone } from '../../types/Analytics';

interface MilestonesProps {
  milestones: Milestone[];
}

export const Milestones: React.FC<MilestonesProps> = ({ milestones }) => {
  // Show only top 3 milestones (most relevant)
  const topMilestones = milestones.slice(0, 3);

  return (
    <View style={styles.container}>
      {topMilestones.map((milestone) => (
        <View key={milestone.id} style={styles.milestoneCard}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.icon}>{milestone.icon}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{milestone.title}</Text>
                <Text style={styles.description}>{milestone.description}</Text>
              </View>
            </View>
            {milestone.achieved && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>✓</Text>
              </View>
            )}
          </View>
          {!milestone.achieved && (
            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${milestone.progress}%` },
                ]}
              />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  milestoneCard: {
    backgroundColor: COLORS.colors.surface,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  icon: {
    fontSize: 22,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
  },
  badge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    color: COLORS.colors.white,
    fontFamily: Fonts.dmsans.bold,
  },
  progressContainer: {
    height: 4,
    backgroundColor: COLORS.colors.background,
    borderRadius: 2,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.colors.primary,
    borderRadius: 2,
  },
});
