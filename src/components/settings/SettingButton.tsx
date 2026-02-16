import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { Fonts } from '../../styles/fonts/fonts';

interface SettingButtonProps {
  label: string;
  onPress: () => void;
  danger?: boolean;
}

export const SettingButton: React.FC<SettingButtonProps> = ({
  label,
  onPress,
  danger = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, danger && styles.dangerContainer]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={[styles.label, danger && styles.dangerLabel]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: COLORS.colors.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
    marginBottom: 8,
    alignItems: 'center',
  },
  dangerContainer: {
    borderColor: '#FF6B6B',
  },
  label: {
    fontSize: 15,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.3,
  },
  dangerLabel: {
    color: '#FF6B6B',
  },
});
