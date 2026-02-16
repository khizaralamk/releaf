import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZINGS.spacing.xl,
  },
  illustrationContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZINGS.spacing.xxl,
  },
  illustrationText: {
    fontSize: 120,
  },
  title: {
    fontSize: SIZINGS.fontSizings.large_6,
    fontWeight: 'bold',
    color: COLORS.colors.text,
    marginBottom: SIZINGS.spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: SIZINGS.fontSizings.medium,
    color: COLORS.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  nameInput: {
    width: '100%',
    marginTop: SIZINGS.spacing.xl,
    paddingVertical: SIZINGS.spacing.md,
    paddingHorizontal: SIZINGS.spacing.lg,
    fontSize: SIZINGS.fontSizings.large,
    color: COLORS.colors.text,
    backgroundColor: COLORS.colors.white,
    borderWidth: SIZINGS.borderSizings.medium,
    borderColor: COLORS.colors.border,
    borderRadius: SIZINGS.borderRadius.lg,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: SIZINGS.spacing.xl,
    paddingBottom: SIZINGS.spacing.xl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZINGS.spacing.xl,
    gap: SIZINGS.spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: SIZINGS.borderRadius.full,
    backgroundColor: COLORS.colors.gray_300,
  },
  activeDot: {
    width: 24,
    backgroundColor: COLORS.colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SIZINGS.spacing.md,
  },
  skipButton: {
    paddingVertical: SIZINGS.spacing.md,
    paddingHorizontal: SIZINGS.spacing.lg,
  },
  skipText: {
    fontSize: SIZINGS.fontSizings.medium,
    color: COLORS.colors.textSecondary,
    fontWeight: '600',
  },
  nextButton: {
    flex: 1,
    backgroundColor: COLORS.colors.primary,
    paddingVertical: SIZINGS.spacing.md,
    borderRadius: SIZINGS.borderRadius.lg,
    alignItems: 'center',
  },
  nextText: {
    fontSize: SIZINGS.fontSizings.medium,
    color: COLORS.colors.white,
    fontWeight: '600',
  },
  getStartedButton: {
    flex: 1,
    backgroundColor: COLORS.colors.primary,
    paddingVertical: SIZINGS.spacing.md,
    borderRadius: SIZINGS.borderRadius.lg,
    alignItems: 'center',
  },
  getStartedText: {
    fontSize: SIZINGS.fontSizings.medium,
    color: COLORS.colors.white,
    fontWeight: '600',
  },
});
