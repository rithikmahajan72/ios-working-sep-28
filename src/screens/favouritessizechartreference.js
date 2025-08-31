import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  PanResponder,
} from 'react-native';
import { Colors, FontFamilies } from '../constants';

const { width: screenWidth } = Dimensions.get('window');

const FavouritesSizeChartReference = ({ route, navigation }) => {
  const [activeTab, setActiveTab] = useState('sizeChart'); // 'sizeChart' or 'howToMeasure'
  const [measurementUnit, setMeasurementUnit] = useState('cm'); // 'in' or 'cm'

  // PanResponder for handling swipe down gesture on header area
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Respond to downward swipes
      return gestureState.dy > 10 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
    },
    onPanResponderMove: (evt, gestureState) => {
      // You can add visual feedback here if needed
    },
    onPanResponderRelease: (evt, gestureState) => {
      // Check if it's a swipe down gesture (positive dy, minimum distance)
      if (gestureState.dy > 50 && gestureState.vy > 0.3) {
        handleClose();
      }
    },
  });

  const sizeChartData = [
    { size: 'S', waist: '71.1', inseam: '70.1' },
    { size: 'M', waist: '71.1', inseam: '70.1' },
    { size: 'L', waist: '71.1', inseam: '70.1' },
    { size: 'XL', waist: '71.1', inseam: '70.1' },
    { size: 'XXL', waist: '71.1', inseam: '70.1' },
  ];

  const sizeChartDataInches = [
    { size: 'S', waist: '28.0', inseam: '27.6' },
    { size: 'M', waist: '28.0', inseam: '27.6' },
    { size: 'L', waist: '28.0', inseam: '27.6' },
    { size: 'XL', waist: '28.0', inseam: '27.6' },
    { size: 'XXL', waist: '28.0', inseam: '27.6' },
  ];

  const handleClose = () => {
    // Navigate back to the size selection modal
    navigation.navigate('FavouritesModalOverlayForSizeSelection', route.params);
  };

  const renderSizeChart = () => (
    <View style={styles.contentContainer}>
      {/* Unit Toggle */}
      <View style={styles.unitToggleContainer}>
        <Text style={styles.selectSizeText}>Select size in</Text>
        <View style={styles.unitToggle}>
          <TouchableOpacity
            style={[
              styles.unitButton,
              measurementUnit === 'in' && styles.unitButtonActive,
            ]}
            onPress={() => setMeasurementUnit('in')}
          >
            <Text
              style={[
                styles.unitButtonText,
                measurementUnit === 'in' && styles.unitButtonTextActive,
              ]}
            >
              in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.unitButton,
              measurementUnit === 'cm' && styles.unitButtonActive,
            ]}
            onPress={() => setMeasurementUnit('cm')}
          >
            <Text
              style={[
                styles.unitButtonText,
                measurementUnit === 'cm' && styles.unitButtonTextActive,
              ]}
            >
              cm
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Size Chart Table */}
      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Size</Text>
          <Text style={styles.tableHeaderText}>
            To fit waist({measurementUnit})
          </Text>
          <Text style={styles.tableHeaderText}>
            Inseam Length({measurementUnit})
          </Text>
        </View>

        {/* Table Rows */}
        {(measurementUnit === 'cm' ? sizeChartData : sizeChartDataInches).map(
          (item, index, array) => (
            <View 
              key={item.size} 
              style={[
                styles.tableRow,
                index === array.length - 1 && styles.lastTableRow
              ]}
            >
              <Text style={styles.tableCellText}>{item.size}</Text>
              <Text style={styles.tableCellText}>{item.waist}</Text>
              <Text style={styles.tableCellText}>{item.inseam}</Text>
            </View>
          )
        )}
      </View>
    </View>
  );

  const renderHowToMeasure = () => (
    <View style={styles.contentContainer}>
      <View style={styles.measurementImageContainer}>
        <View style={styles.measurementPlaceholder}>
          {/* Placeholder for measurement illustration */}
          <View style={styles.pantsDiagram}>
            {/* Waist measurement */}
            <View style={styles.waistMeasurement}>
              <Text style={styles.measurementLabel}>To Fit Waist</Text>
              <View style={styles.measurementLine} />
            </View>
            
            {/* Rise measurement */}
            <View style={styles.riseMeasurement}>
              <Text style={styles.measurementLabel}>Rise</Text>
            </View>
            
            {/* Thigh measurement */}
            <View style={styles.thighMeasurement}>
              <Text style={styles.measurementLabel}>Thigh</Text>
            </View>
            
            {/* Inseam measurement */}
            <View style={styles.inseamMeasurement}>
              <Text style={styles.measurementLabel}>Inseam</Text>
              <View style={styles.measurementLineVertical} />
            </View>
            
            {/* Outseam measurement */}
            <View style={styles.outseamMeasurement}>
              <Text style={styles.measurementLabel}>Outseam Length</Text>
            </View>
            
            {/* Bottom hem measurement */}
            <View style={styles.bottomHemMeasurement}>
              <Text style={styles.measurementLabel}>Bottom Hem</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayBackground} onPress={handleClose} />
        <View style={styles.modalContainer}>
          {/* Header Section with Swipe Gesture */}
          <View style={styles.headerSection} {...panResponder.panHandlers}>
            {/* Handle */}
            <View style={styles.drawerHandle} />

            {/* Header */}
            <Text style={styles.headerTitle}>SIZE SELECTION</Text>

            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === 'sizeChart' && styles.activeTab,
                ]}
                onPress={() => setActiveTab('sizeChart')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'sizeChart' && styles.activeTabText,
                  ]}
                >
                  Size Chart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === 'howToMeasure' && styles.activeTab,
                ]}
                onPress={() => setActiveTab('howToMeasure')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'howToMeasure' && styles.activeTabText,
                  ]}
                >
                  How To Measure
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Content */}
          <ScrollView 
            style={styles.scrollContainer} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContentContainer}
          >
            {activeTab === 'sizeChart' ? renderSizeChart() : renderHowToMeasure()}
          </ScrollView>
        </View>
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
    height: '85%',
    flex: 1,
  },
  headerSection: {
    backgroundColor: Colors.white,
  },
  drawerHandle: {
    width: 64,
    height: 6,
    backgroundColor: '#E6E6E6',
    borderRadius: 40,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FontFamilies.montserrat,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: -0.16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.black,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: FontFamilies.montserrat,
    color: '#767676',
    letterSpacing: -0.16,
  },
  activeTabText: {
    color: Colors.black,
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  unitToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  selectSizeText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FontFamilies.montserrat,
    color: Colors.black,
    letterSpacing: -0.14,
  },
  unitToggle: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    padding: 2,
  },
  unitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    minWidth: 40,
    alignItems: 'center',
  },
  unitButtonActive: {
    backgroundColor: Colors.black,
  },
  unitButtonText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FontFamilies.montserrat,
    color: '#767676',
    letterSpacing: -0.14,
  },
  unitButtonTextActive: {
    color: Colors.white,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.black,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FontFamilies.montserrat,
    color: Colors.white,
    textAlign: 'center',
    letterSpacing: -0.12,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  lastTableRow: {
    borderBottomWidth: 0,
  },
  tableCellText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FontFamilies.montserrat,
    color: Colors.black,
    textAlign: 'center',
    letterSpacing: -0.14,
  },
  measurementImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  measurementPlaceholder: {
    width: screenWidth - 48,
    height: 400,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pantsDiagram: {
    width: 200,
    height: 350,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waistMeasurement: {
    position: 'absolute',
    top: 20,
    alignItems: 'center',
  },
  measurementLabel: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: FontFamilies.montserrat,
    color: '#767676',
    marginBottom: 4,
  },
  measurementLine: {
    width: 80,
    height: 1,
    backgroundColor: '#767676',
  },
  measurementLineVertical: {
    width: 1,
    height: 120,
    backgroundColor: '#767676',
  },
  riseMeasurement: {
    position: 'absolute',
    top: 80,
    left: -60,
  },
  thighMeasurement: {
    position: 'absolute',
    top: 140,
    left: -60,
  },
  inseamMeasurement: {
    position: 'absolute',
    top: 100,
    right: -80,
    alignItems: 'center',
  },
  outseamMeasurement: {
    position: 'absolute',
    top: 200,
    right: -80,
  },
  bottomHemMeasurement: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
});

export default FavouritesSizeChartReference;
