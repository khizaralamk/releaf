import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowUpRightIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { BREATHING_TECHNIQUES } from '../../constants/breathing/BREATHING_TECHNIQUES';
import { BreathingTechnique } from '../../types/Breathing';
import { Navigation } from '../../types/Type';
import { Fonts } from '../../styles/fonts/fonts';

interface SessionCardProps {
  technique: BreathingTechnique;
  index: number;
  onPress: () => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ technique, index, onPress }) => {
  const shimmerX = useRef(new Animated.Value(-120)).current;

  useEffect(() => {
    let isMounted = true;

    const run = () => {
      shimmerX.setValue(-120);
      Animated.sequence([
        Animated.delay(index * 600 + 2000),
        Animated.timing(shimmerX, {
          toValue: 380,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.delay(2000),
      ]).start(({ finished }) => {
        if (finished && isMounted) {run();}
      });
    };

    run();
    return () => { isMounted = false; };
  }, [shimmerX, index]);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Shimmer overlay */}
      <Animated.View
        style={[styles.shimmer, { transform: [{ translateX: shimmerX }, { rotate: '45deg' }] }]}
        pointerEvents="none">
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.09)', 'rgba(255,255,255,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.shimmerGradient}
        />
      </Animated.View>

      <ArrowUpRightIcon size={18} color={COLORS.colors.gray_500} style={styles.arrow} />
      <Text style={styles.cardTitle} numberOfLines={2}>
        {technique.name}
      </Text>
    </TouchableOpacity>
  );
};

export const TechniquesGrid: React.FC = () => {
  const navigation = useNavigation<Navigation>();

  const displayedTechniques = BREATHING_TECHNIQUES.filter((t) => t.id !== 'box').slice(0, 4);

  const handleTechniquePress = (techniqueId: string) => {
    const technique = BREATHING_TECHNIQUES.find((t) => t.id === techniqueId);
    if (technique) {
      navigation.navigate('TechniqueDetail', { technique });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Explore sessions</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllTechniques')} activeOpacity={0.7}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {displayedTechniques.map((technique, index) => (
          <SessionCard
            key={technique.id}
            technique={technique}
            index={index}
            onPress={() => handleTechniquePress(technique.id)}
          />
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
    letterSpacing: -0.4,
  },
  seeAllText: {
    fontSize: 13,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.primary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: COLORS.colors.card,
    padding: 14,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: -80,
    bottom: -80,
    width: 70,
  },
  shimmerGradient: {
    flex: 1,
    width: 70,
  },
  arrow: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.3,
    lineHeight: 19,
  },
});
