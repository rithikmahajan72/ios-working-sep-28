import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import BottomNavigationBar from './bottomnavigationbar';
import { Colors, FontSizes, FontWeights, Spacing } from '../constants';

// Simple test components
const SimpleHome = () => (
  <View style={styles.testScreen}>
    <Text style={styles.testText}>Home Screen</Text>
  </View>
);

const SimpleShop = () => (
  <View style={styles.testScreen}>
    <Text style={styles.testText}>Shop Screen</Text>
  </View>
);

const SimpleCollection = () => (
  <View style={styles.testScreen}>
    <Text style={styles.testText}>Collection Screen</Text>
  </View>
);

const SimpleRewards = () => (
  <View style={styles.testScreen}>
    <Text style={styles.testText}>Rewards Screen</Text>
  </View>
);

const SimpleProfile = () => (
  <View style={styles.testScreen}>
    <Text style={styles.testText}>Profile Screen</Text>
  </View>
);

// Minimal Layout Component for Testing
const TestLayout = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const renderContent = () => {
    try {
      switch (activeTab) {
        case 'Home':
          return <SimpleHome />;
        case 'Shop':
          return <SimpleShop />;
        case 'Collection':
          return <SimpleCollection />;
        case 'Rewards':
          return <SimpleRewards />;
        case 'Profile':
          return <SimpleProfile />;
        default:
          return <SimpleHome />;
      }
    } catch (error) {
      console.error('Error rendering content:', error);
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load content</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        <View style={styles.mainContent}>
          {renderContent()}
        </View>
      </SafeAreaView>

      <BottomNavigationBar 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  mainContent: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  testScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  testText: {
    fontSize: FontSizes.xl,
    color: Colors.textPrimary,
    fontWeight: FontWeights.bold,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: Spacing.xl,
  },
  errorText: {
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
});

export default TestLayout;
