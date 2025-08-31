import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';

const TermsAndConditions = ({ navigation }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleRead = async () => {
    // Handle read terms and conditions - open external link
    const url = 'https://yoraa.co';
    
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open the link');
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Error opening URL:', error);
      }
      Alert.alert('Error', 'Unable to open the link');
    }
  };

  const handleYes = () => {
    if (isAccepted) {
      // Handle acceptance and proceed to preference selector
      
      // Navigate to Preference Selector modal after accepting terms
      if (navigation) {
        navigation.navigate('PreferenceSelector');
      }
    }
  };

  const toggleAcceptance = () => {
    setIsAccepted(!isAccepted);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        
        {/* Main Content Area - Takes up most of the screen */}
        <View style={styles.mainContent}>
          {/* This area is intentionally empty to match the Figma design */}
        </View>

        {/* Bottom Section with Terms and Buttons */}
        <View style={styles.bottomSection}>
          
          {/* Checkbox and Terms Text */}
          <View style={styles.termsContainer}>
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={toggleAcceptance}
            >
              <View style={[
                styles.checkbox,
                isAccepted && styles.checkboxChecked
              ]}>
                {isAccepted && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            
            <Text style={styles.termsText}>
              I have read and accepted the privacy polices and understand the purchase condition.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={styles.readButton}
              onPress={handleRead}
            >
              <Text style={styles.readButtonText}>Read</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.yesButton,
                !isAccepted && styles.yesButtonDisabled
              ]}
              onPress={handleYes}
              disabled={!isAccepted}
            >
              <Text style={[
                styles.yesButtonText,
                !isAccepted && styles.yesButtonTextDisabled
              ]}>
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
    // Empty space as per Figma design
  },
  bottomSection: {
    paddingBottom: 40,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 38,
    marginBottom: 40,
  },
  checkboxContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#BCBCBC',
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FFFFFF',
    borderColor: '#111111',
  },
  checkmark: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: 12,
    color: '#111111',
    fontWeight: 'bold',
  },
  termsText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    lineHeight: 24,
    letterSpacing: -0.384,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 38,
    gap: 20,
  },
  readButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    width: 150,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 51,
    paddingVertical: 16,
  },
  readButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  yesButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#000000',
    width: 150,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 51,
    paddingVertical: 16,
  },
  yesButtonDisabled: {
    borderColor: '#CCCCCC',
  },
  yesButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  yesButtonTextDisabled: {
    color: '#CCCCCC',
  },
});

export default TermsAndConditions;
