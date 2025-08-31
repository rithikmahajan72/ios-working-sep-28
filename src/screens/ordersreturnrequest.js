import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';

const { height } = Dimensions.get('window');

const OrdersReturnRequest = ({ navigation, route }) => {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    // Animate modal slide up with 250ms duration, ease in (down to up)
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
      // Add easing for smooth animation
    }).start();
  }, [slideAnim]);

  const handleGoBack = () => {
    // Animate modal slide down before navigation
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('Orders');
    });
  };

  const handleRequestReturn = () => {
    // Navigate to the return accepted modal
    navigation.navigate('OrdersReturnAcceptedModal');
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="none"
      onRequestClose={handleGoBack}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Drawer Handle */}
          <View style={styles.drawerHandle} />
          
          {/* Warning Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <View style={styles.icon}>
                {/* Exclamation mark icon */}
                <View style={styles.exclamationLine} />
                <View style={styles.exclamationDot} />
              </View>
            </View>
          </View>

          {/* Content Container */}
          <View style={styles.contentContainer}>
            {/* Title */}
            <Text style={styles.title}>Requesting return!</Text>
            
            {/* Description */}
            <Text style={styles.description}>
              Please note that Rs. 200 reverse shipment charges for India and Rs.1300 for International are applicable. Charges vary for International Delivery. Please read our return and exchange policies before proceeding.
            </Text>
          </View>

          {/* Button Container */}
          <View style={styles.buttonContainer}>
            {/* Go Back Button */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleGoBack}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Go Back</Text>
            </TouchableOpacity>

            {/* Request Return Button */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleRequestReturn}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Request Return</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 20,
    minHeight: 350,
    position: 'relative',
  },
  drawerHandle: {
    width: 64,
    height: 6,
    backgroundColor: '#E6E6E6',
    borderRadius: 40,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconBackground: {
    width: 81,
    height: 81,
    borderRadius: 40.5,
    backgroundColor: 'rgba(234, 67, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#EA4335',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exclamationLine: {
    width: 4,
    height: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginBottom: 4,
  },
  exclamationDot: {
    width: 4,
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  contentContainer: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.96,
    lineHeight: 28.8,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
    color: '#767676',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    gap: 14,
  },
  primaryButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 51,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    lineHeight: 19.2,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 51,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E4E4E4',
  },
  secondaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    lineHeight: 19.2,
  },
});

export default OrdersReturnRequest;
