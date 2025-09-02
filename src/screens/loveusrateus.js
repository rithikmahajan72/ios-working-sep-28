import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  ScrollView,
  TextInput,
  Image,
  Modal,
  Alert,
} from 'react-native';

// Dynamic import for image picker to handle cases where it might not be available
let ImagePicker;
try {
  ImagePicker = require('react-native-image-picker');
} catch (e) {
}

// Back Arrow Icon Component
const BackArrowIcon = () => (
  <Image 
    source={require('../assets/icons/CaretLeft.png')} 
    style={styles.backArrowIcon}
    resizeMode="contain"
  />
);

// Star Rating Component
const StarRating = ({ rating, onRatingPress }) => {
  const stars = [1, 2, 3, 4, 5];
  
  return (
    <View style={styles.starContainer}>
      {stars.map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onRatingPress(star)}
          style={styles.starButton}
        >
          <Text style={[
            styles.starText,
            star <= rating ? styles.starFilled : styles.starEmpty
          ]}>
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Camera Icon Component
const CameraIcon = () => (
  <View style={styles.cameraIconContainer}>
    <View style={styles.cameraBody} />
    <View style={styles.cameraLens} />
    <View style={styles.cameraFlash} />
  </View>
);

// Success Modal Component
const SuccessModal = ({ visible, onClose }) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.successModalContainer}>
        <View style={styles.successIcon}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        <Text style={styles.successTitle}>Thank you for your feedback!</Text>
        <Text style={styles.successMessage}>
          Your feedback helps us improve our service and provide you with a better experience.
        </Text>
        <TouchableOpacity style={styles.doneButton} onPress={onClose}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const LoveUsRateUs = ({ navigation, route }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const slideAnim = useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    // Animate in with 300ms ease out
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleBack = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      if (navigation && navigation.navigate) {
        navigation.navigate('Profile');
      } else if (navigation && navigation.goBack) {
        navigation.goBack();
      }
    });
  };

  const handleImagePicker = () => {
    if (!ImagePicker) {
      Alert.alert('Feature Unavailable', 'Image picker is not available on this device.');
      return;
    }

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel || response.error) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const newImage = response.assets[0];
        setUploadedImages(prev => [...prev, newImage]);
      }
    });
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please provide a rating before submitting.');
      return;
    }

    // Here you would typically send the data to your backend
    // Data includes: rating, feedback, and uploaded images

    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Navigate back to Profile
    navigation.navigate('Profile');
  };

  const removeImage = (indexToRemove) => {
    setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Submit your Feedback</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Rating Section */}
          <View style={styles.ratingSection}>
            <Text style={styles.ratingTitle}>How was your experience ?</Text>
            <StarRating rating={rating} onRatingPress={setRating} />
            {rating > 0 && (
              <Text style={styles.ratingText}>
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </Text>
            )}
          </View>

          {/* Feedback Input Section */}
          <View style={styles.feedbackSection}>
            <TextInput
              style={styles.feedbackInput}
              multiline={true}
              numberOfLines={6}
              placeholder="We Would love to hear your feedback. what was positive .what would you like us to improve?"
              value={feedback}
              onChangeText={setFeedback}
              placeholderTextColor="#5A5A5A"
              textAlignVertical="top"
            />
            <Text style={styles.characterCount}>50 characters</Text>
          </View>

          {/* Photo Upload Section */}
          <View style={styles.photoSection}>
            {/* Uploaded Images Stack */}
            <View style={styles.imageStackContainer}>
              {uploadedImages.length > 0 ? (
                <View style={styles.imageStack}>
                  {uploadedImages.map((image, index) => (
                    <View 
                      key={index} 
                      style={[
                        styles.imageItem,
                        { 
                          zIndex: uploadedImages.length - index,
                          transform: [
                            { translateX: index * 5 },
                            { translateY: index * 5 },
                            { rotate: `${(index % 2 === 0 ? 1 : -1) * index * 2}deg` }
                          ]
                        }
                      ]}
                    >
                      <Image source={{ uri: image.uri }} style={styles.uploadedImage} />
                      <TouchableOpacity 
                        style={styles.removeImageButton}
                        onPress={() => removeImage(index)}
                      >
                        <Text style={styles.removeImageText}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ) : null}
              
              {/* Photo Upload Buttons */}
              <View style={styles.uploadButtonsContainer}>
                <TouchableOpacity style={styles.photoButton} onPress={handleImagePicker}>
                  <View style={styles.photoIcon}>
                    <View style={styles.photoIconRect} />
                    <View style={styles.photoIconCircle} />
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.cameraButton} onPress={handleImagePicker}>
                  <CameraIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
            <Text style={styles.submitButtonText}>Send feedback</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>

      {/* Success Modal */}
      <SuccessModal 
        visible={showSuccessModal} 
        onClose={handleSuccessModalClose} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerSpacer: {
    width: 40,
  },
  backArrowIcon: {
    width: 24,
    height: 24,
  },

  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Rating Section
  ratingSection: {
    alignItems: 'center',
    marginBottom: 40,
    paddingVertical: 20,
  },
  ratingTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#121420',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: -0.07,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  starButton: {
    padding: 4,
    marginHorizontal: 8,
  },
  starText: {
    fontSize: 32,
  },
  starFilled: {
    color: '#FBBC05',
  },
  starEmpty: {
    color: '#E0E0E0',
  },
  ratingText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },

  // Feedback Section
  feedbackSection: {
    marginBottom: 32,
  },
  feedbackInput: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    padding: 20,
    fontSize: 12,
    color: '#5A5A5A',
    backgroundColor: '#FFFFFF',
    minHeight: 240,
    lineHeight: 16,
  },
  characterCount: {
    fontSize: 12,
    color: '#5A5A5A',
    textAlign: 'right',
    marginTop: 8,
    marginRight: 4,
  },

  // Photo Section
  photoSection: {
    marginBottom: 40,
  },
  imageStackContainer: {
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  uploadButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  photoButton: {
    width: 69,
    height: 64,
    borderWidth: 2,
    borderColor: '#CCD2E3',
    borderStyle: 'dashed',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoIcon: {
    width: 35,
    height: 35,
    position: 'relative',
  },
  photoIconRect: {
    position: 'absolute',
    top: 6,
    left: 0,
    width: 27,
    height: 21,
    borderWidth: 2,
    borderColor: '#CCD2E3',
    borderRadius: 4,
  },
  photoIconCircle: {
    position: 'absolute',
    top: 0,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCD2E3',
  },
  imageStack: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  imageItem: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraButton: {
    width: 69,
    height: 64,
    borderWidth: 2,
    borderColor: '#CCD2E3',
    borderStyle: 'dashed',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButtonWithImages: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    minWidth: 80,
    padding: 12,
    borderStyle: 'solid',
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  cameraIconContainer: {
    width: 33,
    height: 33,
    position: 'relative',
  },
  cameraBody: {
    position: 'absolute',
    top: 7,
    left: 0,
    width: 28,
    height: 20,
    borderWidth: 2,
    borderColor: '#CCD2E3',
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  cameraLens: {
    position: 'absolute',
    top: 11,
    left: 8,
    width: 11,
    height: 11,
    borderWidth: 2,
    borderColor: '#CCD2E3',
    borderRadius: 5.5,
    backgroundColor: 'transparent',
  },
  cameraFlash: {
    position: 'absolute',
    top: 0,
    right: 6,
    width: 8,
    height: 8,
    backgroundColor: '#CCD2E3',
    borderRadius: 4,
  },
  cameraButtonText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },

  // Submit Button
  submitButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 32,
    maxWidth: 320,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmark: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  doneButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 32,
    minWidth: 120,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default LoveUsRateUs;
