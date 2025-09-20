import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  Animated,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '../constants';
import { GlobalSearchIcon, FilterIcon, GlobalCartIcon, HeartIcon } from '../assets/icons';
import { useFavorites } from '../contexts/FavoritesContext';
import { useBag } from '../contexts/BagContext';
import { PRODUCTS } from '../constants/products';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// FilterModal component
const FilterModal = ({ 
  visible, 
  onClose, 
  slideAnim, 
  selectedSizes, 
  setSelectedSizes, 
  selectedColors, 
  setSelectedColors, 
  selectedSort, 
  setSelectedSort, 
  onClearFilters 
}) => {
  const renderColorOption = (colorOption, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.colorOption,
        selectedColors.includes(colorOption.name) && styles.selectedColorOption
      ]}
      onPress={() => {
        if (selectedColors.includes(colorOption.name)) {
          setSelectedColors(selectedColors.filter(c => c !== colorOption.name));
        } else {
          setSelectedColors([...selectedColors, colorOption.name]);
        }
      }}
    >
      <View style={[styles.colorCircle, { backgroundColor: colorOption.color }]} />
      <Text style={styles.colorName}>{colorOption.name}</Text>
    </TouchableOpacity>
  );

  const renderSizeOption = (size) => (
    <TouchableOpacity
      key={size}
      style={[
        styles.sizeOption,
        selectedSizes.includes(size) && styles.selectedSizeOption
      ]}
      onPress={() => {
        if (selectedSizes.includes(size)) {
          setSelectedSizes(selectedSizes.filter(s => s !== size));
        } else {
          setSelectedSizes([...selectedSizes, size]);
        }
      }}
    >
      <Text style={[
        styles.sizeText,
        selectedSizes.includes(size) && styles.selectedSizeText
      ]}>{size}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <Animated.View
          style={[
            styles.filterModal,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Modal Handle */}
            <View style={styles.modalHandle} />
            
            {/* Filter Header */}
            <View style={styles.filterHeader}>
              <TouchableOpacity onPress={onClearFilters}>
                <Text style={styles.clearFiltersText}>CLEAR FILTERS</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.filterContent} showsVerticalScrollIndicator={false}>
              {/* Sizes */}
              <View style={styles.filterSection}>
                <View style={styles.sizeGrid}>
                  {FILTER_OPTIONS.sizes.map(renderSizeOption)}
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
                  <View style={styles.sliderRange} />
                  <View style={styles.sliderThumb} />
                  <View style={[styles.sliderThumb, styles.sliderThumbEnd]} />
                </View>
                <Text style={styles.priceRangeText}>₹ 450 - ₹ 23,950,200</Text>
              </View>

              {/* Colors */}
              <View style={styles.filterSection}>
                <Text style={styles.filterTitle}>COLOUR</Text>
                {FILTER_OPTIONS.colors.map(renderColorOption)}
              </View>

              {/* Sort By */}
              <View style={styles.filterSection}>
                <Text style={styles.filterTitle}>SHORT BY</Text>
                {FILTER_OPTIONS.sortBy.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.sortOption}
                    onPress={() => setSelectedSort(option)}
                  >
                    <Text style={[
                      styles.sortText,
                      selectedSort === option && styles.selectedSortText
                    ]}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* More Sizes */}
              <View style={styles.filterSection}>
                <Text style={styles.filterTitle}>SIZE</Text>
                <View style={styles.sizeGrid}>
                  {FILTER_OPTIONS.sizes2.map(renderSizeOption)}
                </View>
                <TouchableOpacity style={styles.viewMoreButton}>
                  <Text style={styles.viewMoreText}>VIEW MORE</Text>
                </TouchableOpacity>
              </View>

              {/* Categories */}
              <View style={styles.filterSection}>
                <Text style={styles.filterTitle}>SHORT BY</Text>
                {FILTER_OPTIONS.categories.map((category) => (
                  <TouchableOpacity key={category} style={styles.categoryOption}>
                    <Text style={styles.categoryText}>{category}</Text>
                  </TouchableOpacity>
                ))}
                <View style={styles.kidsSection}>
                  {FILTER_OPTIONS.kidsSizes.map((size) => (
                    <TouchableOpacity key={size} style={styles.kidsSizeOption}>
                      <Text style={styles.kidsSizeText}>{size}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            {/* View Results Button */}
            <TouchableOpacity style={styles.viewResultsButton} onPress={onClose}>
              <Text style={styles.viewResultsText}>VIEW RESULTS</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};
const FILTER_OPTIONS = {
  sizes: ['42', '43', '44', '45'],
  colors: [
    { name: 'BEIGE', color: '#F5F5DC' },
    { name: 'BLACK', color: '#000000' },
    { name: 'BEIGE', color: '#87CEEB' },
    { name: 'BEIGE', color: '#D2B48C' },
    { name: 'BEIGE', color: '#8B0000' },
    { name: 'BEIGE', color: '#FFD700' },
    { name: 'BEIGE', color: '#90EE90' },
  ],
  sortBy: ['ASCENDING PRICE', 'DESCENDING PRICE', 'NEW'],
  sizes2: ['S', 'M', 'L', 'XL', '36', '38', '40'],
  categories: ['MAN', 'WOMEN', 'KIDS'],
  kidsSizes: ['BOY', 'GIRL'],
};

const CollectionScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('TOP WEAR');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSort, setSelectedSort] = useState('ASCENDING PRICE');

  // Use the FavoritesContext
  const { toggleFavorite, isFavorite } = useFavorites();

  // Use the BagContext
  const { addToBag } = useBag();

  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const filteredProducts = PRODUCTS.filter(product => 
    activeTab === 'TOP WEAR' ? product.category === 'TOP WEAR' : product.category === 'BOTTOM WEAR'
  );

  const handleToggleWishlist = (productId) => {
    const wasAdded = toggleFavorite(productId);
    // Optional: You can add visual feedback here like toast messages
    if (wasAdded) {
      console.log('Added to favorites! Check your Favourites tab to see all saved items.');
    } else {
      console.log('Removed from favorites');
    }
  };

  const handleAddToBag = (product) => {
    // For now, add with default size. In a real app, you might want to show a size selector
    const productToAdd = {
      ...product,
      size: 'M', // Default size - could be made configurable
    };
    
    addToBag(productToAdd);
    console.log('Added to bag! Check your Bag to see all items.');
  };

  const openFilterModal = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('Filters');
    }
  };

  const closeFilterModal = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setShowFilterModal(false);
    });
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedSort('ASCENDING PRICE');
  };

  const renderSeparator = () => <View style={styles.itemSeparator} />;

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation?.navigate('ProductDetailsMain', { 
        product: item,
        previousScreen: 'Collection' 
      })}
    >
      <View style={styles.productImageContainer}>
        <View style={styles.productImagePlaceholder}>
          <View style={styles.productPlaceholderIcon} />
        </View>
        <TouchableOpacity 
          style={styles.heartButton}
          onPress={(e) => {
            e.stopPropagation();
            handleToggleWishlist(item.id);
          }}
        >
          <HeartIcon size={19} filled={isFavorite(item.id)} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={(e) => {
            e.stopPropagation();
            handleAddToBag(item);
          }}
        >
          <GlobalCartIcon size={16} />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productColors}>{item.colors}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => navigation?.navigate('SearchScreen', { previousScreen: 'Collection' })}
          >
            <GlobalSearchIcon size={24} />
          </TouchableOpacity>
        </View>

        {/* Filter Bar */}
        <View style={styles.filterBar}>
          <TouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
            <FilterIcon size={20} />
          </TouchableOpacity>
          
          {/* Swipeable Tabs */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.tabScrollView}
            contentContainerStyle={styles.tabContainer}
          >
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'TOP WEAR' && styles.activeTab
              ]}
              onPress={() => setActiveTab('TOP WEAR')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'TOP WEAR' && styles.activeTabText
              ]}>TOP WEAR</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'BOTTOM WEAR' && styles.activeTab
              ]}
              onPress={() => setActiveTab('BOTTOM WEAR')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'BOTTOM WEAR' && styles.activeTabText
              ]}>BOTTOM WEAR</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Products Grid */}
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productsContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={renderSeparator}
          columnWrapperStyle={styles.productRow}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={10}
          windowSize={10}
          getItemLayout={(data, index) => {
            // Safer getItemLayout with additional validation
            const safeIndex = Math.max(0, index || 0);
            const itemLength = 240;
            return {
              length: itemLength,
              offset: itemLength * Math.floor(safeIndex / 2),
              index: safeIndex,
            };
          }}
        />

        <FilterModal 
          visible={showFilterModal}
          onClose={closeFilterModal}
          slideAnim={slideAnim}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          onClearFilters={clearFilters}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  searchButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  filterButton: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  tabScrollView: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingVertical: 0,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#CACACA',
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 31,
    width: 129,
  },
  activeTab: {
    backgroundColor: 'transparent',
    borderColor: '#000000',
  },
  tabText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#CACACA',
    letterSpacing: -0.3,
  },
  activeTabText: {
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
  },
  productsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productRow: {
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginBottom: 40,
    gap: 6,
  },
  productCard: {
    width: 184,
    backgroundColor: '#FFFFFF',
  },
  productImageContainer: {
    position: 'relative',
    height: 184,
    width: 184,
  },
  productImagePlaceholder: {
    height: '100%',
    width: '100%',
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productPlaceholderIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#CCCCCC',
    borderRadius: 8,
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 0,
    width: '100%',
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    marginBottom: 5,
    lineHeight: 16.8,
    letterSpacing: -0.14,
  },
  productBrand: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#767676',
    marginBottom: 5,
    lineHeight: 16.8,
    letterSpacing: -0.14,
  },
  productColors: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#767676',
    marginBottom: 5,
    lineHeight: 16.8,
    letterSpacing: -0.14,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    lineHeight: 16.8,
    letterSpacing: -0.14,
  },
  itemSeparator: {
    height: 40,
  },

  // Filter Modal Styles  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: SCREEN_HEIGHT * 0.8,
    paddingBottom: 20,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  filterHeader: {
    paddingHorizontal: 16,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  clearFiltersText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semiBold,
    color: '#000000',
    letterSpacing: 0.5,
  },
  filterContent: {
    paddingHorizontal: 16,
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  filterSection: {
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterTitle: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semiBold,
    color: '#000000',
    marginBottom: Spacing.md,
    letterSpacing: 0.5,
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  sizeOption: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: '#F8F8F8',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedSizeOption: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  sizeText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: '#666666',
  },
  selectedSizeText: {
    color: '#FFFFFF',
  },
  viewMoreButton: {
    alignSelf: 'flex-start',
  },
  viewMoreText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semiBold,
    color: '#666666',
    textDecorationLine: 'underline',
  },
  priceSlider: {
    height: 40,
    justifyContent: 'center',
    marginBottom: Spacing.md,
    position: 'relative',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  sliderRange: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#000000',
    borderRadius: 2,
    left: '20%',
    right: '10%',
  },
  sliderThumb: {
    position: 'absolute',
    width: 16,
    height: 16,
    backgroundColor: '#000000',
    borderRadius: 8,
    left: '20%',
    top: 12,
  },
  sliderThumbEnd: {
    left: '80%',
  },
  priceRangeText: {
    fontSize: FontSizes.sm,
    color: '#666666',
    textAlign: 'center',
  },
  colorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  selectedColorOption: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  colorName: {
    fontSize: FontSizes.sm,
    color: '#666666',
  },
  sortOption: {
    paddingVertical: Spacing.md,
  },
  sortText: {
    fontSize: FontSizes.sm,
    color: '#666666',
  },
  selectedSortText: {
    color: '#000000',
    fontWeight: FontWeights.semiBold,
  },
  categoryOption: {
    paddingVertical: Spacing.md,
  },
  categoryText: {
    fontSize: FontSizes.sm,
    color: '#666666',
  },
  kidsSection: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
    marginLeft: Spacing.lg,
  },
  kidsSizeOption: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: '#F8F8F8',
    borderRadius: BorderRadius.md,
  },
  kidsSizeText: {
    fontSize: FontSizes.sm,
    color: '#666666',
  },
  viewResultsButton: {
    marginHorizontal: 16,
    marginVertical: Spacing.xl,
    paddingVertical: Spacing.lg,
    backgroundColor: '#000000',
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  viewResultsText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});

export default CollectionScreen;
