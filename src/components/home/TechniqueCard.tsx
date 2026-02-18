import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { BreathingTechnique } from '../../types/Breathing';
import { Fonts } from '../../styles/fonts/fonts';

interface TechniqueCardProps {
  technique: BreathingTechnique;
  onPress: () => void;
}

export const TechniqueCard: React.FC<TechniqueCardProps> = ({
  technique,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.cardWrapper} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Text style={styles.name} numberOfLines={2}>
          {technique.name}
        </Text>
      
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: '48%',
  },
  card: {
    aspectRatio: 1,
borderRadius: 12,
    padding: 18,
    justifyContent: 'space-between',
    backgroundColor: COLORS.colors.card,

  },
  name: {
    fontSize: 16,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.white,
    letterSpacing: -0.4,
    lineHeight: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.white,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
});
