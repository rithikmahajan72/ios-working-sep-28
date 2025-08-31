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
      {/* Rating dots and lines combined */}
      <View style={styles.ratingRow}>
        {[0, 1, 2, 3, 4].map((index) => (
          <React.Fragment key={index}>
            <TouchableOpacity
              style={styles.ratingDotContainer}
              onPress={() => setRating(index)}
            >
              <View style={[
                styles.ratingDot,
                rating === index && styles.ratingDotSelected
              ]} />
            </TouchableOpacity>
            {index < 4 && <View style={styles.ratingLine} />}
          </React.Fragment>
        ))}
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
          navigation={navigation}
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
    paddingVertical: 20,
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
  },

  // Product Image
  productImageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
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
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#121420',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: -0.08,
  },

  // Rating Scale
  ratingScale: {
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  ratingDotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 1,
    height: 1,
    backgroundColor: '#000000',
    marginHorizontal: 0,
  },
  ratingLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  ratingLabelLeft: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: -0.06,
  },
  ratingLabelCenter: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -25 }],
    letterSpacing: -0.06,
  },
  ratingLabelRight: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: -0.06,
  },

  // Next Button
  nextButton: {
    marginHorizontal: 30,
    marginTop: 'auto',
    marginBottom: 40,
    paddingVertical: 18,
    borderRadius: 25,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  nextButtonTextDisabled: {
    color: '#999999',
  },
});

export default ProductDetailsReviewThreePointSelection;
