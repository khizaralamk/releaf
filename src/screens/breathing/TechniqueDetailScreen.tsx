import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { Fonts } from '../../styles/fonts/fonts';
import { BreathingTechnique } from '../../types/Type';
import { useFavorites } from '../../hooks/favorites/useFavorites';

type TechniqueDetailRouteProp = RouteProp<
  { TechniqueDetail: { technique: BreathingTechnique } },
  'TechniqueDetail'
>;

const TechniqueDetailScreen = () => {
  const route = useRoute<TechniqueDetailRouteProp>();
  const navigation = useNavigation();
  const { technique } = route.params;
  const { toggleFavorite, isFavorite } = useFavorites();

  const [selectedDuration, setSelectedDuration] = useState(10);
  const [voiceGuidance, setVoiceGuidance] = useState(false);
  const [voiceType, setVoiceType] = useState<'female' | 'male'>('female');
  const [ambientSound, setAmbientSound] = useState<string>('none');
  const [soundVolume, setSoundVolume] = useState(50);

  const isTechniqueFavorited = isFavorite(technique.id);

  const durations = [5, 10, 15, 20];
  const ambientSounds = ['none', 'rain', 'thunder', 'ocean', 'forest', 'wind', 'fire'];

  const handleStart = () => {
    navigation.navigate('BreathingSession' as never, {
      techniqueId: technique.id,
      duration: selectedDuration,
      voiceGuidance,
      voiceType,
      ambientSound,
      soundVolume,
    } as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleToggleFavorite = async () => {
    await toggleFavorite(technique.id);
  };

  const getDifficultyBadge = () => {
    return technique.difficulty || 'Beginner';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.favoriteIcon,
                isTechniqueFavorited && styles.favoriteIconActive,
              ]}>
              {isTechniqueFavorited ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Technique Name & Badge */}
        <View style={styles.titleSection}>
          <Text style={styles.techniqueName}>{technique.name}</Text>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{getDifficultyBadge()}</Text>
          </View>
        </View>

        {/* Duration Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <View style={styles.durationRow}>
            {durations.map((duration) => (
              <TouchableOpacity
                key={duration}
                style={[
                  styles.durationPill,
                  selectedDuration === duration && styles.durationPillSelected,
                ]}
                onPress={() => setSelectedDuration(duration)}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.durationText,
                    selectedDuration === duration && styles.durationTextSelected,
                  ]}>
                  {duration} min
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Technique Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pattern</Text>
          <View style={styles.infoCard}>
            <Text style={styles.patternText}>
              Inhale {technique.inhale}s → Hold {technique.hold}s → Exhale{' '}
              {technique.exhale}s
              {technique.holdAfterExhale ? ` → Hold ${technique.holdAfterExhale}s` : ''}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoCard}>
            <Text style={styles.description}>{technique.description}</Text>
          </View>
        </View>

        {/* Benefits */}
        {technique.benefits && technique.benefits.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Benefits</Text>
            <View style={styles.infoCard}>
              {technique.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitRow}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Voice Guidance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voice Guidance</Text>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => setVoiceGuidance(!voiceGuidance)}
            activeOpacity={0.7}>
            <Text style={styles.toggleLabel}>Enable voice guidance</Text>
            <View style={[styles.toggle, voiceGuidance && styles.toggleActive]}>
              <View
                style={[
                  styles.toggleThumb,
                  voiceGuidance && styles.toggleThumbActive,
                ]}
              />
            </View>
          </TouchableOpacity>

          {voiceGuidance && (
            <View style={styles.voiceTypeRow}>
              <TouchableOpacity
                style={[
                  styles.voicePill,
                  voiceType === 'female' && styles.voicePillSelected,
                ]}
                onPress={() => setVoiceType('female')}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.voiceText,
                    voiceType === 'female' && styles.voiceTextSelected,
                  ]}>
                  Female
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.voicePill,
                  voiceType === 'male' && styles.voicePillSelected,
                ]}
                onPress={() => setVoiceType('male')}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.voiceText,
                    voiceType === 'male' && styles.voiceTextSelected,
                  ]}>
                  Male
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Ambient Sound */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ambient Sound</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.soundScroll}>
            {ambientSounds.map((sound) => (
              <TouchableOpacity
                key={sound}
                style={[
                  styles.soundCard,
                  ambientSound === sound && styles.soundCardSelected,
                ]}
                onPress={() => setAmbientSound(sound)}
                activeOpacity={0.7}>
                <Text style={styles.soundEmoji}>
                  {sound === 'none' && '✕'}
                  {sound === 'rain' && '🌧️'}
                  {sound === 'thunder' && '⛈️'}
                  {sound === 'ocean' && '🌊'}
                  {sound === 'forest' && '🌲'}
                  {sound === 'wind' && '💨'}
                  {sound === 'fire' && '🔥'}
                </Text>
                <Text
                  style={[
                    styles.soundLabel,
                    ambientSound === sound && styles.soundLabelSelected,
                  ]}>
                  {sound.charAt(0).toUpperCase() + sound.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Start Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStart}
          activeOpacity={0.8}>
          <Text style={styles.startButtonText}>Start Session</Text>
        </TouchableOpacity>
      </View>
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
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 24,
    color: COLORS.colors.textSecondary,
  },
  favoriteIconActive: {
    color: COLORS.colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZINGS.spacing.xl,
  },
  titleSection: {
    marginBottom: SIZINGS.spacing.lg,
  },
  techniqueName: {
    fontSize: 32,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.text,
    letterSpacing: -1,
    marginBottom: SIZINGS.spacing.sm,
  },
  difficultyBadge: {
    backgroundColor: COLORS.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.white,
    letterSpacing: -0.2,
  },
  section: {
    marginBottom: SIZINGS.spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.3,
    marginBottom: SIZINGS.spacing.md,
  },
  durationRow: {
    flexDirection: 'row',
    gap: 8,
  },
  durationPill: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: COLORS.colors.surface,
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
    alignItems: 'center',
  },
  durationPillSelected: {
    backgroundColor: COLORS.colors.primary,
    borderColor: COLORS.colors.primary,
  },
  durationText: {
    fontSize: 14,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.2,
  },
  durationTextSelected: {
    color: COLORS.colors.white,
  },
  infoCard: {
    backgroundColor: COLORS.colors.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
    padding: SIZINGS.spacing.lg,
  },
  patternText: {
    fontSize: 15,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.text,
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  description: {
    fontSize: 15,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  benefitRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 15,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.primary,
    marginRight: 8,
  },
  benefitText: {
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.colors.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
    padding: SIZINGS.spacing.lg,
  },
  toggleLabel: {
    fontSize: 15,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.text,
    letterSpacing: -0.2,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.colors.gray_300,
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: COLORS.colors.primary,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.colors.white,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  voiceTypeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: SIZINGS.spacing.md,
  },
  voicePill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: COLORS.colors.surface,
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
    alignItems: 'center',
  },
  voicePillSelected: {
    backgroundColor: COLORS.colors.primary,
    borderColor: COLORS.colors.primary,
  },
  voiceText: {
    fontSize: 14,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.text,
    letterSpacing: -0.2,
  },
  voiceTextSelected: {
    color: COLORS.colors.white,
  },
  soundScroll: {
    marginTop: 4,
  },
  soundCard: {
    width: 80,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 12,
    backgroundColor: COLORS.colors.surface,
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
    alignItems: 'center',
  },
  soundCardSelected: {
    backgroundColor: COLORS.colors.primary,
    borderColor: COLORS.colors.primary,
  },
  soundEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  soundLabel: {
    fontSize: 12,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.text,
    letterSpacing: -0.2,
  },
  soundLabelSelected: {
    color: COLORS.colors.white,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SIZINGS.spacing.xl,
    paddingVertical: SIZINGS.spacing.lg,
    paddingBottom: 100,
    backgroundColor: COLORS.colors.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.colors.border,
  },
  startButton: {
    backgroundColor: COLORS.colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.white,
    letterSpacing: -0.3,
  },
});

export default TechniqueDetailScreen;
