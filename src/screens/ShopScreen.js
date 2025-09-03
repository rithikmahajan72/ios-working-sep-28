import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Spacing, BorderRadius, Shadows } from '../constants';
import Svg, { Path } from 'react-native-svg';

// SVG Icon Components
const SearchIcon = ({ color = '#262626' }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M19.0002 19.0002L14.6572 14.6572M14.6572 14.6572C15.4001 13.9143 15.9894 13.0324 16.3914 12.0618C16.7935 11.0911 17.0004 10.0508 17.0004 9.00021C17.0004 7.9496 16.7935 6.90929 16.3914 5.93866C15.9894 4.96803 15.4001 4.08609 14.6572 3.34321C13.9143 2.60032 13.0324 2.01103 12.0618 1.60898C11.0911 1.20693 10.0508 1 9.00021 1C7.9496 1 6.90929 1.20693 5.93866 1.60898C4.96803 2.01103 4.08609 2.60032 3.34321 3.34321C1.84288 4.84354 1 6.87842 1 9.00021C1 11.122 1.84288 13.1569 3.34321 14.6572C4.84354 16.1575 6.87842 17.0004 9.00021 17.0004C11.122 17.0004 13.1569 16.1575 14.6572 14.6572Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </Svg>
);

const HeartIcon = ({ filled = false, color = '#000000' }) => (
  <Svg width={13} height={12} viewBox="0 0 13 12" fill="none">
    <Path
      d="M6.68786 10.6254L11.5747 5.66849C12.0876 5.15562 12.3757 4.46003 12.3757 3.73474C12.3757 3.00944 12.0876 2.31385 11.5747 1.80099C11.0619 1.28812 10.3663 1 9.64099 1C8.91569 1 8.2201 1.28812 7.70724 1.80099L6.68786 2.75036L5.66849 1.80099C5.15562 1.28812 4.46003 1 3.73474 1C3.00944 1 2.31385 1.28812 1.80099 1.80099C1.28812 2.31385 1 3.00944 1 3.73474C1 4.46003 1.28812 5.15562 1.80099 5.66849L6.68786 10.6254Z"
      stroke={color}
      fill={filled ? color : 'none'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Import GlobalCartIcon from assets
import { GlobalCartIcon } from '../assets/icons';
import { useFavorites } from '../contexts/FavoritesContext';
import { useBag } from '../contexts/BagContext';

// Sample data for new arrivals and trending now
const NEW_ARRIVALS = [
    { 
    id: '1', 
    name: 'Product One', 
    price: '$99', 
    isNewArrival: true, 
    image: 'https://via.placeholder.com/150x200/CCCCCC/000000?text=Product+1'
  },
  { 
    id: '2', 
    name: 'Product Two', 
    price: '$149', 
    isNewArrival: true, 
    image: 'https://via.placeholder.com/150x200/CCCCCC/000000?text=Product+2'
  },
  { 
    id: '3', 
    name: 'Product Three', 
    price: '$199', 
    isNewArrival: true, 
    image: 'https://via.placeholder.com/150x200/CCCCCC/000000?text=Product+3'
  },
];

const TRENDING_NOW = [
  {
    id: '1',
    name: 'Nike Life',
    price: 'US$180',
    image: null,
  },
  {
    id: '2',
    name: 'Nike Life',
    price: 'US$120',
    image: null,
  },
  {
    id: '3',
    name: 'Adidas Originals',
    price: 'US$160',
    image: null,
  },
];

const SALE_CATEGORIES = [
  {
    id: '1',
    name: 'T-Shirts',
    image: null,
  },
  {
    id: '2',
    name: 'Trousers',
    image: null,
  },
];

const TABS = ['Men', 'Women', 'Kids'];

const ShopScreen = React.memo(({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Men');

  // Use contexts instead of local state
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToBag } = useBag();

  // Memoize static data arrays to prevent recreation on each render
  const newArrivals = useMemo(() => NEW_ARRIVALS, []);
  const trendingNow = useMemo(() => TRENDING_NOW, []);
  const saleCategories = useMemo(() => SALE_CATEGORIES, []);
  const tabs = useMemo(() => TABS, []);

  // Optimized handlers with useCallback
  const handleNavigateToSearch = useCallback(() => {
    navigation?.navigate('SearchScreen', { previousScreen: 'Shop' });
  }, [navigation]);

  const handleTabSelect = useCallback((tab) => {
    setSelectedTab(tab);
  }, []);

  const handleAddToBag = useCallback((product) => {
    // For now, add with default size. In a real app, you might want to show a size selector
    const productToAdd = {
      ...product,
      size: 'M', // Default size - could be made configurable
    };
    
    addToBag(productToAdd);
    console.log('Added to bag! Check your Bag to see all items.');
  }, [addToBag]);

  // Memoized render functions for better performance
  const renderProductItem = useCallback(({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, ${item.price}`}
      accessibilityHint="View product details"
    >
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImagePlaceholder}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
          accessibilityRole="button"
          accessibilityLabel={isFavorite(item.id) ? "Remove from favorites" : "Add to favorites"}
          accessibilityState={{ selected: isFavorite(item.id) }}
        >
          <HeartIcon filled={isFavorite(item.id)} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => handleAddToBag(item)}
          accessibilityRole="button"
          accessibilityLabel="Add to cart"
          accessibilityHint="Add product to shopping cart"
        >
          <GlobalCartIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  ), [toggleFavorite, isFavorite, handleAddToBag]);

  const renderSaleCategoryItem = useCallback(({ item }) => (
    <TouchableOpacity 
      style={styles.saleCategoryCard}
      accessibilityRole="button"
      accessibilityLabel={`${item.name} category`}
      accessibilityHint="Browse category products"
    >
      <View style={styles.saleCategoryImagePlaceholder} />
      <View style={styles.saleCategoryOverlay}>
        <Text style={styles.saleCategoryText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  ), []);

  const renderTab = useCallback((tab) => (
    <TouchableOpacity
      key={tab}
      style={styles.tabItem}
      onPress={() => handleTabSelect(tab)}
      accessibilityRole="tab"
      accessibilityLabel={`${tab} tab`}
      accessibilityState={{ selected: selectedTab === tab }}
    >
      <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
        {tab}
      </Text>
      {selectedTab === tab && <View style={styles.tabIndicator} />}
    </TouchableOpacity>
  ), [selectedTab, handleTabSelect]);

  return (
    <View style={styles.container}>
      {/* Header with search */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={handleNavigateToSearch}
          accessibilityRole="button"
          accessibilityLabel="Search"
          accessibilityHint="Navigate to search screen"
        >
          <SearchIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* New Arrivals Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle} accessibilityRole="header">New Arrivals</Text>
          <FlatList
            data={newArrivals}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            accessibilityLabel="New arrivals product list"
            removeClippedSubviews={true}
            maxToRenderPerBatch={5}
            initialNumToRender={5}
            windowSize={7}
            getItemLayout={(data, index) => {
              // Safer getItemLayout with additional validation
              const safeIndex = Math.max(0, index || 0);
              const itemLength = 180;
              return {
                length: itemLength,
                offset: itemLength * safeIndex,
                index: safeIndex,
              };
            }}
          />
        </View>

        {/* Trending Now Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle} accessibilityRole="header">Trending Now</Text>
          <FlatList
            data={trendingNow}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            accessibilityLabel="Trending products list"
            removeClippedSubviews={true}
            maxToRenderPerBatch={5}
            initialNumToRender={5}
            windowSize={7}
            getItemLayout={(data, index) => {
              // Safer getItemLayout with additional validation
              const safeIndex = Math.max(0, index || 0);
              const itemLength = 180;
              return {
                length: itemLength,
                offset: itemLength * safeIndex,
                index: safeIndex,
              };
            }}
          />
        </View>

        {/* Sale Section */}
        <View style={styles.section}>
          <Text style={styles.saleTitle} accessibilityRole="header">Sale</Text>
          
          {/* Tabs */}
          <View style={styles.tabContainer} accessibilityRole="tablist">
            {tabs.map(renderTab)}
          </View>

          {/* Sale Categories */}
          <FlatList
            data={saleCategories}
            renderItem={renderSaleCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            accessibilityLabel="Sale categories list"
            removeClippedSubviews={true}
            maxToRenderPerBatch={4}
            initialNumToRender={4}
            windowSize={6}
            getItemLayout={(data, index) => {
              // Safer getItemLayout with additional validation
              const safeIndex = Math.max(0, index || 0);
              const itemLength = 120;
              return {
                length: itemLength,
                offset: itemLength * safeIndex,
                index: safeIndex,
              };
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: 54, // Status bar height + padding
    paddingBottom: Spacing.lg,
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  section: {
    marginBottom: 38,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    marginBottom: Spacing.lg,
    fontFamily: 'Montserrat-Medium',
  },
  saleTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#CA3327',
    marginBottom: Spacing.lg,
    fontFamily: 'Montserrat-Medium',
  },
  horizontalList: {
    paddingRight: Spacing.xl,
    gap: 6,
  },
  productCard: {
    width: 246,
    marginRight: 6,
  },
  productImageContainer: {
    position: 'relative',
    height: 246,
    backgroundColor: '#EEEEEE',
    borderRadius: BorderRadius.md,
    marginBottom: 12,
  },
  productImagePlaceholder: {
    flex: 1,
    borderRadius: BorderRadius.md,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.small,
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
    ...Shadows.small,
  },
  productInfo: {
    gap: 2,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    letterSpacing: -0.14,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '400',
    color: '#767676',
    fontFamily: 'Montserrat-Regular',
    letterSpacing: -0.14,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CDCDCD',
    marginBottom: Spacing.lg,
  },
  tabItem: {
    paddingVertical: 12,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#767676',
    fontFamily: 'Montserrat-Medium',
    letterSpacing: -0.4,
    marginBottom: 16,
  },
  activeTabText: {
    color: '#000000',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#000000',
  },
  saleCategoryCard: {
    width: 246,
    height: 292,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginRight: 6,
    position: 'relative',
  },
  saleCategoryImagePlaceholder: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  saleCategoryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  saleCategoryText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
  },
});

export default ShopScreen;
