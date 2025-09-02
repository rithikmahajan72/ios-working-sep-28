import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Modal,
  Easing,
  PanResponder,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const PreferenceSelector = ({ navigation, visible = true, onClose }) => {
  const [selectedPreference, setSelectedPreference] = useState('female'); // Default to female as shown in Figma
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current;

  // Animation effect when modal becomes visible
  useEffect(() => {
    if (visible) {
      // Start entrance animation (down to up)
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      // Reset animation values when not visible
      slideAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [visible, slideAnim, opacityAnim]);

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
    // Selected preference logged - removed for production
    
    // Start exit animation before navigation
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.in(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.in(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Navigate to Home screen after animation completes
      if (navigation) {
        navigation.navigate('Home');
      }
      if (onClose) {
        onClose();
      }
    });
  }, [navigation, onClose, slideAnim, opacityAnim]);

  // PanResponder for swipe to dismiss
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only respond to vertical gestures that are moving downward
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && gestureState.dy > 10;
      },
      onPanResponderGrant: () => {
        // Gesture started
        panY.setOffset(panY._value);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Only allow downward movement
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        panY.flattenOffset();
        
        const shouldDismiss = gestureState.dy > 100 || gestureState.vy > 0.5;
        
        if (shouldDismiss) {
          // Dismiss modal with animation
          Animated.parallel([
            Animated.timing(panY, {
              toValue: 300,
              duration: 200,
              easing: Easing.out(Easing.ease),
              useNativeDriver: false,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0,
              duration: 200,
              easing: Easing.out(Easing.ease),
              useNativeDriver: false,
            }),
          ]).start(() => {
            // Reset animations and close modal
            panY.setValue(0);
            slideAnim.setValue(0);
            opacityAnim.setValue(0);
            
            if (onClose) {
              onClose();
            }
            
            // Navigate back to previous screen
            if (navigation && navigation.goBack) {
              navigation.goBack();
            }
          });
        } else {
          // Snap back to original position
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: false,
            tension: 100,
            friction: 8,
          }).start();
        }
      },
    })
  ).current;

  const handleBackdropPress = useCallback(() => {
    // Dismiss modal when backdrop is pressed
    Animated.parallel([
      Animated.timing(panY, {
        toValue: 300,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Reset animations and close modal
      panY.setValue(0);
      slideAnim.setValue(0);
      opacityAnim.setValue(0);
      
      if (onClose) {
        onClose();
      }
      
      // Navigate back to previous screen
      if (navigation && navigation.goBack) {
        navigation.goBack();
      }
    });
  }, [panY, opacityAnim, slideAnim, onClose, navigation]);

  // Animation interpolations
  const translateY = Animated.add(
    slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0], // Start 300px below, end at normal position
    }),
    panY
  );

  const animatedModalStyle = {
    transform: [{ translateY }],
    opacity: opacityAnim,
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none" // We handle animation manually
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={handleBackdropPress}
      >
        <TouchableWithoutFeedback>
          <Animated.View 
            style={[styles.modalContainer, animatedModalStyle]}
            {...panResponder.panHandlers}
          >
            {/* Swipe Handle Indicator */}
            <View style={styles.swipeHandle} />
            
            {/* Header Icon */}
            <View style={styles.headerIconContainer}>
              <View style={styles.headerIcon}>
                {/* Computer/Monitor Icon */}
                <View style={styles.computerIcon}>
                  <View style={styles.screen} />
                  <View style={styles.stand} />
                  <View style={styles.base} />
                </View>
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
          {preferences.map((preference) => {
            const isSelected = selectedPreference === preference.id;
            return (
              <TouchableOpacity
                key={preference.id}
                style={[
                  styles.preferenceOption,
                  isSelected && styles.preferenceOptionSelected,
                ]}
                onPress={() => handlePreferenceSelect(preference.id)}
              >
                <Text style={[
                  styles.preferenceIcon,
                  isSelected && styles.preferenceIconSelected,
                ]}>
                  {preference.icon}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Let's YORAA Button */}
        <TouchableOpacity 
          style={styles.letsYoraaButton} 
          onPress={handleLetsYoraa}
        >
          <Text style={styles.letsYoraaButtonText}>
            Let's YORAA
          </Text>
        </TouchableOpacity>
          </Animated.View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'flex-end', // Position at bottom for slide up effect
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    width: screenWidth,
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: screenWidth * 1.6,
    maxHeight: screenWidth * 1.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
  swipeHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D0D0D0',
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 20,
    alignSelf: 'center',
  },
  headerIconContainer: {
    marginBottom: 32,
    position: 'relative',
    alignItems: 'center',
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  computerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    width: 28,
    height: 20,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginBottom: 2,
    position: 'relative',
  },
  stand: {
    width: 12,
    height: 3,
    backgroundColor: '#000000',
    borderRadius: 1,
    marginBottom: 1,
  },
  base: {
    width: 18,
    height: 2,
    backgroundColor: '#000000',
    borderRadius: 1,
  },
  headerIconText: {
    fontSize: 24,
  },
  checkmarkOverlay: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#999999',
    textAlign: 'center',
    marginBottom: 64,
    paddingHorizontal: 40,
    lineHeight: 22,
  },
  preferencesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 80,
    paddingHorizontal: 20,
  },
  preferenceOption: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preferenceOptionSelected: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F8F8F8',
    borderColor: '#D0D0D0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  preferenceIcon: {
    fontSize: 28,
    color: '#CCCCCC',
    fontWeight: '300',
  },
  preferenceIconSelected: {
    fontSize: 36,
    color: '#000000',
    fontWeight: '400',
  },
  letsYoraaButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    width: screenWidth - 80,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  letsYoraaButtonDisabled: {
    backgroundColor: '#E8E8E8',
    shadowOpacity: 0,
    elevation: 0,
  },
  letsYoraaButtonText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  letsYoraaButtonTextDisabled: {
    color: '#AAAAAA',
  },
});

export default React.memo(PreferenceSelector);
