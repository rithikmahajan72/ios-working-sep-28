import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions,
  TextInput,
  PanResponder,
} from 'react-native';
import { Colors } from '../constants/colors';

const { height: screenHeight } = Dimensions.get('window');

// Indian states data
const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttarakhand', 
  'Uttar Pradesh', 'West Bengal'
];

// Country codes data
const countryCodes = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
];

const AddAddressModal = ({ visible, onClose }) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight));
  const panY = useRef(new Animated.Value(0)).current;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Delhi',
    pin: '',
    country: '',
    phone: '+91',
  });
  const [sameAsDelivery, setSameAsDelivery] = useState(true);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // Pan responder for swipe down gesture
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy > 0 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderGrant: () => {
        panY.setOffset(panY._value);
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        panY.flattenOffset();
        
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          // Close modal if dragged down enough or with enough velocity
          handleClose();
        } else {
          // Snap back to original position
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start();
        }
      },
    })
  ).current;

  // AddAddressModal visibility changed - logging removed for production

  useEffect(() => {
    // AddAddressModal useEffect triggered - logging removed for production
    if (visible) {
      // Reset pan animation
      panY.setValue(0);
      // Slide up animation with 250ms duration and ease-in timing
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide down animation when closing
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim, panY]);

  const handleClose = () => {
    // Reset pan animation
    panY.setValue(0);
    // Animate out first, then call onClose
    Animated.timing(slideAnim, {
      toValue: screenHeight,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const handleDone = () => {
    // Handle form submission
    // Form data logged - removed for production
    handleClose();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!visible) {
    return null; // Don't render anything if not visible
  }

  return (
    <View style={styles.fullScreenOverlay}>
      <TouchableOpacity 
        style={styles.backdrop} 
        activeOpacity={1}
        onPress={handleClose}
      />
      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [
              { translateY: slideAnim },
              { translateY: panY }
            ],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <SafeAreaView style={styles.modalContent}>
          <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

          {/* Drag Handle */}
          <View style={styles.dragHandle}>
            <View style={styles.dragIndicator} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add Address</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>−</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.content} 
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Payment Card Section */}
            <View style={styles.paymentSection}>
              <View style={styles.cardContainer}>
                <View style={styles.cardIcon}>
                  <Text style={styles.cardIconText}>💳</Text>
                </View>
                <Text style={styles.cardNumber}>136541818383</Text>
                <Text style={styles.cardDate}>11/24</Text>
                <Text style={styles.cardCvv}>520</Text>
                <TouchableOpacity style={styles.cameraButton}>
                  <Text style={styles.cameraIcon}>📷</Text>
                </TouchableOpacity>
              </View>

              {/* Billing Address Checkbox */}
              <View style={styles.billingSection}>
                <Text style={styles.billingTitle}>Billing Address</Text>
                <TouchableOpacity 
                  style={styles.checkboxRow}
                  onPress={() => setSameAsDelivery(!sameAsDelivery)}
                >
                  <View style={[styles.checkbox, sameAsDelivery && styles.checkboxChecked]}>
                    {sameAsDelivery && <Text style={styles.checkMark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>Same as Delivery Address</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Form Container */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  value={formData.firstName}
                  onChangeText={(value) => handleInputChange('firstName', value)}
                  placeholderTextColor={Colors.gray600}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChangeText={(value) => handleInputChange('lastName', value)}
                  placeholderTextColor={Colors.gray600}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  value={formData.address}
                  onChangeText={(value) => handleInputChange('address', value)}
                  placeholderTextColor={Colors.gray600}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Apartment,suit"
                  value={formData.apartment}
                  onChangeText={(value) => handleInputChange('apartment', value)}
                  placeholderTextColor={Colors.gray600}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="City"
                  value={formData.city}
                  onChangeText={(value) => handleInputChange('city', value)}
                  placeholderTextColor={Colors.gray600}
                />
              </View>

              <View style={styles.inputContainer}>
                <TouchableOpacity 
                  style={styles.stateContainer}
                  onPress={() => setShowStateDropdown(!showStateDropdown)}
                >
                  <Text style={styles.stateLabel}>State</Text>
                  <Text style={styles.stateValue}>{formData.state}</Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="PIN"
                  value={formData.pin}
                  onChangeText={(value) => handleInputChange('pin', value)}
                  placeholderTextColor={Colors.gray600}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Country"
                  value={formData.country}
                  onChangeText={(value) => handleInputChange('country', value)}
                  placeholderTextColor={Colors.gray600}
                />
              </View>

              <View style={styles.inputContainer}>
                <TouchableOpacity 
                  style={styles.phoneContainer}
                  onPress={() => setShowCountryDropdown(!showCountryDropdown)}
                >
                  <Text style={styles.phoneLabel}>Phone</Text>
                  <View style={styles.phoneRow}>
                    <Text style={styles.countryFlag}>🇮🇳</Text>
                    <Text style={styles.phonePrefix}>{formData.phone}</Text>
                    <Text style={styles.dropdownIcon}>▼</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Done Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>

      {/* State Dropdown Overlay */}
      {showStateDropdown && (
        <View style={styles.dropdownOverlay}>
          <TouchableOpacity 
            style={styles.dropdownBackdrop} 
            onPress={() => setShowStateDropdown(false)}
          />
          <View style={styles.dropdownContainer}>
            <ScrollView style={styles.dropdownScrollView} showsVerticalScrollIndicator={false}>
              {indianStates.map((state, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    formData.state === state && styles.dropdownItemSelected
                  ]}
                  onPress={() => {
                    handleInputChange('state', state);
                    setShowStateDropdown(false);
                  }}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    formData.state === state && styles.dropdownItemTextSelected
                  ]}>
                    {state}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      {/* Country Code Dropdown Overlay */}
      {showCountryDropdown && (
        <View style={styles.dropdownOverlay}>
          <TouchableOpacity 
            style={styles.dropdownBackdrop} 
            onPress={() => setShowCountryDropdown(false)}
          />
          <View style={styles.dropdownContainer}>
            <ScrollView style={styles.dropdownScrollView} showsVerticalScrollIndicator={false}>
              {countryCodes.map((country, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    formData.phone === country.code && styles.dropdownItemSelected
                  ]}
                  onPress={() => {
                    handleInputChange('phone', country.code);
                    setShowCountryDropdown(false);
                  }}
                >
                  <View style={styles.countryDropdownItem}>
                    <Text style={styles.countryFlag}>{country.flag}</Text>
                    <Text style={[
                      styles.dropdownItemText,
                      formData.phone === country.code && styles.dropdownItemTextSelected
                    ]}>
                      {country.code} {country.country}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: screenHeight * 0.85,
    minHeight: screenHeight * 0.75,
  },
  modalContent: {
    flex: 1,
  },
  dragHandle: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: Colors.gray200,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    flex: 1,
    letterSpacing: -0.4,
  },
  closeButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  paymentSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 18,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e4e4e4',
    borderRadius: 3,
    gap: 14,
  },
  cardIcon: {
    width: 44,
    height: 29,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIconText: {
    fontSize: 12,
  },
  cardNumber: {
    flex: 1,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.14,
    lineHeight: 16.8,
  },
  cardDate: {
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.14,
    lineHeight: 16.8,
  },
  cardCvv: {
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.14,
    lineHeight: 16.8,
  },
  cameraButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 16,
  },
  billingSection: {
    gap: 8,
  },
  billingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    letterSpacing: -0.4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
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
  checkboxLabel: {
    fontSize: 16,
    color: Colors.black,
    flex: 1,
    letterSpacing: -0.384,
    lineHeight: 24,
  },
  formContainer: {
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  input: {
    fontSize: 14,
    color: Colors.black,
    padding: 0,
    margin: 0,
    letterSpacing: -0.35,
    lineHeight: 16,
  },
  stateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stateLabel: {
    fontSize: 12,
    color: Colors.black,
    position: 'absolute',
    top: -12,
    letterSpacing: -0.14,
  },
  stateValue: {
    fontSize: 14,
    color: Colors.black,
    flex: 1,
    letterSpacing: -0.14,
  },
  dropdownIcon: {
    fontSize: 12,
    color: Colors.black,
  },
  phoneContainer: {
    flexDirection: 'column',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  phoneLabel: {
    fontSize: 12,
    color: Colors.black,
    marginBottom: 4,
    letterSpacing: -0.14,
  },
  phonePrefix: {
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.14,
    flex: 1,
  },
  countryFlag: {
    fontSize: 16,
  },
  dropdownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20000,
  },
  dropdownBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdownContainer: {
    position: 'absolute',
    top: '30%',
    left: 20,
    right: 20,
    maxHeight: '40%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownScrollView: {
    maxHeight: 300,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  dropdownItemSelected: {
    backgroundColor: Colors.gray100,
  },
  dropdownItemText: {
    fontSize: 16,
    color: Colors.black,
    letterSpacing: -0.14,
  },
  dropdownItemTextSelected: {
    fontWeight: '500',
  },
  countryDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 30,
  },
  doneButton: {
    backgroundColor: Colors.black,
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
    letterSpacing: -0.4,
    lineHeight: 19.2,
  },
});

export default AddAddressModal;
