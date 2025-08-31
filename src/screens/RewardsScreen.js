import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '../constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Sample user data
const USER_POINTS = {
  current: 100,
  used: 0,
  level: 'bronze', // bronze, silver, gold, platinum, black
};

const LEVELS = [
  { name: 'bronze', points: 100, color: '#CD7F32' },
  { name: 'silver', points: 200, color: '#C0C0C0' },
  { name: 'gold', points: 300, color: '#FFD700' },
  { name: 'platinum', points: 400, color: '#DA70D6' },
  { name: 'black', points: 500, color: '#000000' },
];

const LANGUAGES = [
  { code: 'en', name: 'English (United Kingdom)', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी (India)', flag: '🇮🇳' },
  { code: 'es', name: 'Español (España)', flag: '🇪🇸' },
];

const REGIONS = [
  { code: 'UK', name: 'United Kingdom (GBP £)', flag: '🇬🇧' },
  { code: 'IN', name: 'India (USD $)', flag: '🇮🇳' },
  { code: 'US', name: 'United States (USD $)', flag: '🇺🇸' },
];

const SHOPPING_PREFERENCES = ['Women', 'Men'];
const ADDITIONAL_PREFERENCES = ['Boy', 'Women', 'Mens', 'Girls'];

const RewardsScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('giveaways'); // Default to giveaways as per requirement
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState('IN');
  const [selectedShoppingPreference, setSelectedShoppingPreference] = useState('Women');

  // Handle navigation back from other screens with specific sub-tab
  useEffect(() => {
    if (route?.params?.activeSubTab) {
      setActiveTab(route.params.activeSubTab);
    }
  }, [route?.params?.activeSubTab]);
  const [selectedAdditionalPreferences, setSelectedAdditionalPreferences] = useState(['Boy']);
  const scrollY = useRef(new Animated.Value(0)).current;

  const renderTabButtons = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'rewards' && styles.activeTab]}
        onPress={() => setActiveTab('rewards')}
      >
        <Text style={[styles.tabText, activeTab === 'rewards' && styles.activeTabText]}>
          Rewards
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'giveaways' && styles.activeTab]}
        onPress={() => setActiveTab('giveaways')}
      >
        <Text style={[styles.tabText, activeTab === 'giveaways' && styles.activeTabText]}>
          Giveaways
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderRewardsTab = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Black promotional section */}
      <View style={styles.promoSection}>
        <Text style={styles.promoWant}>WANT</Text>
        <Text style={styles.promoDiscount}>10% OFF</Text>
        <Text style={styles.promoSubtext}>YOUR NEXT PURCHASE?</Text>
        <Text style={styles.promoBonus}>PLUS REWARD GIVEAWAY AND MORE!</Text>
        
        <Text style={styles.promoQuestion}>What are you waiting for?</Text>
        <Text style={styles.promoCTA}>Become arewards member today!</Text>
      </View>

      {/* Progress indicator */}
      <View style={styles.progressSection}>
        <View style={styles.levelIndicator}>
          {LEVELS.map((level, index) => (
            <React.Fragment key={level.name}>
              <View style={styles.levelPoint}>
                <View style={[
                  styles.levelDot,
                  { backgroundColor: level.color },
                  USER_POINTS.current >= level.points && styles.levelDotActive
                ]}>
                  <Text style={[
                    styles.levelPoints,
                    { color: level.name === 'silver' || level.name === 'gold' || level.name === 'platinum' ? '#000000' : '#FFFFFF' }
                  ]}>
                    {level.points}
                  </Text>
                </View>
              </View>
              {index < LEVELS.length - 1 && <View style={styles.levelLine} />}
            </React.Fragment>
          ))}
        </View>
        
        <Text style={styles.journeyText}>
          The journey to becoming ✨ XCLUSIVE
        </Text>
        
        <View style={styles.pointsSection}>
          <TouchableOpacity onPress={() => navigation.navigate('PointsHistory', { previousScreen: 'Rewards', activeSubTab: activeTab })}>
            <Text style={styles.currentPointsLabel}>Current Points</Text>
          </TouchableOpacity>
          <View style={styles.pointsRow}>
            <Text style={styles.currentPoints}>{USER_POINTS.current}</Text>
            <View style={styles.pointsUsedSection}>
              <Text style={styles.pointsUsed}>{USER_POINTS.used}</Text>
              <Text style={styles.pointsUsedLabel}>Points Used</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderGiveawaysTab = () => (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
    >
      {/* Dynamic yellow section */}
      <Animated.View style={[styles.yellowSection, {
        transform: [{
          translateY: scrollY.interpolate({
            inputRange: [0, 200],
            outputRange: [0, -50],
            extrapolate: 'clamp',
          })
        }]
      }]}>
        <Text style={styles.expiresText}>Expires in 8 days</Text>
        <Text style={styles.giveawayTitle}>YORAA Concert Giveaways</Text>
        
        <TouchableOpacity 
          style={styles.membersExclusiveButton}
          onPress={() => navigation.navigate('MembersExclusive', { previousScreen: 'Rewards' })}
        >
          <Text style={styles.membersExclusiveText}>MEMBERS EXCLUSIVE</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Static content below */}
      <View style={styles.staticContent}>
        <Text style={styles.expiresTextStatic}>Expires in 8 days</Text>
        <Text style={styles.giveawayTitleStatic}>YORAA Concert Giveaways</Text>

        {/* Sign in and Create Account buttons */}
        <View style={styles.authButtons}>
          <TouchableOpacity 
            style={styles.signInButton}
            onPress={() => navigation && navigation.navigate('LoginAccountMobileNumber')}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.createAccountButton}
            onPress={() => navigation && navigation.navigate('CreateAccountMobileNumber')}
          >
            <Text style={styles.createAccountButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        {/* Language and Region */}
        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>Language and region</Text>
          
          <TouchableOpacity 
            style={styles.preferenceItem}
            onPress={() => navigation.navigate('Language', { previousScreen: 'Rewards' })}
          >
            <View style={styles.preferenceLeft}>
              <Text style={styles.flagIcon}>🌐</Text>
              <View>
                <Text style={styles.preferenceMain}>English (United kingdom)</Text>
                <Text style={styles.preferenceLabel}>Language</Text>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.preferenceItem}
            onPress={() => navigation.navigate('Region', { previousScreen: 'Rewards' })}
          >
            <View style={styles.preferenceLeft}>
              <Text style={styles.flagIcon}>🇮🇳</Text>
              <View>
                <Text style={styles.preferenceMain}>India (USD $)</Text>
                <Text style={styles.preferenceLabel}>Region</Text>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          
          <Text style={styles.shippingNote}>
            You are currently shipping to India and your order will be billed in USD $
          </Text>
        </View>

        {/* Shopping Preferences */}
        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>My shopping preferences</Text>
          
          {SHOPPING_PREFERENCES.map((pref) => (
            <TouchableOpacity
              key={pref}
              style={styles.radioItem}
              onPress={() => setSelectedShoppingPreference(pref)}
            >
              <Text style={styles.radioLabel}>{pref}</Text>
              <View style={styles.radioButton}>
                {selectedShoppingPreference === pref && <View style={styles.radioButtonSelected} />}
              </View>
            </TouchableOpacity>
          ))}
          
          <Text style={styles.preferenceNote}>
            Tailor your app experience with the items most suited to you
          </Text>
        </View>

        {/* Additional Preferences */}
        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>Additional preferences</Text>
          
          {ADDITIONAL_PREFERENCES.map((pref) => (
            <TouchableOpacity
              key={pref}
              style={styles.checkboxItem}
              onPress={() => {
                if (selectedAdditionalPreferences.includes(pref)) {
                  setSelectedAdditionalPreferences(prev => prev.filter(p => p !== pref));
                } else {
                  setSelectedAdditionalPreferences(prev => [...prev, pref]);
                }
              }}
            >
              <Text style={styles.checkboxLabel}>{pref}</Text>
              <View style={styles.checkbox}>
                {selectedAdditionalPreferences.includes(pref) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderTabButtons()}
      {activeTab === 'rewards' ? renderRewardsTab() : renderGiveawaysTab()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Tab Styles
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '600',
  },

  // Rewards Tab Styles
  promoSection: {
    backgroundColor: '#000000',
    padding: 40,
    alignItems: 'center',
    minHeight: 400,
    justifyContent: 'center',
  },
  promoWant: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
  promoDiscount: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 50,
  },
  promoSubtext: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  promoBonus: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 40,
  },
  promoQuestion: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
  },
  promoCTA: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  progressSection: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  levelIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  levelPoint: {
    alignItems: 'center',
  },
  levelDot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelDotActive: {
    // Active state styling if needed
  },
  levelPoints: {
    fontSize: 14,
    fontWeight: '600',
  },
  levelLine: {
    width: 30,
    height: 2,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  journeyText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: '400',
  },
  pointsSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  currentPointsLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 50,
    width: '100%',
  },
  currentPoints: {
    fontSize: 48,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 48,
  },
  pointsUsedSection: {
    alignItems: 'center',
  },
  pointsUsed: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF6B6B',
    lineHeight: 32,
  },
  pointsUsedLabel: {
    fontSize: 14,
    color: '#FF6B6B',
    marginTop: 5,
    fontWeight: '400',
  },

  // Giveaways Tab Styles
  yellowSection: {
    backgroundColor: '#FFEB3B',
    padding: 20,
    minHeight: 300,
    justifyContent: 'center',
  },
  expiresText: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 10,
  },
  giveawayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 40,
  },
  membersExclusiveButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  membersExclusiveText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },

  staticContent: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    flex: 1,
  },
  expiresTextStatic: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 10,
  },
  giveawayTitleStatic: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },

  // Auth Buttons
  authButtons: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  signInButton: {
    flex: 1,
    backgroundColor: '#000000',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  createAccountButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000000',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },

  // Preferences Sections
  preferencesSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 15,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  flagIcon: {
    fontSize: 20,
  },
  preferenceMain: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  preferenceLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: '#666666',
  },
  shippingNote: {
    fontSize: 12,
    color: '#666666',
    marginTop: 10,
    lineHeight: 16,
  },

  // Radio buttons
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  radioLabel: {
    fontSize: 16,
    color: '#000000',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000000',
  },
  preferenceNote: {
    fontSize: 12,
    color: '#666666',
    marginTop: 10,
    lineHeight: 16,
  },

  // Checkboxes
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#000000',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default RewardsScreen;
