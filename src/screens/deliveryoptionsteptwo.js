import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { Colors } from '../constants/colors';
import AddAddressModal from './deliveryoptionsstepthreeaddaddress';

const { height: screenHeight } = Dimensions.get('window');

const DeliveryOptionsStepTwoModal = ({ visible, onClose, selectedDeliveryOption, navigation }) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight));
  const [selectedAddress, setSelectedAddress] = useState('john-smith');
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);


  useEffect(() => {
    if (visible) {
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
  }, [visible, slideAnim]);

  const handleClose = () => {
    // Animate out first, then call onClose
    Animated.timing(slideAnim, {
      toValue: screenHeight,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const handleContinue = () => {
    // Handle continue action based on selected delivery option
    
    // Close current modal first
    Animated.timing(slideAnim, {
      toValue: screenHeight,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onClose();
      
      // Navigate based on delivery option selection
      if (selectedDeliveryOption === 'free') {
        // Navigate to order confirmation screen for free delivery
        if (navigation) {
          navigation.navigate('OrderConfirmationPhone');
        }
      } else if (selectedDeliveryOption === 'international') {
        // Navigate to custom clearance screen for international delivery
        if (navigation) {
          navigation.navigate('DeliveryOptionsStepFourIfCustomRequired');
        }
      }
    });
  };

  const handleAddAddress = () => {
    // Handle add address action
    setShowAddAddressModal(true);
  };

  const handleEditAddress = () => {
    // Handle edit address action
    setShowAddAddressModal(true);
  };

  if (!visible) {
    return null; // Don't render anything if not visible
  }

  return (
    <View style={styles.fullScreenOverlay}>
      <View style={styles.backdrop} />
      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <SafeAreaView style={styles.modalContent}>
          <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Delivery</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>−</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Delivery Options */}
            <View style={styles.section}>
              {/* Free Delivery */}
              <View style={styles.optionRow}>
                <View style={styles.checkboxContainer}>
                  <View style={[styles.checkbox, selectedDeliveryOption === 'free' && styles.checkboxChecked]}>
                    {selectedDeliveryOption === 'free' && <Text style={styles.checkMark}>✓</Text>}
                  </View>
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>Free Delivery</Text>
                  <Text style={styles.optionSubtitle}>Arrives Wed, 11 May to Fri, 13 May</Text>
                </View>
              </View>

              {/* International Delivery */}
              <View style={styles.optionRow}>
                <View style={styles.checkboxContainer}>
                  <View style={[styles.checkbox, selectedDeliveryOption === 'international' && styles.checkboxChecked]}>
                    {selectedDeliveryOption === 'international' && <Text style={styles.checkMark}>✓</Text>}
                  </View>
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>International Delivery</Text>
                  <Text style={styles.optionSubtitle}>Arrives Wed, 18 May to Fri, 13 May</Text>
                  <Text style={styles.optionPrice}>$50 + Delivery Charges</Text>
                </View>
              </View>
            </View>

            {/* Delivery Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery Details</Text>

              {/* Address Option */}
              <TouchableOpacity
                style={styles.addressRow}
                onPress={() => setSelectedAddress('john-smith')}
              >
                <View style={styles.checkboxContainer}>
                  <View style={[styles.checkbox, selectedAddress === 'john-smith' && styles.checkboxChecked]}>
                    {selectedAddress === 'john-smith' && <Text style={styles.checkMark}>✓</Text>}
                  </View>
                </View>
                <View style={styles.addressTextContainer}>
                  <Text style={styles.addressName}>John Smith, 652-858-0392</Text>
                  <Text style={styles.addressDetails}>2950 S 108th St, West Allis, United States</Text>
                </View>
                <TouchableOpacity onPress={handleEditAddress}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.addAddressButton} onPress={handleAddAddress}>
                <Text style={styles.addAddressButtonText}>Add Address</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
      
      {/* Add Address Modal */}
      <AddAddressModal
        visible={showAddAddressModal}
        onClose={() => setShowAddAddressModal(false)}
      />
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
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: screenHeight * 0.9,
    minHeight: screenHeight * 0.5,
  },
  modalContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    flex: 1,
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
  section: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    fontWeight: '400',
    color: Colors.black,
    marginBottom: 8,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  addressTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.black,
    marginBottom: 8,
  },
  addressDetails: {
    fontSize: 16,
    color: Colors.gray600,
  },
  editText: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '400',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 14,
  },
  continueButton: {
    backgroundColor: Colors.black,
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
  },
  addAddressButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addAddressButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
});

export default DeliveryOptionsStepTwoModal;
