import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  PanResponder,
  Animated,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const BagSizeSelectorModalOverlay = ({ 
  visible, 
  onClose, 
  item, 
  onSizeChange,
  onSizeChartPress 
}) => {
  // Available sizes - you can make this dynamic based on the item
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  // Current selected size, defaulting to item's size or 'M'
  const [selectedSize, setSelectedSize] = useState(item?.size || 'M');
  
  // State for showing size chart
  const [showSizeChart, setShowSizeChart] = useState(false);

  // Animation for swipe down
  const translateY = new Animated.Value(0);

  // Pan responder for swipe down gesture
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Only respond to downward swipes from the top part of the modal
      return gestureState.dy > 0 && Math.abs(gestureState.dx) < Math.abs(gestureState.dy);
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 100) {
        // If swiped down more than 100 pixels, close the modal
        Animated.timing(translateY, {
          toValue: 300,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          translateY.setValue(0);
          onClose();
        });
      } else {
        // Snap back to original position
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleDone = () => {
    if (item && onSizeChange) {
      onSizeChange(item.id, selectedSize);
    }
    onClose();
  };

  const handleSizeChart = () => {
    // Handle size chart navigation or modal
    Alert.alert('Test', `Size Chart button pressed! onSizeChartPress is: ${typeof onSizeChartPress}`);
    
    // Show size chart within this modal
    setShowSizeChart(true);
    
    if (onSizeChartPress) {
      Alert.alert('Test', 'Calling onSizeChartPress function...');
      onSizeChartPress();
    } else {
      Alert.alert('Error', 'onSizeChartPress is not defined!');
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.modalContainer,
            { transform: [{ translateY }] }
          ]}
          {...panResponder.panHandlers}
        >
          {/* Drag Handle */}
          <View style={styles.dragHandle} />
          
          {!showSizeChart ? (
            <>
              {/* Size Options */}
              <View style={styles.sizeGrid}>
                {availableSizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeOption,
                      selectedSize === size && styles.selectedSizeOption
                    ]}
                    onPress={() => handleSizeSelect(size)}
                  >
                    <Text style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText
                    ]}>
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Size Chart Link */}
              <TouchableOpacity 
                style={styles.sizeChartContainer}
                onPress={handleSizeChart}
              >
                <Text style={styles.sizeChartText}>Size Chart</Text>
              </TouchableOpacity>

              {/* Done Button */}
              <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Size Chart Content */}
              <Text style={styles.headerTitle}>SIZE CHART</Text>
              <View style={styles.sizeChartContent}>
                <Text style={styles.sizeChartText}>Size chart content goes here...</Text>
                <TouchableOpacity 
                  style={styles.doneButton} 
                  onPress={() => setShowSizeChart(false)}
                >
                  <Text style={styles.doneButtonText}>Back to Size Selection</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    minHeight: 320,
  },
  dragHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 32,
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 40,
    justifyContent: 'center',
  },
  sizeOption: {
    width: (screenWidth - 48 - 32) / 3, // 3 columns with gaps
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedSizeOption: {
    backgroundColor: '#2F2F2F',
    borderColor: '#2F2F2F',
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.4,
  },
  selectedSizeText: {
    color: '#FFFFFF',
  },
  sizeChartContainer: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  sizeChartText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    textDecorationLine: 'underline',
    letterSpacing: -0.4,
  },
  doneButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 51,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 19.2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  sizeChartContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default BagSizeSelectorModalOverlay;
