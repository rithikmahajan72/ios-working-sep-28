import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Animated,
  Dimensions,
  ScrollView,
  PanResponder,
} from 'react-native';

const { height } = Dimensions.get('window');

const SizeSelectionModal = ({
  visible,
  onClose,
  product,
  activeSize,
  setActiveSize,
  navigation
}) => {
  const [activeTab, setActiveTab] = useState('sizeChart'); // 'sizeChart' or 'howToMeasure'
  const [selectedSize, setSelectedSize] = useState(activeSize || 'M');
  
  // Single animated value for transform to avoid native driver conflicts
  const translateY = useRef(new Animated.Value(height)).current;
  
  // Gesture handling state
  const [isDragging, setIsDragging] = useState(false);
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  
  // Gesture state tracking
  const gestureTracker = useRef({
    isActive: false,
    startY: 0,
    currentY: 0,
    velocity: 0,
    lastTimestamp: 0,
  }).current;

  // Sheet dimensions and constraints
  const DISMISS_THRESHOLD = 150;

  // Size data - matching Figma exactly (same values for both cm and in)
  const sizeData = [
    { size: 'S', waist_cm: '71.1', inseam_cm: '70.1', waist_in: '71.1', inseam_in: '70.1' },
    { size: 'M', waist_cm: '71.1', inseam_cm: '70.1', waist_in: '71.1', inseam_in: '70.1' },
    { size: 'L', waist_cm: '71.1', inseam_cm: '70.1', waist_in: '71.1', inseam_in: '70.1' },
    { size: 'XL', waist_cm: '71.1', inseam_cm: '70.1', waist_in: '71.1', inseam_in: '70.1' },
    { size: 'XXL', waist_cm: '71.1', inseam_cm: '70.1', waist_in: '71.1', inseam_in: '70.1' },
  ];

  // Measurement unit toggle
  const [unit, setUnit] = useState('cm'); // 'in' or 'cm'

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
      
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: height,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [visible, translateY, backdropOpacity]);

  const handleClose = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: height,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsDragging(false);
      onClose();
    });
  }, [translateY, backdropOpacity, onClose]);

  // Handle backdrop press
  const handleBackdropPress = useCallback(() => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else {
      handleClose();
    }
  }, [navigation, handleClose]);

  // Simple touch handlers as fallback
  const handleTouchStart = useCallback((evt) => {
    const startY = evt.nativeEvent.pageY;
    gestureTracker.startY = startY;
    gestureTracker.isActive = true;
    console.log('Touch started at:', startY);
  }, [gestureTracker]);

  const handleTouchMove = useCallback((evt) => {
    if (!gestureTracker.isActive) return;
    
    const currentY = evt.nativeEvent.pageY;
    const deltaY = currentY - gestureTracker.startY;
    
    console.log('Touch move, delta:', deltaY);
    
    if (deltaY > 5) { // Only for downward movement
      setIsDragging(true);
      translateY.setValue(deltaY);
      
      // Update backdrop opacity
      const dragProgress = Math.max(0, Math.min(1, deltaY / DISMISS_THRESHOLD));
      const newBackdropOpacity = 1 - (dragProgress * 0.5);
      backdropOpacity.setValue(newBackdropOpacity);
    }
  }, [gestureTracker, translateY, backdropOpacity, DISMISS_THRESHOLD]);

  const handleTouchEnd = useCallback((evt) => {
    if (!gestureTracker.isActive) return;
    
    const currentY = evt.nativeEvent.pageY;
    const deltaY = currentY - gestureTracker.startY;
    
    console.log('Touch ended, delta:', deltaY);
    
    gestureTracker.isActive = false;
    
    if (deltaY > DISMISS_THRESHOLD) {
      // Close the modal
      handleClose();
    } else {
      // Snap back
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: false,
        tension: 100,
        friction: 8,
      }).start(() => {
        setIsDragging(false);
      });
    }
  }, [gestureTracker, DISMISS_THRESHOLD, handleClose, translateY]);

  // Simple PanResponder for gesture control
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dy } = gestureState;
        return Math.abs(dy) > 2;
      },
      
      onPanResponderGrant: () => {
        console.log('Pan gesture started');
        setIsDragging(true);
      },
      
      onPanResponderMove: (evt, gestureState) => {
        const { dy } = gestureState;
        console.log('Pan gesture move, dy:', dy);
        
        if (dy > 0) {
          translateY.setValue(dy);
          
          // Update backdrop opacity
          const dragProgress = Math.max(0, Math.min(1, dy / DISMISS_THRESHOLD));
          const newBackdropOpacity = 1 - (dragProgress * 0.5);
          backdropOpacity.setValue(newBackdropOpacity);
        }
      },
      
      onPanResponderRelease: (evt, gestureState) => {
        const { dy } = gestureState;
        console.log('Pan gesture ended, dy:', dy);
        
        if (dy > DISMISS_THRESHOLD) {
          handleClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: false,
            tension: 100,
            friction: 8,
          }).start(() => {
            setIsDragging(false);
          });
        }
      },
    })
  ).current;

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setActiveSize(size);
  };

  const handleGoToBag = () => {
    // Navigate to bag/cart screen
    handleClose();
    // Navigate to the Bag screen
    if (navigation && navigation.navigate) {
      navigation.navigate('Bag', { previousScreen: 'ProductViewOne' });
    } else {
    }
  };

  const renderSizeChart = () => (
    <View style={styles.tabContent}>
      {/* Size selection header with unit toggle */}
      <View style={styles.sizeSelectionHeader}>
        <Text style={styles.sizeInstructions}>Select size in</Text>
        
        {/* Unit Toggle */}
        <View style={styles.unitToggleContainer}>
          <TouchableOpacity
            style={[styles.unitButton, unit === 'in' && styles.unitButtonInactive]}
            onPress={() => setUnit('in')}
          >
            <Text style={[styles.unitText, unit === 'in' && styles.unitTextInactive]}>in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitButton, unit === 'cm' && styles.unitButtonActive]}
            onPress={() => setUnit('cm')}
          >
            <Text style={[styles.unitText, unit === 'cm' && styles.unitTextActive]}>cm</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Size Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.tableHeaderSize]}>Size</Text>
        <Text style={[styles.tableHeaderText, styles.tableHeaderWaist]}>To fit waist({unit})</Text>
        <Text style={[styles.tableHeaderText, styles.tableHeaderInseam]}>Inseam Lemngth({unit})</Text>
        
        {/* Size table container background */}
        <View style={styles.sizeTableContainer} />
      </View>

      {/* Size Table Rows */}
      {sizeData.map((item, index) => {
        const waistValue = unit === 'cm' ? item.waist_cm : item.waist_in;
        const inseamValue = unit === 'cm' ? item.inseam_cm : item.inseam_in;
        
        return (
          <TouchableOpacity
            key={item.size}
            style={[styles.tableRow, index === sizeData.length - 1 && styles.lastTableRow]}
            onPress={() => handleSizeSelect(item.size)}
          >
            <View style={[
              styles.radioButton,
              selectedSize === item.size && styles.radioButtonSelected
            ]}>
              {selectedSize === item.size && <View style={styles.radioButtonInner} />}
            </View>
            <Text style={styles.sizeText}>{item.size}</Text>
            <Text style={styles.measurementText}>{waistValue}</Text>
            <Text style={styles.measurementTextRight}>{inseamValue}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderHowToMeasure = () => (
    <View style={styles.tabContent}>
      <View style={styles.measurementImageContainer}>
        {/* Measurement diagram based on Figma design */}
        <View style={styles.measurementDiagram}>
          {/* Pants outline */}
          <View style={styles.pantsContainer}>
            {/* Waistband */}
            <View style={styles.waistband} />
            
            {/* Pants body */}
            <View style={styles.pantsBody}>
              <View style={styles.leftLeg}>
                <View style={styles.legOutline} />
              </View>
              <View style={styles.rightLeg}>
                <View style={styles.legOutline} />
              </View>
            </View>
          </View>
          
          {/* Measurement lines and labels */}
          <View style={styles.measurementAnnotations}>
            {/* To Fit Waist line */}
            <View style={[styles.measurementLine, styles.waistLine]}>
              <View style={styles.horizontalLine} />
              <Text style={[styles.measurementLabel, styles.waistLabel]}>To Fit Waist</Text>
            </View>
            
            {/* Rise measurement */}
            <View style={[styles.measurementLine, styles.riseLine]}>
              <View style={styles.verticalLine} />
              <Text style={[styles.measurementLabel, styles.riseLabel]}>Rise</Text>
            </View>
            
            {/* Thigh measurement */}
            <View style={[styles.measurementLine, styles.thighLine]}>
              <View style={styles.horizontalLine} />
              <Text style={[styles.measurementLabel, styles.thighLabel]}>Thigh</Text>
            </View>
            
            {/* Inseam Length */}
            <View style={[styles.measurementLine, styles.inseamLine]}>
              <View style={styles.verticalLine} />
              <Text style={[styles.measurementLabel, styles.inseamLabel]}>Inseam Length</Text>
            </View>
            
            {/* Outseam Length */}
            <View style={[styles.measurementLine, styles.outseamLine]}>
              <View style={styles.verticalLine} />
              <Text style={[styles.measurementLabel, styles.outseamLabel]}>Outseam Length</Text>
            </View>
            
            {/* Bottom Hem */}
            <View style={[styles.measurementLine, styles.bottomHemLine]}>
              <View style={styles.horizontalLine} />
              <Text style={[styles.measurementLabel, styles.bottomHemLabel]}>Bottom Hem</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        {/* Animated backdrop */}
        <Animated.View style={[styles.backdrop, {
          opacity: backdropOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
          }),
        }]} />
        
        {/* Backdrop touchable */}
        <TouchableOpacity 
          style={styles.backdropTouchable}
          activeOpacity={1}
          onPress={handleBackdropPress}
        />
        
        {/* Bottom sheet with gesture handling */}
        <TouchableWithoutFeedback>
          <Animated.View 
            style={[
              styles.modalContainer,
              {
                transform: [{ translateY }]
              }
            ]}
            {...panResponder.panHandlers}
          >
            {/* Draggable area for gesture detection */}
            <View 
              style={styles.dragArea}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Drag handle */}
              <View style={styles.dragHandle} />
            </View>
            
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>SIZE SELECTION</Text>
            </View>

            {/* Tab Navigation */}
            <View style={styles.tabNavigation}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'sizeChart' && styles.activeTab]}
                onPress={() => setActiveTab('sizeChart')}
                disabled={isDragging}
              >
                <Text style={[styles.tabText, activeTab === 'sizeChart' && styles.activeTabText]}>
                  Size Chart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'howToMeasure' && styles.activeTab]}
                onPress={() => setActiveTab('howToMeasure')}
                disabled={isDragging}
              >
                <Text style={[styles.tabText, activeTab === 'howToMeasure' && styles.activeTabText]}>
                  How To Measure
                </Text>
              </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView 
              style={styles.contentContainer} 
              showsVerticalScrollIndicator={false}
              scrollEnabled={!isDragging}
            >
              {activeTab === 'sizeChart' ? renderSizeChart() : renderHowToMeasure()}
            </ScrollView>

            {/* Go to Bag Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.goToBagButton, isDragging && styles.buttonDisabled]} 
                onPress={handleGoToBag}
                disabled={isDragging}
              >
                <Text style={styles.goToBagText}>Go to Bag</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
  backdropTouchable: {
    flex: 1,
  },
  dragHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 2.5,
    alignSelf: 'center',
  },
  dragArea: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 30,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    maxHeight: height * 0.90,
    minHeight: height * 0.70,
    paddingBottom: 34, // Safe area bottom
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  header: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 51,
    width: '100%',
  },
  tab: {
    flex: 1,
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },
  activeTabText: {
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
  },
  sizeSelectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    height: 45,
    paddingHorizontal: 26,
    marginBottom: 0,
  },
  sizeInstructions: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
  },
  unitToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#EDEDED',
    borderRadius: 50,
    height: 30,
    width: 80,
    position: 'relative',
    padding: 0,
  },
  unitButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 50,
    zIndex: 2,
  },
  unitButtonActive: {
    backgroundColor: '#000000',
    position: 'absolute',
    right: 0,
    width: 46,
  },
  unitButtonInactive: {
    backgroundColor: 'transparent',
  },
  unitText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
  },
  unitTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
  unitTextInactive: {
    color: '#000000',
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  tableHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
  },
  tableHeaderSize: {
    position: 'absolute',
    left: 36,
    top: 14,
  },
  tableHeaderWaist: {
    position: 'absolute',
    left: 85,
    top: 14,
  },
  tableHeaderInseam: {
    position: 'absolute',
    left: 210,
    top: 14,
  },
  sizeTableContainer: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    height: 47,
    left: 0,
    top: 44,
    width: 392,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 45,
    paddingLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  lastTableRow: {
    borderBottomWidth: 0,
  },
  radioButton: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    borderWidth: 1,
    borderColor: '#000000',
    marginRight: 34,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  radioButtonSelected: {
    borderColor: '#000000',
  },
  radioButtonInner: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#000000',
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    position: 'absolute',
    left: 46,
  },
  measurementText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    position: 'absolute',
    left: 125,
  },
  measurementTextRight: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    position: 'absolute',
    left: 283.5,
    textAlign: 'center',
  },
  measurementImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    minHeight: 500,
  },
  measurementDiagram: {
    width: 300,
    height: 420,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pantsContainer: {
    width: 160,
    height: 300,
    alignItems: 'center',
    position: 'relative',
  },
  waistband: {
    width: 140,
    height: 4,
    backgroundColor: '#333333',
    marginBottom: 2,
    borderRadius: 2,
  },
  pantsBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 140,
    height: 295,
  },
  leftLeg: {
    width: 68,
    height: '100%',
  },
  rightLeg: {
    width: 68,
    height: '100%',
  },
  legOutline: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: '#333333',
    borderTopWidth: 0,
    borderRadius: 2,
  },
  measurementAnnotations: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  measurementLine: {
    position: 'absolute',
  },
  horizontalLine: {
    height: 2,
    backgroundColor: '#DAA520',
  },
  verticalLine: {
    width: 2,
    backgroundColor: '#DAA520',
  },
  waistLine: {
    top: 35,
    left: 80,
    right: 80,
  },
  waistLabel: {
    top: -25,
    left: -40,
  },
  riseLine: {
    top: 40,
    left: 50,
    height: 70,
  },
  riseLabel: {
    top: 30,
    left: -35,
  },
  thighLine: {
    top: 130,
    left: 80,
    right: 80,
  },
  thighLabel: {
    top: -25,
    left: -25,
  },
  inseamLine: {
    top: 150,
    left: 200,
    height: 150,
  },
  inseamLabel: {
    top: 70,
    left: 15,
  },
  outseamLine: {
    top: 40,
    right: 50,
    height: 260,
  },
  outseamLabel: {
    top: 120,
    left: 15,
  },
  bottomHemLine: {
    bottom: 60,
    left: 80,
    right: 80,
  },
  bottomHemLabel: {
    top: 15,
    left: -40,
  },
  measurementLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
    position: 'absolute',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    textAlign: 'center',
    minWidth: 60,
    fontFamily: 'Montserrat-Medium',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  goToBagButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  goToBagText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
  },
});

export default SizeSelectionModal;
