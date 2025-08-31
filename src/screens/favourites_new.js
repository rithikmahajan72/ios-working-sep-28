import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Colors, FontFamilies } from '../constants';
import HeartIcon from '../assets/icons/HeartIcon';
import GlobalBackButton from '../components/GlobalBackButton';
import { useFavorites } from '../contexts/FavoritesContext';

const FavouritesScreen = ({ navigation }) => {
  const { getFavoritesCount } = useFavorites();

  useEffect(() => {
    // If there are favorited items, navigate to content screen
    if (getFavoritesCount() > 0) {
      navigation.replace('FavouritesContent');
    }
  }, [getFavoritesCount, navigation]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddFavouritesNow = () => {
    navigation.navigate('Home');
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
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Heart Icon */}
        <View style={styles.heartIconContainer}>
          <View style={styles.heartIconCircle}>
            <HeartIcon size={35} color="#14142B" filled={false} />
          </View>
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.emptyText}>
            Your <Text style={styles.boldText}>Favourites</Text> is empty.
          </Text>
          <Text style={styles.descriptionText}>
            When you add products, they'll
          </Text>
          <Text style={styles.descriptionText}>
            appear here.
          </Text>
        </View>
      </View>

      {/* Add Favourites Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.addFavouritesButton}
          onPress={handleAddFavouritesNow}
        >
          <Text style={styles.buttonText}>Add Favourites Now</Text>
        </TouchableOpacity>
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
  headerRight: {
    width: 68,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heartIconContainer: {
    marginBottom: 20,
  },
  heartIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FontFamilies.montserrat,
    fontWeight: '400',
    color: Colors.black,
    textAlign: 'center',
    letterSpacing: -0.384,
    lineHeight: 24,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: '400',
    fontFamily: FontFamilies.montserrat,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: FontFamilies.montserrat,
    fontWeight: '400',
    color: Colors.black,
    textAlign: 'center',
    letterSpacing: -0.384,
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 34,
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

export default FavouritesScreen;
