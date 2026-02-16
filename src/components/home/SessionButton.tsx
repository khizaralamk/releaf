import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';

interface SessionButtonProps {
  onPress: () => void;
}

export const SessionButton: React.FC<SessionButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={styles.buttonText}>Start Session</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.colors.primary,
    paddingVertical: SIZINGS.spacing.md,
    paddingHorizontal: SIZINGS.spacing.xl,
    borderRadius: SIZINGS.borderRadius.full,
    alignSelf: 'center',
    marginVertical: SIZINGS.spacing.lg,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: SIZINGS.fontSizings.large,
    fontWeight: '600',
    color: COLORS.colors.white,
  },
});
