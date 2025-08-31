import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';

const OrdersReturnAcceptedModal = ({ navigation, route }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate modal fade in with 250ms duration, ease out (dissolve)
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
      // Ease out animation
    }).start();
  }, [fadeAnim]);

  const handleDone = () => {
    // Animate modal fade out before navigation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      // Navigate to orders.js
      navigation.navigate('Orders');
    });
  };

  const handleBackdropPress = () => {
    // Allow closing modal by tapping backdrop
    handleDone();
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="none"
      onRequestClose={handleDone}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={handleBackdropPress}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={(e) => e.stopPropagation()}
        >
          <Animated.View 
            style={[
              styles.modalContainer,
              {
                opacity: fadeAnim,
                transform: [{
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  })
                }]
              }
            ]}
          >
            {/* Success Icon */}
            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <View style={styles.icon}>
                  {/* Checkmark icon */}
                  <View style={styles.checkmark}>
                    <View style={styles.checkmarkStem} />
                    <View style={styles.checkmarkKick} />
                  </View>
                </View>
              </View>
            </View>

            {/* Content Container */}
            <View style={styles.contentContainer}>
              {/* Title */}
              <Text style={styles.title}>Return has been accepted !</Text>
              
              {/* Description */}
              <Text style={styles.description}>
                We appreciated your feedback.{'\n'}
                We'll use your feedback to improve{'\n'}
                your experience.
              </Text>
            </View>

            {/* Done Button */}
            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleDone}
              activeOpacity={0.8}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13.47,
    width: 327,
    minHeight: 320,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconBackground: {
    width: 81,
    height: 81,
    borderRadius: 40.5,
    backgroundColor: 'rgba(80, 138, 123, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#508A7B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 24,
    height: 18,
    position: 'relative',
  },
  checkmarkStem: {
    position: 'absolute',
    width: 3,
    height: 9,
    backgroundColor: '#FFFFFF',
    borderRadius: 1.5,
    right: 6,
    bottom: 6,
    transform: [{ rotate: '45deg' }],
  },
  checkmarkKick: {
    position: 'absolute',
    width: 3,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 1.5,
    right: 13,
    bottom: 8,
    transform: [{ rotate: '-45deg' }],
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 40,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
    color: '#43484B',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22.5,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
    color: '#6E768A',
    textAlign: 'center',
    lineHeight: 20,
  },
  doneButton: {
    backgroundColor: '#000000',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 51,
    alignItems: 'center',
    justifyContent: 'center',
    width: 234,
    height: 48,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    lineHeight: 22.5,
  },
});

export default OrdersReturnAcceptedModal;
