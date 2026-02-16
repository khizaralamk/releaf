import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { BREATHING_TECHNIQUES } from '../../constants/breathing/BREATHING_TECHNIQUES';
import { STACK_NAVIGATOR_PARAMS } from '../../types/Type';

type BreathingSessionRouteProp = RouteProp<
  STACK_NAVIGATOR_PARAMS,
  'BreathingSession'
>;

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'holdAfterExhale';

const BreathingSessionScreen = () => {
  const route = useRoute<BreathingSessionRouteProp>();
  const navigation = useNavigation();
  const { techniqueId } = route.params;

  const technique = BREATHING_TECHNIQUES.find((t) => t.id === techniqueId);

  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathingPhase>('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    if (technique) {
      setTimeLeft(technique.inhale);
    }
  }, [technique]);

  useEffect(() => {
    if (!isActive || !technique) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Move to next phase
          switch (phase) {
            case 'inhale':
              setPhase('hold');
              return technique.hold;
            case 'hold':
              setPhase('exhale');
              return technique.exhale;
            case 'exhale':
              if (technique.holdAfterExhale) {
                setPhase('holdAfterExhale');
                return technique.holdAfterExhale;
              }
              setPhase('inhale');
              return technique.inhale;
            case 'holdAfterExhale':
              setPhase('inhale');
              return technique.inhale;
            default:
              return technique.inhale;
          }
        }
        return prev - 1;
      });

      setTotalTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase, technique]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'holdAfterExhale':
        return 'Hold';
      default:
        return 'Breathe';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!technique) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Technique not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.techniqueName}>{technique.name}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Total Time */}
        <Text style={styles.totalTime}>{formatTime(totalTime)}</Text>

        {/* Breathing Circle */}
        <View style={styles.circleContainer}>
          <View
            style={[
              styles.circle,
              phase === 'inhale' && styles.circleInhale,
              phase === 'exhale' && styles.circleExhale,
            ]}>
            <Text style={styles.phaseText}>{getPhaseText()}</Text>
            <Text style={styles.countdown}>{timeLeft}</Text>
          </View>
        </View>

        {/* Instructions */}
        <Text style={styles.instructions}>{technique.description}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.actionButton, isActive && styles.stopButton]}
          onPress={handleStartStop}>
          <Text style={styles.actionButtonText}>
            {isActive ? 'Pause' : 'Start'}
          </Text>
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
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: SIZINGS.fontSizings.large_4,
    color: COLORS.colors.text,
  },
  techniqueName: {
    fontSize: SIZINGS.fontSizings.large,
    fontWeight: '600',
    color: COLORS.colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZINGS.spacing.xl,
  },
  totalTime: {
    fontSize: SIZINGS.fontSizings.large_2,
    color: COLORS.colors.textSecondary,
    marginBottom: SIZINGS.spacing.xxl,
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SIZINGS.spacing.xxl,
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: COLORS.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease',
  },
  circleInhale: {
    transform: [{ scale: 1.1 }],
    borderColor: COLORS.colors.primary,
  },
  circleExhale: {
    transform: [{ scale: 0.9 }],
    borderColor: COLORS.colors.secondary,
  },
  phaseText: {
    fontSize: SIZINGS.fontSizings.large_4,
    fontWeight: 'bold',
    color: COLORS.colors.primary,
    marginBottom: SIZINGS.spacing.md,
  },
  countdown: {
    fontSize: SIZINGS.fontSizings.large_10,
    fontWeight: 'bold',
    color: COLORS.colors.primary,
  },
  instructions: {
    fontSize: SIZINGS.fontSizings.medium,
    color: COLORS.colors.textSecondary,
    textAlign: 'center',
    marginTop: SIZINGS.spacing.xxl,
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: SIZINGS.spacing.xl,
    paddingBottom: SIZINGS.spacing.xxl,
  },
  actionButton: {
    backgroundColor: COLORS.colors.primary,
    paddingVertical: SIZINGS.spacing.lg,
    borderRadius: SIZINGS.borderRadius.full,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: COLORS.colors.error,
  },
  actionButtonText: {
    fontSize: SIZINGS.fontSizings.large,
    fontWeight: '600',
    color: COLORS.colors.white,
  },
});

export default BreathingSessionScreen;
