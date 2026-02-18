import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { Fonts } from '../../styles/fonts/fonts';
import { FavoriteSessionCard } from '../../components/favorites/FavoriteSessionCard';
import { useFavorites } from '../../hooks/favorites/useFavorites';
import { useFrequentTechniques } from '../../hooks/favorites/useFrequentTechniques';
import { BREATHING_TECHNIQUES } from '../../constants/breathing/BREATHING_TECHNIQUES';
import { Navigation } from '../../types/Type';

const FavoritesScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { favorites, toggleFavorite, refreshFavorites } = useFavorites();
  const { frequentTechniques, refreshFrequentTechniques } = useFrequentTechniques();

  useFocusEffect(
    useCallback(() => {
      refreshFavorites();
      refreshFrequentTechniques();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const favoritedTechniques = BREATHING_TECHNIQUES.filter((tech) =>
    favorites.includes(tech.id)
  );

  const handlePlay = (techniqueId: string) => {
    const technique = BREATHING_TECHNIQUES.find((t) => t.id === techniqueId);
    if (technique) {
      navigation.navigate('TechniqueDetail', { technique });
    }
  };

  const handleToggleFavorite = async (techniqueId: string) => {
    await toggleFavorite(techniqueId);
  };

  const isEmpty = frequentTechniques.length === 0 && favoritedTechniques.length === 0;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>Your saved techniques & sessions</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, isEmpty && styles.scrollEmpty]}>

        {frequentTechniques.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Frequently Used</Text>
            {frequentTechniques.map((usage) => {
              const technique = BREATHING_TECHNIQUES.find((t) => t.id === usage.techniqueId);
              if (!technique) {return null;}
              return (
                <FavoriteSessionCard
                  key={usage.techniqueId}
                  name={usage.techniqueName}
                  duration={Math.round(usage.totalMinutes / usage.sessionCount).toString()}
                  sessions={usage.sessionCount}
                  isFavorite={favorites.includes(usage.techniqueId)}
                  onPlay={() => handlePlay(usage.techniqueId)}
                  onToggleFavorite={() => handleToggleFavorite(usage.techniqueId)}
                />
              );
            })}
          </View>
        )}

        {favoritedTechniques.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saved</Text>
            {favoritedTechniques.map((technique) => {
              const usage = frequentTechniques.find((u) => u.techniqueId === technique.id);
              const sessionCount = usage?.sessionCount ?? 0;
              const avgDuration = usage
                ? Math.round(usage.totalMinutes / usage.sessionCount)
                : 10;
              return (
                <FavoriteSessionCard
                  key={technique.id}
                  name={technique.name}
                  duration={avgDuration.toString()}
                  sessions={sessionCount}
                  isFavorite={true}
                  onPlay={() => handlePlay(technique.id)}
                  onToggleFavorite={() => handleToggleFavorite(technique.id)}
                />
              );
            })}
          </View>
        )}

        {isEmpty && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>♡</Text>
            <Text style={styles.emptyTitle}>Nothing saved yet</Text>
            <Text style={styles.emptyDescription}>
              Tap the heart on any technique to save it here
            </Text>
          </View>
        )}
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
    paddingTop: SIZINGS.spacing.md,
    paddingBottom: SIZINGS.spacing.lg,
    paddingHorizontal: SIZINGS.spacing.xl,
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.text,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
  },
  scrollContent: {
    paddingHorizontal: SIZINGS.spacing.xl,
    paddingBottom: 110,
  },
  scrollEmpty: {
    flexGrow: 1,
  },
  section: {
    marginBottom: SIZINGS.spacing.xl,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.textSecondary,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: SIZINGS.spacing.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyIcon: {
    fontSize: 52,
    color: COLORS.colors.textSecondary,
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.4,
  },
  emptyDescription: {
    fontSize: 13,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default FavoritesScreen;
