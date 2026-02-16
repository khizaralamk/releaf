import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { Fonts } from '../../styles/fonts/fonts';
import { BREATHING_TECHNIQUES } from '../../constants/breathing/BREATHING_TECHNIQUES';
import { BreathingTechnique } from '../../types/Breathing';

const AllTechniquesScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleTechniquePress = (technique: BreathingTechnique) => {
    navigation.navigate('TechniqueDetail' as never, { technique } as never);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'relaxation':
        return '#50C9CE';
      case 'focus':
        return '#7C3AED';
      case 'stress-relief':
        return '#F59E0B';
      default:
        return COLORS.colors.primary;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>All Techniques</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Explore {BREATHING_TECHNIQUES.length} breathing techniques
        </Text>

        {/* Techniques List */}
        {BREATHING_TECHNIQUES.map((technique) => (
          <TouchableOpacity
            key={technique.id}
            style={styles.techniqueCard}
            onPress={() => handleTechniquePress(technique)}
            activeOpacity={0.7}>
            <View style={styles.cardLeft}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: getCategoryColor(technique.category) },
                ]}>
                <Text style={styles.iconText}>{technique.icon}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.techniqueName}>{technique.name}</Text>
                <Text style={styles.techniqueDescription}>
                  {technique.description}
                </Text>
                <View style={styles.metaRow}>
                  {technique.difficulty && (
                    <View style={styles.difficultyBadge}>
                      <Text style={styles.difficultyText}>
                        {technique.difficulty}
                      </Text>
                    </View>
                  )}
                  <Text style={styles.patternText}>
                    {technique.inhale}s-{technique.hold}s-{technique.exhale}s
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        ))}

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZINGS.spacing.xl,
    paddingVertical: SIZINGS.spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    fontSize: 28,
    color: COLORS.colors.text,
    fontFamily: Fonts.dmsans.regular,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.text,
    letterSpacing: -0.4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZINGS.spacing.xl,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
    marginBottom: SIZINGS.spacing.lg,
  },
  techniqueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.colors.surface,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
    padding: SIZINGS.spacing.lg,
    marginBottom: SIZINGS.spacing.md,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZINGS.spacing.md,
  },
  iconText: {
    fontSize: 14,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.white,
    letterSpacing: -0.2,
  },
  cardInfo: {
    flex: 1,
  },
  techniqueName: {
    fontSize: 16,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  techniqueDescription: {
    fontSize: 13,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  difficultyBadge: {
    backgroundColor: COLORS.colors.background,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 11,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.1,
  },
  patternText: {
    fontSize: 11,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.1,
  },
  arrowIcon: {
    fontSize: 24,
    color: COLORS.colors.textSecondary,
    marginLeft: SIZINGS.spacing.sm,
  },
});

export default AllTechniquesScreen;
