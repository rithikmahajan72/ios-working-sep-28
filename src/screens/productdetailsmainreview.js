import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '../constants';
import BottomNavigationBar from '../components/bottomnavigationbar';

const { width } = Dimensions.get('window');

const ProductDetailsMainReview = ({ navigation, route }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const BackIcon = () => (
    <View style={styles.backIcon}>
      <View style={styles.backArrow} />
    </View>
  );

  const SearchIcon = () => (
    <View style={styles.searchIcon}>
      <View style={styles.searchCircle} />
      <View style={styles.searchHandle} />
    </View>
  );

  const StarIcon = ({ filled = true, size = 'small' }) => (
    <View style={[styles.starIcon, size === 'large' && styles.starIconLarge]}>
      <View style={[styles.star, filled && styles.starFilled, size === 'large' && styles.starLarge]} />
    </View>
  );

  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleTabChange = (tabName) => {
    if (navigation) {
      navigation.navigate(tabName);
    }
  };

  const filterOptions = ['All', 'Photos', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      date: 'April 15, 2024',
      rating: 5,
      title: 'Extremely comfortable!',
      content: 'These socks are incredibly comfortable and perfect for my daily workouts. The cushioning is just right and they stay in place all day. Highly recommend!',
      helpful: 12,
      verified: true,
    },
    {
      id: 2,
      name: 'Mike Chen',
      date: 'April 10, 2024',
      rating: 4,
      title: 'Good quality, runs a bit large',
      content: 'Great quality socks with good cushioning. Only complaint is they run a bit larger than expected. Would recommend sizing down.',
      helpful: 8,
      verified: true,
    },
    {
      id: 3,
      name: 'Emma Wilson',
      date: 'April 8, 2024',
      rating: 5,
      title: 'Perfect for running',
      content: 'Bought these for running and they are fantastic. No blisters, great moisture wicking, and very durable. Will definitely buy again.',
      helpful: 15,
      verified: true,
    },
    {
      id: 4,
      name: 'Alex Rodriguez',
      date: 'April 5, 2024',
      rating: 4,
      title: 'Solid everyday socks',
      content: 'These are my go-to socks now. Comfortable for all-day wear and wash well. The 3-pack is a great value.',
      helpful: 6,
      verified: false,
    },
  ];

  const renderReviewItem = (review) => (
    <View key={review.id} style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{review.name.charAt(0)}</Text>
          </View>
          <View style={styles.reviewerDetails}>
            <View style={styles.nameAndVerified}>
              <Text style={styles.reviewerName}>{review.name}</Text>
              {review.verified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓</Text>
                </View>
              )}
            </View>
            <Text style={styles.reviewDate}>{review.date}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon key={star} filled={star <= review.rating} />
          ))}
        </View>
      </View>
      
      <Text style={styles.reviewTitle}>{review.title}</Text>
      <Text style={styles.reviewContent}>{review.content}</Text>
      
      <View style={styles.reviewFooter}>
        <TouchableOpacity style={styles.helpfulButton}>
          <Text style={styles.helpfulText}>Helpful ({review.helpful})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* System Bar */}
      <View style={styles.systemBar}>
        <Text style={styles.systemTime}>9:41</Text>
        <View style={styles.systemIcons}>
          <View style={styles.signalIcon} />
          <View style={styles.wifiIcon} />
          <View style={styles.batteryIcon} />
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBackPress}>
          <BackIcon />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Reviews</Text>
        
        <TouchableOpacity style={styles.headerButton}>
          <SearchIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Overall Rating Section */}
        <View style={styles.overallRatingContainer}>
          <View style={styles.leftRatingScore}>
            <Text style={styles.ratingScoreMain}>4.5</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} filled={star <= 4} size="large" />
              ))}
            </View>
            <Text style={styles.totalReviews}>Based on 20 reviews</Text>
          </View>
          
          <View style={styles.rightRatingScore}>
            <Text style={styles.recommendPercent}>91%</Text>
            <Text style={styles.recommendText}>of customers recommend{'\n'}this product</Text>
          </View>
        </View>

        {/* Rating Breakdown */}
        <View style={styles.ratingBreakdown}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <View key={rating} style={styles.ratingRow}>
              <Text style={styles.ratingNumber}>{rating}</Text>
              <StarIcon filled={true} />
              <View style={styles.ratingBarBackground}>
                <View 
                  style={[
                    styles.ratingBarFill, 
                    { width: `${rating === 5 ? 70 : rating === 4 ? 21 : rating === 3 ? 6 : rating === 2 ? 2 : 1}%` }
                  ]} 
                />
              </View>
              <Text style={styles.ratingCount}>
                {rating === 5 ? '14' : rating === 4 ? '4' : rating === 3 ? '1' : rating === 2 ? '1' : '0'}
              </Text>
            </View>
          ))}
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {filterOptions.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.filterButtonActive
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextActive
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Reviews List */}
        <View style={styles.reviewsList}>
          {reviews.map(renderReviewItem)}
        </View>

        {/* Write Review Button */}
        <TouchableOpacity 
          style={styles.writeReviewButton}
          onPress={() => navigation.navigate('ProductDetailsReviewThreePointSelection', {
            order: route?.params?.order // Pass order data if it exists
          })}
        >
          <Text style={styles.writeReviewText}>Write a Review</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigationBar 
        activeTab="Home" 
        onTabChange={handleTabChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // System Bar
  systemBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 21,
    paddingTop: 17,
    height: 39,
  },
  systemTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'SF Pro Display',
    letterSpacing: -0.28,
  },
  systemIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  signalIcon: {
    width: 17,
    height: 11,
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  wifiIcon: {
    width: 15,
    height: 11,
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  batteryIcon: {
    width: 24,
    height: 11,
    backgroundColor: '#000000',
    borderRadius: 2,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'SF Pro Display',
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
  searchIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#000000',
  },
  searchHandle: {
    width: 6,
    height: 2,
    backgroundColor: '#000000',
    position: 'absolute',
    bottom: 3,
    right: 3,
    transform: [{ rotate: '45deg' }],
  },

  scrollContainer: {
    flex: 1,
  },

  // Overall Rating
  overallRatingContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  leftRatingScore: {
    flex: 1,
    alignItems: 'flex-start',
  },
  ratingScoreMain: {
    fontSize: 48,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'SF Pro Display',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 4,
  },
  totalReviews: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'SF Pro Display',
  },
  rightRatingScore: {
    flex: 1,
    alignItems: 'flex-end',
  },
  recommendPercent: {
    fontSize: 48,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'SF Pro Display',
    marginBottom: 8,
  },
  recommendText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'SF Pro Display',
    textAlign: 'right',
    lineHeight: 20,
  },

  // Rating Breakdown
  ratingBreakdown: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    width: 12,
    marginRight: 8,
  },
  ratingBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  ratingCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    width: 20,
    textAlign: 'right',
  },

  // Star Icons
  starIcon: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starIconLarge: {
    width: 20,
    height: 20,
  },
  star: {
    width: 14,
    height: 14,
    backgroundColor: '#E0E0E0',
    clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
  },
  starLarge: {
    width: 18,
    height: 18,
  },
  starFilled: {
    backgroundColor: '#FFD700',
  },

  // Filter
  filterContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterScroll: {
    paddingHorizontal: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 12,
    backgroundColor: '#FFFFFF',
  },
  filterButtonActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    fontFamily: 'SF Pro Display',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },

  // Reviews
  reviewsList: {
    paddingHorizontal: 20,
  },
  reviewItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  reviewerDetails: {
    flex: 1,
  },
  nameAndVerified: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'SF Pro Display',
    marginRight: 8,
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'SF Pro Display',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'SF Pro Display',
    marginBottom: 8,
  },
  reviewContent: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'SF Pro Display',
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  helpfulButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  helpfulText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'SF Pro Display',
  },

  // Write Review Button
  writeReviewButton: {
    margin: 20,
    paddingVertical: 16,
    borderRadius: 25,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  writeReviewText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'SF Pro Display',
  },
});

export default ProductDetailsMainReview;