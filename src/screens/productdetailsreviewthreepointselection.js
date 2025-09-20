import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import GlobalBackButton from '../components/GlobalBackButton';

const ProductDetailsReviewThreePointSelection = ({ navigation, route }) => {
  const [sizeRating, setSizeRating] = useState(null); // 0-4 scale (Perfect = 2)
  const [comfortRating, setComfortRating] = useState(null);
  const [durabilityRating, setDurabilityRating] = useState(null);

  // Check if all ratings are selected
  const isAllSelected = sizeRating !== null && comfortRating !== null && durabilityRating !== null;

  const handleBackPress = () => {
    if (navigation) {
      navigation.navigate('ProductDetailsMainReview');
    }
  };

  const handleNext = () => {
    // Only proceed if all ratings are selected
    if (!isAllSelected) {
      return;
    }
    
    // Navigate to written user review screen
    const reviewData = {
      size: sizeRating,
      comfort: comfortRating,
      durability: durabilityRating
    };
    
    navigation.navigate('ProductDetailsWrittenUserReview', { 
      reviewData,
      order: route?.params?.order // Pass order data if it exists
    });
  };

  const renderRatingScale = (rating, setRating, labels) => (
    <View style={styles.ratingScale}>
      {/* Rating dots and lines */}
      <View style={styles.ratingRow}>
        {[0, 1, 2, 3, 4].map((index) => (
          <TouchableOpacity
            key={index}
            style={styles.ratingDotContainer}
            onPress={() => setRating(index)}
          >
            <View style={[
              styles.ratingDot,
              rating === index && styles.ratingDotSelected
            ]} />
          </TouchableOpacity>
        ))}
        {/* Connecting lines */}
        <View style={[styles.ratingLine, { left: 20 }]} />
        <View style={[styles.ratingLine, { left: 86.75 }]} />
        <View style={[styles.ratingLine, { left: 153.5 }]} />
        <View style={[styles.ratingLine, { left: 220.25 }]} />
      </View>
      
      {/* Labels */}
      <View style={styles.ratingLabels}>
        <Text style={styles.ratingLabelLeft}>{labels.left}</Text>
        {labels.center && <Text style={styles.ratingLabelCenter}>{labels.center}</Text>}
        <Text style={styles.ratingLabelRight}>{labels.right}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      
      {/* Header */}
      <View style={styles.header}>
        <GlobalBackButton 
          onPress={handleBackPress}
          style={styles.headerButton}
          iconSize={20}
        />
        
        <Text style={styles.headerTitle}>How was your product</Text>
        
        <View style={styles.headerButton} />
      </View>

      {/* Product Image */}
      <View style={styles.productImageContainer}>
        <View style={styles.productImage}>
          <View style={styles.imagePlaceholder}>
            <View style={styles.nikeSwoosh} />
          </View>
        </View>
      </View>

      {/* Size Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>How was the size?</Text>
        {renderRatingScale(sizeRating, setSizeRating, {
          left: 'Too Small',
          center: 'Perfect',
          right: 'Too Big'
        })}
      </View>

      {/* Comfort Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>How was the comfort?</Text>
        {renderRatingScale(comfortRating, setComfortRating, {
          left: 'Uncomfortable',
          right: 'Comfortable'
        })}
      </View>

      {/* Durability Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>How was the durability?</Text>
        {renderRatingScale(durabilityRating, setDurabilityRating, {
          left: 'Non-Durable',
          center: 'Perfect',
          right: 'Durable'
        })}
      </View>

      {/* Next Button */}
      <TouchableOpacity 
        style={[
          styles.nextButton,
          !isAllSelected && styles.nextButtonDisabled
        ]} 
        onPress={handleNext}
        disabled={!isAllSelected}
      >
        <Text style={[
          styles.nextButtonText,
          !isAllSelected && styles.nextButtonTextDisabled
        ]}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#F5F5F5',
  },
  headerButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    flex: 1,
    letterSpacing: -0.4,
    fontFamily: 'Montserrat-Medium',
  },

  // Product Image
  productImageContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  productImage: {
    width: 122,
    height: 123,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nikeSwoosh: {
    width: 36,
    height: 16,
    backgroundColor: '#000000',
    borderRadius: 8,
    transform: [{ skewX: '-20deg' }],
  },

  // Rating Container
  ratingContainer: {
    paddingHorizontal: 31,
    marginBottom: 35,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#121420',
    textAlign: 'center',
    marginBottom: 22,
    letterSpacing: -0.08,
    fontFamily: 'Montserrat-SemiBold',
  },

  // Rating Scale
  ratingScale: {
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 0,
    width: 313,
    position: 'relative',
  },
  ratingDotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ratingDot: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'transparent',
  },
  ratingDotSelected: {
    backgroundColor: '#1A1A1A',
  },
  ratingLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: '#000000',
    width: 51,
    top: 8,
  },
  ratingLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 313,
    paddingTop: 10,
  },
  ratingLabelLeft: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: -0.06,
    fontFamily: 'Montserrat-Regular',
  },
  ratingLabelCenter: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -25 }],
    letterSpacing: -0.06,
    fontFamily: 'Montserrat-Regular',
  },
  ratingLabelRight: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: -0.06,
    fontFamily: 'Montserrat-Regular',
  },

    // Next Button
  nextButton: {
    marginHorizontal: 30,
    marginTop: 'auto',
    marginBottom: 40,
    height: 48,
    backgroundColor: '#000000',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0,
    fontFamily: 'Montserrat-SemiBold',
  },
  nextButtonTextDisabled: {
    color: '#999999',
  },
});

export default ProductDetailsReviewThreePointSelection;
