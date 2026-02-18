import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HeartIcon } from 'react-native-heroicons/outline';
import { HeartIcon as HeartSolidIcon, PlayIcon } from 'react-native-heroicons/solid';
import { COLORS } from '../../constants/styles/COLORS';
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
      <View style={styles.left}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>{duration} min</Text>
          <View style={styles.dot} />
          <Text style={styles.metaText}>{sessions} {sessions === 1 ? 'session' : 'sessions'}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onToggleFavorite} activeOpacity={0.7} style={styles.iconBtn}>
          {isFavorite
            ? <HeartSolidIcon size={18} color={COLORS.colors.primary} />
            : <HeartIcon size={18} color={COLORS.colors.gray_400} />
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={onPlay} activeOpacity={0.7} style={styles.playBtn}>
          <PlayIcon size={16} color={COLORS.colors.background} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.colors.card,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  left: {
    flex: 1,
    gap: 5,
  },
  name: {
    fontSize: 15,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.3,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.colors.gray_400,
    marginHorizontal: 7,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
  },
});
