import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useOnboardingNavigation } from '../../hooks/onboarding/useOnboardingNavigation';
import { styles } from '../../styles/onboarding/onboarding.styles';

const OnboardingScreen1 = () => {
  const { goToNext, skip } = useOnboardingNavigation(1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <Text style={styles.illustrationText}>🌱</Text>
        </View>

        <Text style={styles.title}>Welcome to Releaf</Text>
        <Text style={styles.description}>
          Discover amazing features that will help you grow and achieve your goals
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={skip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToNext} style={styles.nextButton}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen1;
