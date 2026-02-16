import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../constants/styles/COLORS';
import { BreathingTechnique } from '../../types/Breathing';
import { Fonts } from '../../styles/fonts/fonts';

interface TechniqueCardProps {
  technique: BreathingTechnique;
  onPress: () => void;
}

const gradientColors: { [key: string]: string[] } = {
  '0': [COLORS.colors.primary, COLORS.colors.primaryDark],
  '1': [COLORS.colors.accent, COLORS.colors.accentPurple],
  '2': [COLORS.colors.accentBlue, COLORS.colors.primary],
};

export const TechniqueCard: React.FC<TechniqueCardProps> = ({
  technique,
  onPress,
}) => {
  const colorIndex = (technique.id.charCodeAt(0) % 3).toString();
  const colors = gradientColors[colorIndex];

  return (
    <TouchableOpacity style={styles.cardWrapper} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={colors}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{technique.icon}</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>
          {technique.name}
        </Text>
        {technique.difficulty && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{technique.difficulty}</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    margin: 6,
  },
  card: {
    aspectRatio: 1,
    borderRadius: 20,
    padding: 18,
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: COLORS.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
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
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  badgeText: {
    fontSize: 10,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.white,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
});
