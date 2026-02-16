import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { Fonts } from '../../styles/fonts/fonts';

interface FavoriteSessionCardProps {
  name: string;
  duration: string;
  sessions: number;
  onPlay: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

export const FavoriteSessionCard: React.FC<FavoriteSessionCardProps> = ({
  name,
  duration,
  sessions,
  onPlay,
  onToggleFavorite,
  isFavorite,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>{duration} min</Text>
            <View style={styles.dot} />
            <Text style={styles.metaText}>{sessions} sessions</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={onToggleFavorite}
            activeOpacity={0.7}>
            <Text style={styles.favoriteIcon}>{isFavorite ? '♥' : '♡'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playButton}
            onPress={onPlay}
            activeOpacity={0.7}>
            <Text style={styles.playIcon}>▶</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.colors.surface,
    borderRadius: 16,
    marginBottom: SIZINGS.spacing.md,
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZINGS.spacing.lg,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.colors.gray_400,
    marginHorizontal: 8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
  },
  favoriteIcon: {
    fontSize: 18,
    color: COLORS.colors.primary,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 16,
    color: COLORS.colors.white,
    marginLeft: 2,
  },
});
