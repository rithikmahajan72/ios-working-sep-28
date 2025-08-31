import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const PreferenceSelector = ({ navigation }) => {
  const [selectedPreference, setSelectedPreference] = useState(null);

  // Memoize static preferences data
  const preferences = useMemo(() => [
    { id: 'male', icon: '♂', label: 'Male' },
    { id: 'female', icon: '♀', label: 'Female' },
    { id: 'unisex', icon: '⚥', label: 'Unisex' },
  ], []);

  // Memoize callback functions to prevent re-renders
  const handlePreferenceSelect = useCallback((preferenceId) => {
    setSelectedPreference(preferenceId);
  }, []);

  const handleLetsYoraa = useCallback(() => {
    if (selectedPreference) {
      // Selected preference logged - removed for production
      
      // Navigate to Home screen after preference selection
      if (navigation) {
        navigation.navigate('Home');
      }
    }
  }, [selectedPreference, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalContainer}>
        
        {/* Header Icon */}
        <View style={styles.headerIconContainer}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>📱</Text>
            <View style={styles.checkmarkOverlay}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Pick your preference!</Text>
        
        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Select your personalised shopping experience
        </Text>

        {/* Preference Options */}
        <View style={styles.preferencesContainer}>
          {preferences.map((preference) => (
            <TouchableOpacity
              key={preference.id}
              style={[
                styles.preferenceOption,
                selectedPreference === preference.id && styles.preferenceOptionSelected,
              ]}
              onPress={() => handlePreferenceSelect(preference.id)}
            >
              <Text style={[
                styles.preferenceIcon,
                selectedPreference === preference.id && styles.preferenceIconSelected,
              ]}>
                {preference.icon}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Let's YORAA Button */}
        <TouchableOpacity 
          style={[
            styles.letsYoraaButton,
            !selectedPreference && styles.letsYoraaButtonDisabled
          ]} 
          onPress={handleLetsYoraa}
          disabled={!selectedPreference}
        >
          <Text style={[
            styles.letsYoraaButtonText,
            !selectedPreference && styles.letsYoraaButtonTextDisabled
          ]}>
            Let's YORAA
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    width: screenWidth * 0.9,
    paddingVertical: 50,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 5,
  },
  headerIconContainer: {
    marginBottom: 30,
    position: 'relative',
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerIconText: {
    fontSize: 24,
  },
  checkmarkOverlay: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#999999',
    textAlign: 'center',
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  preferencesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    marginBottom: 60,
  },
  preferenceOption: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preferenceOptionSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  preferenceIcon: {
    fontSize: 32,
    color: '#CCCCCC',
  },
  preferenceIconSelected: {
    color: '#000000',
  },
  letsYoraaButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    width: 280,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  letsYoraaButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  letsYoraaButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  letsYoraaButtonTextDisabled: {
    color: '#999999',
  },
});

export default React.memo(PreferenceSelector);
