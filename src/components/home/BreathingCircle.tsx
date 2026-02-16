import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { Fonts } from '../../styles/fonts/fonts';

const poly4 = require('../../assets/dialer_circles/cir1.png');
const poly3 = require('../../assets/dialer_circles/cir2.png');

interface BreathingCircleProps {
  inhale: number;
  hold: number;
  exhale: number;
  onPress?: () => void;
}

export const BreathingCircle: React.FC<BreathingCircleProps> = ({
  inhale,
  hold,
  exhale,
  onPress,
}) => {
  const outerScale = useRef(new Animated.Value(1)).current;
  const middleScale = useRef(new Animated.Value(1)).current;
  const outerOpacity = useRef(new Animated.Value(0.6)).current;
  const middleOpacity = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const breathingAnimation = Animated.loop(
      Animated.sequence([
        // Inhale - expand
        Animated.parallel([
          Animated.timing(outerScale, {
            toValue: 1.15,
            duration: 3500,
            useNativeDriver: true,
          }),
          Animated.timing(middleScale, {
            toValue: 1.1,
            duration: 3500,
            useNativeDriver: true,
          }),
          Animated.timing(outerOpacity, {
            toValue: 0.8,
            duration: 3500,
            useNativeDriver: true,
          }),
          Animated.timing(middleOpacity, {
            toValue: 1,
            duration: 3500,
            useNativeDriver: true,
          }),
        ]),
        // Exhale - contract
        Animated.parallel([
          Animated.timing(outerScale, {
            toValue: 1,
            duration: 3500,
            useNativeDriver: true,
          }),
          Animated.timing(middleScale, {
            toValue: 1,
            duration: 3500,
            useNativeDriver: true,
          }),
          Animated.timing(outerOpacity, {
            toValue: 0.6,
            duration: 3500,
            useNativeDriver: true,
          }),
          Animated.timing(middleOpacity, {
            toValue: 0.8,
            duration: 3500,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    breathingAnimation.start();

    return () => breathingAnimation.stop();
  }, [outerScale, middleScale, outerOpacity, middleOpacity]);

  return (
    <View style={styles.container}>
      {/* Outer circle with breathing animation */}
      <Animated.Image
        source={poly4}
        style={[
          styles.outerCircle,
          {
            transform: [{ scale: outerScale }],
            opacity: outerOpacity,
          },
        ]}
        resizeMode="contain"
      />

      {/* Inner circle with breathing animation */}
      <Animated.Image
        source={poly3}
        style={[
          styles.innerCircle,
          {
            transform: [{ scale: middleScale }],
            opacity: middleOpacity,
          },
        ]}
        resizeMode="contain"
      />

      {/* Start button */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={onPress}
        activeOpacity={0.8}>
        <Text style={styles.startText}>Start</Text>
        <Text style={styles.sessionText}>Box Breathing</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZINGS.spacing.xxl + 20,
    height: 380,
  },
  outerCircle: {
    position: 'absolute',
    width: 350,
    height: 350,
  },
  innerCircle: {
    position: 'absolute',
    width: 280,
    height: 280,
  },
  startButton: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  startText: {
    fontSize: 32,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.text,
    letterSpacing: -1,
    marginBottom: 4,
  },
  sessionText: {
    fontSize: 13,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
  },
});
