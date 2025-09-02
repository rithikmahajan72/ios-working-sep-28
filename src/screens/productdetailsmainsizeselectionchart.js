import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '../constants';

const { width, height } = Dimensions.get('window');

const SizeSelectionModal = ({
  visible,
  onClose,
  product,
  activeSize,
  setActiveSize,
  navigation
}) => {
  const [activeTab, setActiveTab] = useState('sizeChart'); // 'sizeChart' or 'howToMeasure'
  const translateY = useRef(new Animated.Value(height)).current;
  const [selectedSize, setSelectedSize] = useState(activeSize || 'M');

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
        useNativeDriver: true,
      }).start();
    } else {
      // Animate out
      Animated.timing(translateY, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

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
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity 
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />
        
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY }]
            }
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>SIZE SELECTION</Text>
          </View>

          {/* Tab Navigation */}
          <View style={styles.tabNavigation}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'sizeChart' && styles.activeTab]}
              onPress={() => setActiveTab('sizeChart')}
            >
              <Text style={[styles.tabText, activeTab === 'sizeChart' && styles.activeTabText]}>
                Size Chart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'howToMeasure' && styles.activeTab]}
              onPress={() => setActiveTab('howToMeasure')}
            >
              <Text style={[styles.tabText, activeTab === 'howToMeasure' && styles.activeTabText]}>
                How To Measure
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
            {activeTab === 'sizeChart' ? renderSizeChart() : renderHowToMeasure()}
          </ScrollView>

          {/* Go to Bag Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.goToBagButton} onPress={handleGoToBag}>
              <Text style={styles.goToBagText}>Go to Bag</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    maxHeight: height * 0.90,
    minHeight: height * 0.70,
    paddingBottom: 34, // Safe area bottom
  },
  header: {
    alignItems: 'center',
    marginTop: 29,
    marginBottom: 33,
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
