import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';
import { Fonts } from '../../styles/fonts/fonts';

type PricingTier = 'monthly' | 'yearly';

const PricingScreen = () => {
  const navigation = useNavigation();
  const [selectedTier, setSelectedTier] = useState<PricingTier>('yearly');

  const handleClose = () => {
    navigation.goBack();
  };

  const handleSubscribe = () => {
    // TODO: Implement in-app purchase logic
    console.log('Subscribe to:', selectedTier);
  };

  const benefits = [
    'All breathing techniques unlocked',
    'Custom technique builder',
    'Advanced analytics',
    'Unlimited favorites',
    'Export practice data',
    'Ad-free experience',
    'Premium ambient sounds',
    'Priority support',
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <Text style={styles.headerTitle}>Upgrade to PRO</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Subtitle */}
        <Text style={styles.subtitle}>Unlock your full potential</Text>

        {/* Benefits Section */}
        <View style={styles.benefitsSection}>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitRow}>
              <View style={styles.checkIcon}>
                <Text style={styles.checkText}>✓</Text>
              </View>
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        {/* Pricing Tiers */}
        <View style={styles.pricingSection}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>

          {/* Yearly Tier */}
          <TouchableOpacity
            style={[
              styles.tierCard,
              selectedTier === 'yearly' && styles.tierCardSelected,
            ]}
            onPress={() => setSelectedTier('yearly')}
            activeOpacity={0.7}>
            <View style={styles.tierHeader}>
              <View style={styles.tierInfo}>
                <Text style={styles.tierName}>Yearly</Text>
                <Text style={styles.tierPrice}>$29.99/year</Text>
              </View>
              {selectedTier === 'yearly' && (
                <View style={styles.radioOuter}>
                  <View style={styles.radioInner} />
                </View>
              )}
              {selectedTier !== 'yearly' && <View style={styles.radioOuter} />}
            </View>
            <View style={styles.bestValueBadge}>
              <Text style={styles.bestValueText}>BEST VALUE - Save 50%</Text>
            </View>
          </TouchableOpacity>

          {/* Monthly Tier */}
          <TouchableOpacity
            style={[
              styles.tierCard,
              selectedTier === 'monthly' && styles.tierCardSelected,
            ]}
            onPress={() => setSelectedTier('monthly')}
            activeOpacity={0.7}>
            <View style={styles.tierHeader}>
              <View style={styles.tierInfo}>
                <Text style={styles.tierName}>Monthly</Text>
                <Text style={styles.tierPrice}>$4.99/month</Text>
              </View>
              {selectedTier === 'monthly' && (
                <View style={styles.radioOuter}>
                  <View style={styles.radioInner} />
                </View>
              )}
              {selectedTier !== 'monthly' && <View style={styles.radioOuter} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={handleSubscribe}
          activeOpacity={0.8}>
          <Text style={styles.subscribeButtonText}>Start 7-Day Free Trial</Text>
        </TouchableOpacity>
        <Text style={styles.trialNote}>Cancel anytime, no commitment</Text>
        <View style={styles.legalLinks}>
          <TouchableOpacity>
            <Text style={styles.legalText}>Terms of Service</Text>
          </TouchableOpacity>
          <Text style={styles.legalDivider}>•</Text>
          <TouchableOpacity>
            <Text style={styles.legalText}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={styles.legalDivider}>•</Text>
          <TouchableOpacity>
            <Text style={styles.legalText}>Restore</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZINGS.spacing.xl,
    paddingVertical: SIZINGS.spacing.md,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.text,
    letterSpacing: -0.4,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 24,
    color: COLORS.colors.text,
    fontFamily: Fonts.dmsans.regular,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZINGS.spacing.xl,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.3,
    textAlign: 'center',
    marginBottom: SIZINGS.spacing.xl,
  },
  benefitsSection: {
    marginBottom: SIZINGS.spacing.xxl,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZINGS.spacing.md,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkText: {
    fontSize: 14,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.white,
  },
  benefitText: {
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.text,
    letterSpacing: -0.2,
  },
  pricingSection: {
    marginBottom: SIZINGS.spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.dmsans.semibold,
    color: COLORS.colors.text,
    letterSpacing: -0.3,
    marginBottom: SIZINGS.spacing.md,
  },
  tierCard: {
    backgroundColor: COLORS.colors.surface,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.colors.border,
    padding: SIZINGS.spacing.lg,
    marginBottom: SIZINGS.spacing.md,
  },
  tierCardSelected: {
    borderColor: COLORS.colors.primary,
    borderWidth: 2,
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tierInfo: {
    flex: 1,
  },
  tierName: {
    fontSize: 18,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.text,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  tierPrice: {
    fontSize: 15,
    fontFamily: Fonts.dmsans.medium,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.colors.primary,
  },
  bestValueBadge: {
    backgroundColor: COLORS.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: SIZINGS.spacing.sm,
  },
  bestValueText: {
    fontSize: 11,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.white,
    letterSpacing: 0.5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SIZINGS.spacing.xl,
    paddingVertical: SIZINGS.spacing.lg,
    paddingBottom: 100,
    backgroundColor: COLORS.colors.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.colors.border,
  },
  subscribeButton: {
    backgroundColor: COLORS.colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: SIZINGS.spacing.sm,
  },
  subscribeButtonText: {
    fontSize: 16,
    fontFamily: Fonts.dmsans.bold,
    color: COLORS.colors.white,
    letterSpacing: -0.3,
  },
  trialNote: {
    fontSize: 13,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
    textAlign: 'center',
    marginBottom: SIZINGS.spacing.md,
  },
  legalLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legalText: {
    fontSize: 12,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    letterSpacing: -0.2,
  },
  legalDivider: {
    fontSize: 12,
    fontFamily: Fonts.dmsans.regular,
    color: COLORS.colors.textSecondary,
    marginHorizontal: 8,
  },
});

export default PricingScreen;
