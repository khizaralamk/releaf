import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { useGreeting } from '../../hooks/home/useGreeting';
import { Fonts } from '../../styles/fonts/fonts';

interface GreetingHeaderProps {
  name: string;
  onProPress?: () => void;
}

export const GreetingHeader: React.FC<GreetingHeaderProps> = ({ name, onProPress }) => {
  const greeting = useGreeting();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.greetingText}>{greeting.message}</Text>
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <TouchableOpacity style={styles.proPill} onPress={onProPress} activeOpacity={0.7}>
          <Text style={styles.proText}>PRO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SIZINGS.spacing.lg,
    paddingHorizontal: SIZINGS.spacing.xl,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 15,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 32,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.text,
    letterSpacing: -2.5,
    lineHeight: 0.9 * 32,
  },
  proPill: {
    backgroundColor: COLORS.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 18,
  },
  proText: {
    fontSize: 11,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.white,
    letterSpacing: 0.5,
  },
});
