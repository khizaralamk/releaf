import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { BREATHING_TECHNIQUES } from '../../constants/breathing/BREATHING_TECHNIQUES';
import { TechniqueCard } from './TechniqueCard';
import { Navigation } from '../../types/Type';
import { Fonts } from '../../styles/fonts/fonts';

export const TechniquesGrid: React.FC = () => {
  const navigation = useNavigation<Navigation>();

  // Filter out box breathing and limit to 3 techniques for home screen
  const displayedTechniques = BREATHING_TECHNIQUES.filter((t) => t.id !== 'box').slice(0, 3);

  const handleTechniquePress = (techniqueId: string) => {
    const technique = BREATHING_TECHNIQUES.find((t) => t.id === techniqueId);
    if (technique) {
      navigation.navigate('TechniqueDetail', { technique });
    }
  };

  const handleSeeAll = () => {
    navigation.navigate('AllTechniques');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Breathing Techniques</Text>
        <TouchableOpacity onPress={handleSeeAll} activeOpacity={0.7}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        {displayedTechniques.map((technique) => (
          <View key={technique.id} style={styles.cardWrapper}>
            <TechniqueCard
              technique={technique}
              onPress={() => handleTechniquePress(technique.id)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZINGS.spacing.xl,
    paddingVertical: SIZINGS.spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZINGS.spacing.md,
  },
  sectionTitle: {
    fontSize: SIZINGS.fontSizings.large_2,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.text,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.primary,
    letterSpacing: -0.2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SIZINGS.spacing.sm,
  },
  cardWrapper: {
    width: '50%',
  },
});
