import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const FILTER_OPTIONS = {
  sizes: ['42', '43', '44', '45'],
  colors: [
    { name: 'BEIGE', color: '#D6CBB7' },
    { name: 'BLACK', color: '#251F1F' },
    { name: 'BEIGE', color: '#759BC1' },
    { name: 'BEIGE', color: '#805D42' },
    { name: 'BEIGE', color: '#6E051E' },
    { name: 'BEIGE', color: '#EEB712' },
    { name: 'BEIGE', color: '#8AA88D' },
  ],
  sortBy: ['ASCENDING PRICE', 'DESCENDING PRICE', 'NEW'],
  sizes2: ['S', 'M', 'L', 'XL', '36', '38', '40'],
  categories: ['MAN', 'WOMEN', 'KIDS'],
  kidsSizes: ['BOY', 'GIRL'],
};

const FiltersScreen = ({ navigation, route }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSort, setSelectedSort] = useState('ASCENDING PRICE');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes2, setSelectedSizes2] = useState([]);
  const [selectedKidsSizes, setSelectedKidsSizes] = useState([]);

  // Animation for slide up
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const panY = useRef(new Animated.Value(0)).current;

  // Pan responder for drag to close
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only respond to vertical movements that are significant
        return Math.abs(gestureState.dy) > 20 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderGrant: () => {
        panY.setOffset(panY._value);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Only allow downward movement (positive dy)
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        panY.flattenOffset();
        
        // If dragged down more than 100px or velocity is high, close the modal
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          handleGoBack();
        } else {
          // Snap back to original position
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    // Reset pan animation
    panY.setValue(0);
    
    // Animate slide up on mount
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [slideAnim, panY]);

  const handleGoBack = () => {
    // Reset pan animation
    panY.setValue(0);
    
    // Animate slide down before navigation
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      if (navigation && navigation.goBack) {
        navigation.goBack();
      }
    });
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedSort('ASCENDING PRICE');
    setSelectedCategories([]);
    setSelectedSizes2([]);
    setSelectedKidsSizes([]);
  };

  const renderColorOption = (colorOption, index) => (
    <TouchableOpacity 
      key={index} 
      style={styles.colorRow}
      onPress={() => {
        if (selectedColors.includes(colorOption.name)) {
          setSelectedColors(selectedColors.filter(c => c !== colorOption.name));
        } else {
          setSelectedColors([...selectedColors, colorOption.name]);
        }
      }}
    >
      <View style={[styles.colorCircle, { backgroundColor: colorOption.color }]} />
      <Text style={[
        styles.colorName,
        selectedColors.includes(colorOption.name) && styles.selectedColorName
      ]}>{colorOption.name}</Text>
    </TouchableOpacity>
  );

  const renderSizeOption = (size, isSelected, onToggle) => (
    <TouchableOpacity
      key={size}
      style={[
        styles.sizeOption,
        isSelected && styles.selectedSizeOption
      ]}
      onPress={onToggle}
    >
      <Text style={[
        styles.sizeText,
        isSelected && styles.selectedSizeText
      ]}>{size}</Text>
    </TouchableOpacity>
  );

  const renderSortOption = (option) => (
    <TouchableOpacity
      key={option}
      style={styles.sortRow}
      onPress={() => setSelectedSort(option)}
    >
      <Text style={[
        styles.sortText,
        selectedSort === option && styles.selectedSortText
      ]}>{option}</Text>
    </TouchableOpacity>
  );

  const renderCategoryOption = (category) => (
    <TouchableOpacity
      key={category}
      style={styles.categoryRow}
      onPress={() => {
        if (selectedCategories.includes(category)) {
          setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
          setSelectedCategories([...selectedCategories, category]);
        }
      }}
    >
      <Text style={[
        styles.categoryText,
        selectedCategories.includes(category) && styles.selectedCategoryText
      ]}>{category}</Text>
    </TouchableOpacity>
  );

  const renderKidsSizeOption = (size) => (
    <TouchableOpacity
      key={size}
      style={styles.kidsSizeOption}
      onPress={() => {
        if (selectedKidsSizes.includes(size)) {
          setSelectedKidsSizes(selectedKidsSizes.filter(s => s !== size));
        } else {
          setSelectedKidsSizes([...selectedKidsSizes, size]);
        }
      }}
    >
      <Text style={[
        styles.kidsSizeText,
        selectedKidsSizes.includes(size) && styles.selectedKidsSizeText
      ]}>{size}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#DFDFDF" />
        
        {/* Background overlay */}
        <TouchableOpacity 
          style={styles.backgroundOverlay} 
          activeOpacity={1}
          onPress={handleGoBack}
        >
          {/* Top gray area */}
          <View style={styles.topGrayArea} />
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.filterContainer,
            { 
              transform: [
                { translateY: slideAnim },
                { translateY: panY }
              ] 
            }
          ]}
        >
          <View {...panResponder.panHandlers} style={styles.draggableArea}>
            {/* Filter Header */}
            <View style={styles.filterHeader}>
              {/* Drag Handle */}
              <View style={styles.dragHandle} />
              <TouchableOpacity onPress={clearFilters}>
                <Text style={styles.clearFiltersText}>CLEAR FILTERS</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.filterContent} showsVerticalScrollIndicator={false}>
            {/* Initial Sizes */}
            <View style={styles.filterSection}>
              <View style={styles.sizeGrid}>
                {FILTER_OPTIONS.sizes.map(size => 
                  renderSizeOption(
                    size, 
                    selectedSizes.includes(size),
                    () => {
                      if (selectedSizes.includes(size)) {
                        setSelectedSizes(selectedSizes.filter(s => s !== size));
                      } else {
                        setSelectedSizes([...selectedSizes, size]);
                      }
                    }
                  )
                )}
              </View>
              <TouchableOpacity style={styles.viewMoreButton}>
                <Text style={styles.viewMoreText}>VIEW MORE</Text>
              </TouchableOpacity>
            </View>

            {/* Price Range */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>PRICE</Text>
              <View style={styles.priceSlider}>
                <View style={styles.sliderTrack} />
                <View style={styles.sliderThumb} />
                <View style={[styles.sliderThumb, styles.sliderThumbEnd]} />
              </View>
              <Text style={styles.priceRangeText}>₹ 450 - ₹ 29,950,200</Text>
            </View>

            {/* Colors */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>COLOUR</Text>
              {FILTER_OPTIONS.colors.map(renderColorOption)}
            </View>

            {/* Sort By */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>SHORT BY</Text>
              {FILTER_OPTIONS.sortBy.map(renderSortOption)}
            </View>

            {/* More Sizes */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>SIZE</Text>
              <View style={styles.sizeGrid}>
                {FILTER_OPTIONS.sizes2.map(size => 
                  renderSizeOption(
                    size, 
                    selectedSizes2.includes(size),
                    () => {
                      if (selectedSizes2.includes(size)) {
                        setSelectedSizes2(selectedSizes2.filter(s => s !== size));
                      } else {
                        setSelectedSizes2([...selectedSizes2, size]);
                      }
                    }
                  )
                )}
              </View>
              <TouchableOpacity style={styles.viewMoreButton}>
                <Text style={styles.viewMoreText}>VIEW MORE</Text>
              </TouchableOpacity>
            </View>

            {/* Categories */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>SHORT BY</Text>
              {FILTER_OPTIONS.categories.map(renderCategoryOption)}
              <View style={styles.kidsSection}>
                {FILTER_OPTIONS.kidsSizes.map(renderKidsSizeOption)}
              </View>
            </View>
          </ScrollView>

          {/* View Results Button */}
          <TouchableOpacity style={styles.viewResultsButton} onPress={handleGoBack}>
            <Text style={styles.viewResultsText}>VIEW RESULTS</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFDFDF',
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topGrayArea: {
    height: 211,
    backgroundColor: '#DFDFDF',
  },
  filterContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingTop: 20,
  },
  draggableArea: {
    paddingBottom: 10,
  },
  filterHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#CCCCCC',
    borderRadius: 2,
    marginBottom: 15,
  },
  clearFiltersText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  filterContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterSection: {
    marginBottom: 30,
  },
  filterTitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    textTransform: 'uppercase',
    marginBottom: 15,
    letterSpacing: 1,
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sizeOption: {
    minWidth: 40,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  selectedSizeOption: {
    backgroundColor: '#000000',
  },
  sizeText: {
    fontFamily: 'Montserrat-Light',
    fontSize: 12,
    color: '#000000',
    textTransform: 'uppercase',
  },
  selectedSizeText: {
    color: '#FFFFFF',
  },
  viewMoreButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  viewMoreText: {
    fontFamily: 'Montserrat-Light',
    fontSize: 12,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  priceSlider: {
    height: 20,
    justifyContent: 'center',
    marginBottom: 10,
  },
  sliderTrack: {
    height: 1,
    backgroundColor: '#000000',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  sliderThumb: {
    width: 8,
    height: 8,
    backgroundColor: '#000000',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
  },
  sliderThumbEnd: {
    right: 0,
    left: 'auto',
  },
  priceRangeText: {
    fontFamily: 'Montserrat-Light',
    fontSize: 12,
    color: '#000000',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorCircle: {
    width: 12,
    height: 11,
    marginRight: 15,
  },
  colorName: {
    fontFamily: 'Montserrat-Light',
    fontSize: 12,
    color: '#000000',
    textTransform: 'uppercase',
  },
  selectedColorName: {
    fontWeight: '600',
  },
  sortRow: {
    paddingVertical: 8,
  },
  sortText: {
    fontFamily: 'Montserrat-Light',
    fontSize: 12,
    color: '#000000',
    textTransform: 'uppercase',
  },
  selectedSortText: {
    fontWeight: '600',
  },
  categoryRow: {
    paddingVertical: 8,
  },
  categoryText: {
    fontFamily: 'Montserrat-Light',
    fontSize: 12,
    color: '#000000',
    textTransform: 'uppercase',
  },
  selectedCategoryText: {
    fontWeight: '600',
  },
  kidsSection: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 20,
  },
  kidsSizeOption: {
    paddingVertical: 5,
  },
  kidsSizeText: {
    fontFamily: 'Montserrat-Light',
    fontSize: 10,
    color: '#000000',
    textTransform: 'uppercase',
  },
  selectedKidsSizeText: {
    fontWeight: '600',
  },
  viewResultsButton: {
    margin: 20,
    height: 31,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  viewResultsText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default FiltersScreen;
