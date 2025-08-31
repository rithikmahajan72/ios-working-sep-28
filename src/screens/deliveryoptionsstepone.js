import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { Colors } from '../constants/colors';
import DeliveryOptionsStepTwoModal from './deliveryoptionsteptwo';

const DeliveryOptionsStepOneScreen = ({ navigation }) => {
  const [postcode, setPostcode] = useState('');
  const [selectedOption, setSelectedOption] = useState('free'); // 'free' or 'international'
  const [showModal, setShowModal] = useState(false);

  // Component state logging removed for production

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleUpdatePress = () => {
    // Handle update postcode and refresh delivery options
    // Update button logging removed for production
    if (postcode.trim()) {
      // Update delivery options logging removed for production
      // Setting modal logging removed for production
      // Show the modal with animation
      setShowModal(true);
    } else {
      Alert.alert('Error', 'Please enter a valid postcode');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Postcode Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Postcode"
            placeholderTextColor={Colors.gray600}
            value={postcode}
            onChangeText={setPostcode}
          />
        </View>

        {/* Delivery Options */}
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsTitle}>Delivery Options</Text>

          {/* Free Delivery */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setSelectedOption('free')}
          >
            <View style={styles.checkboxContainer}>
              <View style={[styles.checkbox, selectedOption === 'free' && styles.checkboxChecked]}>
                {selectedOption === 'free' && <Text style={styles.checkMark}>✓</Text>}
              </View>
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Free Delivery</Text>
              <Text style={styles.optionSubtitle}>Arrives Wed, 11 May to Fri, 13 May</Text>
            </View>
          </TouchableOpacity>

          {/* International Delivery */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setSelectedOption('international')}
          >
            <View style={styles.checkboxContainer}>
              <View style={[styles.checkbox, selectedOption === 'international' && styles.checkboxChecked]}>
                {selectedOption === 'international' && <Text style={styles.checkMark}>✓</Text>}
              </View>
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>International Delivery</Text>
              <Text style={styles.optionSubtitle}>Arrives Wed, 18 May to Fri, 13 May</Text>
              <Text style={styles.optionPrice}>$50 + Delivery Charges</Text>
            </View>
          </TouchableOpacity>

          {/* Disclaimer */}
          <Text style={styles.disclaimer}>
            All dates and prices are subject to change. Actual delivery options will be calculated at checkout.
          </Text>

          {/* Update Button */}
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdatePress}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Delivery Options Step Two Modal */}
      <DeliveryOptionsStepTwoModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        selectedDeliveryOption={selectedOption}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: Colors.black,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    textAlign: 'center',
    flex: 1,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  inputContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray600,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 15,
    fontSize: 16,
    color: Colors.black,
  },
  optionsContainer: {
    flex: 1,
  },
  optionsTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  checkboxContainer: {
    marginRight: 22,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.black,
  },
  checkMark: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 16,
    color: Colors.gray600,
    marginBottom: 2,
  },
  optionPrice: {
    fontSize: 16,
    color: Colors.gray600,
  },
  disclaimer: {
    fontSize: 12,
    color: Colors.gray600,
    marginTop: 16,
    marginBottom: 24,
    lineHeight: 16,
  },
  updateButton: {
    backgroundColor: Colors.black,
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
  },
});

export default DeliveryOptionsStepOneScreen;
