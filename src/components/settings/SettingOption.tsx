import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { Fonts } from '../../styles/fonts/fonts';

interface SettingOptionProps {
  label: string;
  description?: string;
  value: string;
  onPress: () => void;
}

export const SettingOption: React.FC<SettingOptionProps> = ({
  label,
  description,
  value,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.colors.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
    marginBottom: 8,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  label: {
    fontSize: 15,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  value: {
    fontSize: 14,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
  },
  arrow: {
    fontSize: 24,
    color: COLORS.colors.gray_400,
  },
});
