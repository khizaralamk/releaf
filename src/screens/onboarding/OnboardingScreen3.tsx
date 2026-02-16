import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useOnboardingNavigation } from '../../hooks/onboarding/useOnboardingNavigation';
import { useUserName } from '../../hooks/home/useUserName';
import { styles } from '../../styles/onboarding/onboarding.styles';

const OnboardingScreen3 = () => {
  const { finish } = useOnboardingNavigation(3);
  const { saveUserName } = useUserName();
  const [name, setName] = useState('');

  const handleGetStarted = async () => {
    if (name.trim() === '') {
      Alert.alert('Name Required', 'Please enter your name to continue');
      return;
    }

    await saveUserName(name.trim());
    finish();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <Text style={styles.illustrationText}>✨</Text>
        </View>

        <Text style={styles.title}>What's your name?</Text>
        <Text style={styles.description}>
          We'd love to personalize your breathing journey
        </Text>

        <TextInput
          style={styles.nameInput}
          placeholder="Enter your name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCorrect={false}
          maxLength={30}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleGetStarted}
            style={styles.getStartedButton}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen3;
