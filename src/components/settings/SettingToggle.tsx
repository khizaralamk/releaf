import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { Fonts } from '../../styles/fonts/fonts';

interface SettingToggleProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const SettingToggle: React.FC<SettingToggleProps> = ({
  label,
  description,
  value,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: COLORS.colors.gray_400,
          true: `${COLORS.colors.primary}80`,
        }}
        thumbColor={value ? COLORS.colors.primary : COLORS.colors.white}
        ios_backgroundColor={COLORS.colors.gray_400}
      />
    </View>
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
});
