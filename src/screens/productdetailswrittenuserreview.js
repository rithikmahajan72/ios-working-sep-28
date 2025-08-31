import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import ProductDetailsMainReviewUserThanksForReviewModal from './productdetailsmainreviewuserthanksforreviewmodal';

// BackIcon component moved outside to avoid re-renders
const BackIcon = () => (
  <View style={styles.backIcon}>
    <View style={styles.backArrow} />
  </View>
);

const ProductDetailsWrittenUserReview = ({ navigation, route }) => {
  const [starRating, setStarRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showThanksModal, setShowThanksModal] = useState(false);

  // Get review data from previous screen
  const { reviewData } = route.params || {};

  const handleBackPress = useCallback(() => {
    if (navigation) {
      navigation.goBack();
    }
  }, [navigation]);

  const handleStarPress = useCallback((rating) => {
    setStarRating(rating);
  }, []);

  const handlePostReview = useCallback(async () => {
    const fullReviewData = {
      ...reviewData,
      starRating,
      reviewText,
      images: [], // No image upload functionality in current version
    };
    
    try {
      // TODO: Submit review to backend
      // const response = await submitReview(fullReviewData);
      
      // For now, validate the review data
      if (!fullReviewData.starRating || fullReviewData.starRating < 1) {
        Alert.alert('Invalid Review', 'Please select a star rating before submitting.');
        return;
      }
      
      // Show thanks modal after successful validation
      setShowThanksModal(true);
    } catch (error) {
      // Handle error appropriately
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    }
  }, [reviewData, starRating, reviewText]);

  const handleContinueShopping = useCallback(() => {
    setShowThanksModal(false);
    
    // Check if user came from orders.js (via rate product flow)
    if (route.params?.order) {
      // Navigate back to orders if user came from orders.js
      if (navigation && navigation.navigate) {
        navigation.navigate('Orders');
      }
    } else {
      // Navigate to productdetailsmain.js if came from regular product details flow
      if (navigation && navigation.navigate) {
        navigation.navigate('ProductDetailsMain');
      }
    }
  }, [navigation, route.params?.order]);

  const handleCloseModal = useCallback(() => {
    setShowThanksModal(false);
    // Navigate back to previous screen
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  }, [navigation]);

  const isFormValid = useMemo(() => starRating > 0, [starRating]);

  const renderStars = useCallback(() => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleStarPress(index)}
            style={styles.starButton}
            accessibilityRole="button"
            accessibilityLabel={`Rate ${index} star${index > 1 ? 's' : ''} out of 5`}
            accessibilityHint="Double tap to rate this product"
          >
            <Text style={[
              styles.star,
              index <= starRating ? styles.starFilled : styles.starEmpty
            ]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }, [starRating, handleStarPress]);

  const renderImageUpload = () => (
    <View style={styles.imageUploadContainer}>
      <TouchableOpacity style={styles.imageUploadButton}>
        <View style={styles.imageIcon}>
          <View style={styles.imageIconBackground}>
            <Text style={styles.imageIconText}>📷</Text>
          </View>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.imageUploadButton}>
        <View style={styles.imageIcon}>
          <View style={styles.imageIconBackground}>
            <Text style={styles.imageIconText}>📷</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBackPress} accessibilityRole="button" accessibilityLabel="Go back to previous screen">
          <BackIcon />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Your review</Text>
        
        <View style={styles.headerButton} />
      </View>

      <View style={styles.content}>
        {/* Rating Question */}
        <View style={styles.ratingSection}>
          <Text style={styles.questionText}>What is your opinion of product ?</Text>
          {renderStars()}
        </View>

        {/* Review Text Input */}
        <View style={styles.reviewInputContainer}>
          <TextInput
            style={styles.reviewInput}
            placeholder="Would you like to write anything about this product ?"
            placeholderTextColor="#A0A0A0"
            multiline
            value={reviewText}
            onChangeText={setReviewText}
            maxLength={500}
          />
          <Text style={styles.characterCount}>{reviewText.length > 0 ? `${reviewText.length}` : '50'} characters</Text>
        </View>

        {/* Image Upload Section */}
        {renderImageUpload()}

        {/* Post Review Button */}
        <TouchableOpacity 
          style={[
            styles.postButton,
            !isFormValid && styles.postButtonDisabled
          ]} 
          onPress={handlePostReview}
          disabled={!isFormValid}
          accessibilityRole="button"
          accessibilityLabel="Post your review"
          accessibilityHint={!isFormValid ? "Please select a star rating first" : "Submit your review"}
        >
          <Text style={[
            styles.postButtonText,
            !isFormValid && styles.postButtonTextDisabled
          ]}>Post Review</Text>
        </TouchableOpacity>
      </View>

      {/* Thanks for Review Modal */}
      <ProductDetailsMainReviewUserThanksForReviewModal
        visible={showThanksModal}
        onContinueShopping={handleContinueShopping}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    gap: 10,
  },
  headerButton: {
    width: 68,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat',
    letterSpacing: -0.4,
    textAlign: 'center',
    flex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    width: 8,
    height: 14,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#000000',
    transform: [{ rotate: '-45deg' }],
    marginRight: 2,
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
  },

  // Rating Section
  ratingSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#121420',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginBottom: 24,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  star: {
    fontSize: 32,
  },
  starFilled: {
    color: '#FFD700',
  },
  starEmpty: {
    color: '#E0E0E0',
  },

  // Review Input
  reviewInputContainer: {
    marginBottom: 30,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 20,
    fontSize: 14,
    fontFamily: 'Montserrat',
    color: '#121420',
    backgroundColor: '#FFFFFF',
    minHeight: 150,
    maxHeight: 200,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#A0A0A0',
    fontFamily: 'Montserrat',
    textAlign: 'right',
    marginTop: 8,
  },

  // Image Upload
  imageUploadContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 30,
  },
  imageUploadButton: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  imageIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIconBackground: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIconText: {
    fontSize: 16,
  },

  // Post Button
  postButton: {
    marginTop: 'auto',
    marginBottom: 40,
    paddingVertical: 16,
    borderRadius: 24,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  postButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
  },
  postButtonTextDisabled: {
    color: '#999999',
  },
});

export default ProductDetailsWrittenUserReview;
