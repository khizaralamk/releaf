import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { Fonts } from '../../styles/fonts/fonts';
import { SettingToggle } from '../../components/settings/SettingToggle';
import { SettingOption } from '../../components/settings/SettingOption';
import { SettingButton } from '../../components/settings/SettingButton';

const SettingsScreen = () => {
  // Audio Settings
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [voiceType, setVoiceType] = useState('Female');
  const [ambientSound, setAmbientSound] = useState(true);
  const [soundType, setSoundType] = useState('Rain');
  const [backgroundMusic, setBackgroundMusic] = useState(false);

  // Practice Settings
  const [vibrationFeedback, setVibrationFeedback] = useState(true);
  const [defaultDuration, setDefaultDuration] = useState('10 min');
  const [autoStart, setAutoStart] = useState(false);

  // Notifications
  const [dailyReminder, setDailyReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState('9:00 AM');
  const [streakReminders, setStreakReminders] = useState(true);

  // Display Settings
  const [showStats, setShowStats] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState('Normal');

  const handleVoiceTypePress = () => {
    Alert.alert(
      'Voice Type',
      'Choose your preferred voice guidance',
      [
        { text: 'Female', onPress: () => setVoiceType('Female') },
        { text: 'Male', onPress: () => setVoiceType('Male') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleSoundTypePress = () => {
    Alert.alert(
      'Ambient Sound',
      'Choose your ambient sound',
      [
        { text: 'Rain', onPress: () => setSoundType('Rain') },
        { text: 'Thunder', onPress: () => setSoundType('Thunder') },
        { text: 'Ocean', onPress: () => setSoundType('Ocean') },
        { text: 'Forest', onPress: () => setSoundType('Forest') },
        { text: 'Wind', onPress: () => setSoundType('Wind') },
        { text: 'Fire', onPress: () => setSoundType('Fire') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleDurationPress = () => {
    Alert.alert(
      'Default Duration',
      'Choose default session duration',
      [
        { text: '5 min', onPress: () => setDefaultDuration('5 min') },
        { text: '10 min', onPress: () => setDefaultDuration('10 min') },
        { text: '15 min', onPress: () => setDefaultDuration('15 min') },
        { text: '20 min', onPress: () => setDefaultDuration('20 min') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleAnimationSpeedPress = () => {
    Alert.alert(
      'Animation Speed',
      'Choose breathing animation speed',
      [
        { text: 'Slow', onPress: () => setAnimationSpeed('Slow') },
        { text: 'Normal', onPress: () => setAnimationSpeed('Normal') },
        { text: 'Fast', onPress: () => setAnimationSpeed('Fast') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleReminderTimePress = () => {
    Alert.alert('Reminder Time', 'Time picker would open here');
  };

  const handleExportData = () => {
    Alert.alert('Export Data', 'Your breathing data will be exported');
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all practice history? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const handleResetApp = () => {
    Alert.alert(
      'Reset App',
      'This will reset all settings and clear all data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const handleRateApp = () => {
    Alert.alert('Rate App', 'Thank you for your support!');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Audio Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audio</Text>
          <SettingToggle
            label="Voice Guidance"
            description="Hear instructions during breathing"
            value={voiceGuidance}
            onValueChange={setVoiceGuidance}
          />
          {voiceGuidance && (
            <SettingOption
              label="Voice Type"
              value={voiceType}
              onPress={handleVoiceTypePress}
            />
          )}
          <SettingToggle
            label="Ambient Sounds"
            description="Play calming background sounds"
            value={ambientSound}
            onValueChange={setAmbientSound}
          />
          {ambientSound && (
            <SettingOption
              label="Sound Type"
              value={soundType}
              onPress={handleSoundTypePress}
            />
          )}
          <SettingToggle
            label="Background Music"
            description="Play soft music during sessions"
            value={backgroundMusic}
            onValueChange={setBackgroundMusic}
          />
        </View>

        {/* Practice Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Practice</Text>
          <SettingToggle
            label="Vibration Feedback"
            description="Vibrate during breath transitions"
            value={vibrationFeedback}
            onValueChange={setVibrationFeedback}
          />
          <SettingOption
            label="Default Duration"
            description="Default session length"
            value={defaultDuration}
            onPress={handleDurationPress}
          />
          <SettingToggle
            label="Auto-Start Sessions"
            description="Start countdown immediately"
            value={autoStart}
            onValueChange={setAutoStart}
          />
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <SettingToggle
            label="Daily Reminder"
            description="Get reminded to practice daily"
            value={dailyReminder}
            onValueChange={setDailyReminder}
          />
          {dailyReminder && (
            <SettingOption
              label="Reminder Time"
              value={reminderTime}
              onPress={handleReminderTimePress}
            />
          )}
          <SettingToggle
            label="Streak Reminders"
            description="Get notified about streaks"
            value={streakReminders}
            onValueChange={setStreakReminders}
          />
        </View>

        {/* Display Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          <SettingToggle
            label="Show Stats During Session"
            description="Display timer and stats"
            value={showStats}
            onValueChange={setShowStats}
          />
          <SettingOption
            label="Animation Speed"
            description="Breathing circle animation"
            value={animationSpeed}
            onPress={handleAnimationSpeedPress}
          />
        </View>

        {/* Data & Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          <SettingButton label="Export Data" onPress={handleExportData} />
          <SettingButton
            label="Clear History"
            onPress={handleClearHistory}
            danger
          />
          <SettingButton label="Reset App" onPress={handleResetApp} danger />
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <SettingButton label="Rate Releaf" onPress={handleRateApp} />
          <SettingButton label="Privacy Policy" onPress={() => {}} />
          <SettingButton label="Terms of Service" onPress={() => {}} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with care for your wellbeing</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
  },
  header: {
    paddingVertical: SIZINGS.spacing.lg,
    paddingHorizontal: SIZINGS.spacing.xl,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.text,
    letterSpacing: -0.8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZINGS.spacing.xl,
    paddingBottom: 100,
  },
  section: {
    marginBottom: SIZINGS.spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.4,
    marginBottom: SIZINGS.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: COLORS.colors.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 15,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.3,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
  },
  footer: {
    paddingVertical: SIZINGS.spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
  },
});

export default SettingsScreen;
