import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  Animated,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Colors, FontFamilies } from '../constants';
import GlobalBackButton from '../components/GlobalBackButton';
import { useFavorites } from '../contexts/FavoritesContext';

// Trash/Delete Icon Component
const TrashIcon = ({ size = 34 }) => (
  <Svg width={size} height={size} viewBox="0 0 34 34" fill="none">
    <Circle 
      cx="17" 
      cy="17" 
      r="17" 
      fill="white"
    />
    <Path 
      d="M10.25 12.5H11.75H23.75" 
      stroke="black" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <Path 
      d="M22.25 12.5V23C22.25 23.3978 22.092 23.7794 21.8107 24.0607C21.5294 24.342 21.1478 24.5 20.75 24.5H13.25C12.8522 24.5 12.4706 24.342 12.1893 24.0607C11.908 23.7794 11.75 23.3978 11.75 23V12.5M14 12.5V11C14 10.6022 14.158 10.2206 14.4393 9.93934C14.7206 9.65804 15.1022 9.5 15.5 9.5H18.5C18.8978 9.5 19.2794 9.65804 19.5607 9.93934C19.842 10.2206 20 10.6022 20 11V12.5" 
      stroke="black" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

const FavouritesContentEditView = ({ navigation }) => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [deleteAnimations] = useState(new Map());

  // Initialize animated values for delete animations
  const getDeleteAnimation = (productId) => {
    if (!deleteAnimations.has(productId)) {
      deleteAnimations.set(productId, new Animated.Value(1));
    }
    return deleteAnimations.get(productId);
  };

  // Mock product data - in a real app, you would fetch full product details based on IDs
  const allProducts = [
    {
      id: '1',
      name: 'Air Jordan 1 Mid',
      price: 'US$125',
      colors: ['#FFFFFF', '#F5F5F5'],
      image: null,
    },
    {
      id: '2', 
      name: 'Air Jordan 1 Mid',
      price: 'US$125',
      colors: ['#FFFFFF', '#F5F5F5'],
      image: null,
    },
    {
      id: '3',
      name: 'Air Jordan 1 Mid', 
      price: 'US$125',
      colors: ['#FFFFFF', '#F5F5F5'],
      image: null,
    },
    {
      id: '4',
      name: 'Air Jordan 1 Mid',
      price: 'US$125', 
      colors: ['#FFFFFF', '#F5F5F5'],
      image: null,
    },
  ];

  // Filter products to show only favorited ones
  const favouritedProducts = allProducts.filter(product => 
    favorites.has(product.id)
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSavePress = () => {
    // Simply navigate back since items are deleted immediately
    navigation.goBack();
  };

  const handleClearAllPress = () => {
    Alert.alert(
      'Clear All Favourites',
      'Are you sure you want to remove all items from your favourites?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            favouritedProducts.forEach(product => {
              removeFromFavorites(product.id);
            });
            Alert.alert(
              'Favourites Cleared',
              'All items have been removed from your favourites',
              [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
          },
        },
      ]
    );
  };

  const handleRemovePress = (productId) => {
    const animatedValue = getDeleteAnimation(productId);
    
    // Animate the delete button and remove the item
    Animated.sequence([
      // Scale up the delete button
      Animated.timing(animatedValue, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: false,
      }),
      // Scale down and fade out
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      })
    ]).start(() => {
      // Remove from favorites after animation
      removeFromFavorites(productId);
      deleteAnimations.delete(productId);
    });
  };

  const handleProductPress = (product) => {
    // In edit mode, tapping the product does nothing, only delete button works
    return;
  };

  const renderProductItem = ({ item, index }) => {
    const isLeftColumn = index % 2 === 0;
    const deleteAnimatedValue = getDeleteAnimation(item.id);
    
    return (
      <Animated.View style={[
        styles.productContainer,
        isLeftColumn ? styles.leftProduct : styles.rightProduct,
        {
          opacity: deleteAnimatedValue,
          transform: [{
            scale: deleteAnimatedValue,
          }],
        }
      ]}>
        {/* Product Image */}
        <TouchableOpacity 
          style={styles.imageContainer}
          onPress={() => handleProductPress(item)}
        >
          <View style={styles.imagePlaceholder} />
          
          {/* Delete/Trash Icon with Animation */}
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleRemovePress(item.id)}
          >
            <TrashIcon size={34} />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>
            {item.name}
          </Text>
          <Text style={styles.productPrice}>
            {item.price}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <GlobalBackButton />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favourites</Text>
        <View style={styles.headerActions}>
          {favouritedProducts.length > 0 && (
            <TouchableOpacity 
              style={styles.clearAllButton}
              onPress={handleClearAllPress}
            >
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSavePress}
          >
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Products Grid */}
      <View style={styles.content}>
        {favouritedProducts.length > 0 ? (
          <FlatList
            data={favouritedProducts}
            renderItem={renderProductItem}
            numColumns={2}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gridContainer}
            columnWrapperStyle={styles.row}
          />
        ) : (
          // Empty state
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No favourites to edit
            </Text>
            <TouchableOpacity 
              style={styles.addFavouritesButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>Go Shopping</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 12,
    backgroundColor: Colors.white,
  },
  backButton: {
    width: 68,
    height: 24,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FontFamilies.montserrat,
    color: Colors.black,
    textAlign: 'center',
    letterSpacing: -0.4,
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 68,
    justifyContent: 'flex-end',
  },
  clearAllButton: {
    marginRight: 16,
  },
  clearAllText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: FontFamilies.montserrat,
    color: '#FF3B30',
    letterSpacing: -0.4,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: FontFamilies.montserrat,
    color: Colors.black,
    letterSpacing: -0.4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  gridContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  productContainer: {
    width: '48%',
  },
  leftProduct: {
    marginRight: 8,
  },
  rightProduct: {
    marginLeft: 8,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  productInfo: {
    paddingHorizontal: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FontFamilies.montserrat,
    color: Colors.black,
    lineHeight: 20,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FontFamilies.montserrat,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  // Empty state styles
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FontFamilies.montserrat,
    fontWeight: '400',
    color: Colors.black,
    textAlign: 'center',
    letterSpacing: -0.384,
    lineHeight: 24,
    marginBottom: 40,
  },
  addFavouritesButton: {
    backgroundColor: Colors.black,
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 51,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FontFamilies.montserrat,
    color: Colors.white,
    lineHeight: 19.2,
  },
});

export default FavouritesContentEditView;
