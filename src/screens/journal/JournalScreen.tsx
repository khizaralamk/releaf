import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { Fonts } from '../../styles/fonts/fonts';

const JournalScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>Journal</Text>
        <Text style={styles.subtitle}>Track how you feel after each session</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📓</Text>
          <Text style={styles.emptyTitle}>No entries yet</Text>
          <Text style={styles.emptyDescription}>
            Your journal entries will appear here after each breathing session
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
  },
  header: {
    paddingVertical: SIZINGS.spacing.lg,
    paddingHorizontal: SIZINGS.spacing.xl,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.text,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    marginTop: 4,
    letterSpacing: -0.1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZINGS.spacing.xl,
    paddingBottom: 100,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZINGS.spacing.xxl * 2,
  },
  emptyIcon: {
    fontSize: 56,
    marginBottom: SIZINGS.spacing.md,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.4,
    marginBottom: SIZINGS.spacing.sm,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.1,
    textAlign: 'center',
    lineHeight: 21,
  },
});

export default JournalScreen;
