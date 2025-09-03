import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';
import { Colors, FontFamilies } from '../constants';

const FavouritesModalOverlayForSizeSelection = ({ route, navigation }) => {
  const { product } = route.params || {};
  const [selectedSize, setSelectedSize] = useState('4');
  const [selectedSizeType, setSizeType] = useState('L (W 10-13 / M 8-12)');
  
  // Animation values for gesture handling
  const translateY = useRef(new Animated.Value(0)).current;
  const screenHeight = Dimensions.get('window').height;
  
  // Pan responder for swipe down gesture
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only respond to vertical swipes starting from the top 100px of the modal
        const { dy, y0 } = gestureState;
        const modalTop = screenHeight * 0.4; // Approximate modal top position
        return Math.abs(dy) > 10 && dy > 0 && y0 < modalTop + 100;
      },
      onPanResponderGrant: () => {
        translateY.setOffset(translateY._value);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Only allow downward movement
        if (gestureState.dy >= 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        translateY.flattenOffset();
        
        // If dragged down more than 100px or with sufficient velocity, close modal
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          closeModalWithAnimation();
        } else {
          // Snap back to original position
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start();
        }
      },
    })
  ).current;

  // Size options for the first row (shoe sizes)
  const sizeOptions = [
    { id: 'remove', label: 'Remove', disabled: true },
    { id: '1', label: '1', disabled: true },
    { id: '2', label: '2', disabled: true },
    { id: '3', label: '3', disabled: true },
    { id: '4', label: '4', selected: true },
    { id: '5', label: '5', disabled: true },
    { id: '6', label: '6', disabled: true },
    { id: '7', label: '7', disabled: true },
  ];

  // Size type options for the second row
  const sizeTypeOptions = [
    { id: 'size1', label: 'L (W 6-10 / M 6-8)', disabled: false },
    { id: 'size2', label: 'L (W 10-13 / M 8-12)', selected: true },
    { id: 'size3', label: 'XL (M 12-15 / M 6-8)', disabled: true },
  ];

  const handleSizeSelect = (sizeId) => {
    if (sizeOptions.find(option => option.id === sizeId && !option.disabled)) {
      setSelectedSize(sizeId);
    }
  };

  const handleSizeTypeSelect = (sizeTypeId) => {
    const option = sizeTypeOptions.find(opt => opt.id === sizeTypeId);
    if (option && !option.disabled) {
      setSizeType(option.label);
    }
  };

  const handleAddToBag = () => {
    // Handle add to bag functionality
    navigation.navigate('FavouritesAddedToBagConfirmationModal', { 
      product, 
      selectedSize, 
      selectedSizeType 
    });
  };

  const handleSizeChart = () => {
    // Navigate to size chart modal
    navigation.navigate('FavouritesSizeChartReference', { product });
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const closeModalWithAnimation = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack();
    });
  };

  // Handle backdrop press
  const handleBackdropPress = () => {
    closeModalWithAnimation();
  };

  const renderSizeOption = (option) => {
    const isSelected = option.selected || option.id === selectedSize;
    const isDisabled = option.disabled;
    
    return (
      <TouchableOpacity
        key={option.id}
        style={[
          styles.sizeOption,
          isSelected && styles.sizeOptionSelected,
          isDisabled && styles.sizeOptionDisabled,
        ]}
        onPress={() => handleSizeSelect(option.id)}
        disabled={isDisabled}
      >
        <Text style={[
          styles.sizeOptionText,
          isSelected && styles.sizeOptionTextSelected,
          isDisabled && styles.sizeOptionTextDisabled,
        ]}>
          {option.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSizeTypeOption = (option) => {
    const isSelected = option.selected;
    const isDisabled = option.disabled;
    
    return (
      <TouchableOpacity
        key={option.id}
        style={[
          styles.sizeTypeOption,
          isSelected && styles.sizeTypeOptionSelected,
          isDisabled && styles.sizeTypeOptionDisabled,
        ]}
        onPress={() => handleSizeTypeSelect(option.id)}
        disabled={isDisabled}
      >
        <Text style={[
          styles.sizeTypeOptionText,
          isSelected && styles.sizeTypeOptionTextSelected,
          isDisabled && styles.sizeTypeOptionTextDisabled,
        ]}>
          {option.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.overlayBackground} 
          onPress={handleBackdropPress}
          activeOpacity={1}
        />
        
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          {/* Drawer Handle - Enhanced for drag gesture */}
          <TouchableOpacity 
            style={styles.drawerHandleContainer}
            activeOpacity={0.8}
          >
            <View style={styles.drawerHandle} />
          </TouchableOpacity>
          
          {/* Product Section */}
          <View style={styles.productSection}>
            <View style={styles.productImageContainer}>
              <View style={styles.productImagePlaceholder} />
            </View>
            
            <View style={styles.productInfo}>
              <Text style={styles.productName}>
                {product?.name || 'Air Jordan 1 Mid'}
              </Text>
              <Text style={styles.productCategory}>Shoes</Text>
              <Text style={styles.productPrice}>
                {product?.price || 'US$125'}
              </Text>
            </View>
          </View>

          {/* Size Section */}
          <Text style={styles.sizeTitle}>Size</Text>

          {/* Size Options Row 1 */}
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.sizeOptionsScrollView}
            contentContainerStyle={styles.sizeOptionsContainer}
          >
            {sizeOptions.map(renderSizeOption)}
          </ScrollView>

          {/* Size Type Options Row 2 */}
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.sizeTypeOptionsScrollView}
            contentContainerStyle={styles.sizeTypeOptionsContainer}
          >
            {sizeTypeOptions.map(renderSizeTypeOption)}
          </ScrollView>

          {/* Size Chart Link */}
          <TouchableOpacity 
            style={styles.sizeChartContainer}
            onPress={handleSizeChart}
          >
            <Text style={styles.sizeChartText}>Size Chart</Text>
          </TouchableOpacity>

          {/* Add to Bag Button */}
          <TouchableOpacity 
            style={styles.addToBagButton}
            onPress={handleAddToBag}
          >
            <Text style={styles.addToBagButtonText}>Add to Bag</Text>
          </TouchableOpacity>
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
  overlayBackground: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 34,
    minHeight: 552,
  },
  drawerHandleContainer: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerHandle: {
    width: 64,
    height: 6,
    backgroundColor: '#E6E6E6',
    borderRadius: 40,
  },
  productSection: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
    gap: 16,
  },
  productImageContainer: {
    width: 154,
    height: 154,
  },
  productImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FontFamilies.montserrat,
    color: Colors.black,
    lineHeight: 16.8,
    letterSpacing: -0.14,
    marginBottom: 3,
  },
  productCategory: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FontFamilies.montserrat,
    color: '#767676',
    lineHeight: 16.8,
    letterSpacing: -0.14,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FontFamilies.montserrat,
    color: Colors.black,
    lineHeight: 16.8,
    letterSpacing: -0.14,
    marginTop: 'auto',
  },
  sizeTitle: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: FontFamilies.montserrat,
    color: Colors.black,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 24,
    lineHeight: 24,
  },
  sizeOptionsScrollView: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sizeOptionsContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 8,
  },
  sizeOption: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 16,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeOptionSelected: {
    borderColor: Colors.black,
    backgroundColor: Colors.white,
  },
  sizeOptionDisabled: {
    backgroundColor: '#F6F6F6',
    borderColor: '#E4E4E4',
  },
  sizeOptionText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: FontFamilies.montserrat,
    color: Colors.black,
    letterSpacing: -0.4,
  },
  sizeOptionTextSelected: {
    color: Colors.black,
  },
  sizeOptionTextDisabled: {
    color: '#BABABA',
  },
  sizeTypeOptionsScrollView: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sizeTypeOptionsContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 8,
  },
  sizeTypeOption: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 16,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeTypeOptionSelected: {
    borderColor: Colors.black,
    backgroundColor: Colors.white,
  },
  sizeTypeOptionDisabled: {
    backgroundColor: '#F6F6F6',
    borderColor: '#E4E4E4',
  },
  sizeTypeOptionText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: FontFamilies.montserrat,
    color: Colors.black,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  sizeTypeOptionTextSelected: {
    color: Colors.black,
  },
  sizeTypeOptionTextDisabled: {
    color: '#BABABA',
  },
  sizeChartContainer: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  sizeChartText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FontFamilies.montserrat,
    color: Colors.black,
    textDecorationLine: 'underline',
    lineHeight: 16.8,
  },
  addToBagButton: {
    backgroundColor: Colors.black,
    borderRadius: 100,
    marginHorizontal: 22,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60.283,
  },
  addToBagButtonText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FontFamilies.montserrat,
    color: Colors.white,
    lineHeight: 19.2,
  },
});

export default FavouritesModalOverlayForSizeSelection;
