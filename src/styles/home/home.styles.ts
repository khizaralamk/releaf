import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SIZINGS.spacing.xxl,
  },
  placeholderSection: {
    paddingHorizontal: SIZINGS.spacing.xl,
    paddingVertical: SIZINGS.spacing.xxl,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: SIZINGS.fontSizings.medium,
    color: COLORS.colors.textSecondary,
    textAlign: 'center',
  },
});
