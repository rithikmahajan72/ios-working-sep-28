import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  InteractionManager,
  LayoutAnimation,
  Animated,
  PanResponder,
} from 'react-native';
import BottomNavigationBar from '../components/bottomnavigationbar';
import BagQuantitySelectorModalOverlay from './bagquantityselectormodaloverlay';
import BagSizeSelectorModalOverlay from './bagsizeselectormodaloverlay';
import BagSizeSelectorSizeChart from './bagsizeselectorsizechart';
import DeliveryOptionsStepTwoModal from './deliveryoptionsteptwo';
import {
  VisaIcon,
  MasterCardIcon,
  AmexIcon,
  PayPalIcon,
  DiscoverIcon,
  GooglePayIcon,
  ApplePayIcon,
  DinersIcon,
  UnionPayIcon,
  JCBIcon,
  MetroIcon,
  MaestroIcon,
  CaretDownIcon
} from '../assets/icons';

// SwipeableBagItem Component - with swipe-to-delete functionality using PanResponder
const SwipeableBagItem = React.memo(({ item, index, onOpenQuantityModal, onOpenSizeModal, onRemoveItem }) => {
  const translateX = useMemo(() => new Animated.Value(0), []);
  const deleteButtonWidth = 100; // Width of the delete button

  const handleQuantityPress = useCallback(() => {
    onOpenQuantityModal(item, index);
  }, [item, index, onOpenQuantityModal]);

  const handleSizePress = useCallback(() => {
    onOpenSizeModal(item, index);
  }, [item, index, onOpenSizeModal]);

  const handleRemovePress = useCallback(() => {
    // Animate back to original position first
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onRemoveItem(item.id, index);
    });
  }, [item.id, index, onRemoveItem, translateX]);

  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Only respond to horizontal swipes with minimal vertical movement
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
    },
    onPanResponderGrant: () => {
      // Set the current value as offset so animation doesn't jump
      translateX.setOffset(translateX._value);
      translateX.setValue(0);
    },
    onPanResponderMove: (evt, gestureState) => {
      // Only allow left swipe (negative values)
      const newValue = Math.min(0, gestureState.dx);
      translateX.setValue(newValue);
    },
    onPanResponderRelease: (evt, gestureState) => {
      // Flatten the offset
      translateX.flattenOffset();
      
      const { dx, vx } = gestureState;
      
      // Determine if we should reveal the delete button or snap back
      const shouldReveal = dx < -50 || vx < -0.5;
      
      Animated.spring(translateX, {
        toValue: shouldReveal ? -deleteButtonWidth : 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    },
  }), [translateX, deleteButtonWidth]);

  return (
    <View style={styles.swipeableContainer}>
      {/* Delete Button (hidden behind the item) */}
      <View style={styles.deleteButtonContainer}>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleRemovePress}
          accessibilityLabel={`Delete ${item.name} from bag`}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      {/* Main Item Content */}
      <Animated.View 
        style={[
          styles.productContainer,
          styles.swipeableItem,
          { transform: [{ translateX }] }
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.productRow}>
          <View style={styles.productImageContainer}>
            <View style={styles.productImagePlaceholder}>
              {/* Add your product image here */}
              <Text style={styles.imagePlaceholderText}>IMG</Text>
            </View>
          </View>
          <View style={styles.productDetailsContainer}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
            </View>
          </View>
        </View>
        <View style={styles.productActionsContainer}>
          <TouchableOpacity 
            style={styles.quantityContainer}
            onPress={handleQuantityPress}
            accessibilityLabel={`Change quantity for ${item.name}`}
          >
            <Text style={styles.quantityText}>Qty {item.quantity}</Text>
            <CaretDownIcon width={24} height={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.sizeContainer}
            onPress={handleSizePress}
            accessibilityLabel={`Change size for ${item.name}`}
          >
            <Text style={styles.sizeText}>{item.size}</Text>
            <CaretDownIcon width={24} height={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </Animated.View>
    </View>
  );
});

// PromoCodeSection Component - optimized with React.memo
const PromoCodeSection = React.memo(({ onApplyPromo }) => {
  const handleApplyPress = useCallback(() => {
    onApplyPromo?.('COUPON30');
  }, [onApplyPromo]);

  return (
    <View style={styles.voucherContainer}>
      <View style={styles.voucherCard}>
        {/* Main voucher background with perforated edges */}
        <View style={styles.voucherShape}>
          {/* Voucher content */}
          <View style={styles.voucherContent}>
            <Text style={styles.voucherTitle}>30% OFF</Text>
            <Text style={styles.voucherCode}>COUPON30</Text>
            <Text style={styles.voucherDate}>08/08/2023 - 12/08/2023</Text>
          </View>
          
          {/* Dashed divider line */}
          <View style={styles.voucherDivider} />
          
          {/* Apply button */}
          <TouchableOpacity 
            style={styles.voucherApplyButton}
            onPress={handleApplyPress}
            accessibilityLabel="Apply 30% off coupon"
          >
            <Text style={styles.voucherApplyText}>Apply</Text>
          </TouchableOpacity>
        </View>
        
        {/* Left semicircle cutout */}
        <View style={styles.voucherLeftCutout} />
        {/* Right semicircle cutout */}
        <View style={styles.voucherRightCutout} />
      </View>
    </View>
  );
});

const BagScreen = ({ navigation, route }) => {
  // State management with better organization
  const [bagItems, setBagItems] = useState([
    {
      id: 1,
      name: 'Nike Everyday Plus Cushioned',
      description: 'Training Ankle Socks (6 Pairs)\nSize L (W 10-13 / M 8-12)',
      price: 'US$10.00',
      quantity: 1,
      size: 'M',
      image: null,
    },
    {
      id: 2,
      name: 'Nike Everyday Plus Cushioned',
      description: 'Training Ankle Socks (6 Pairs)\nSize L (W 10-13 / M 8-12)',
      price: 'US$10.00',
      quantity: 1,
      size: 'M',
      image: null,
    },
    {
      id: 3,
      name: 'Nike Everyday Plus Cushioned',
      description: 'Training Ankle Socks (6 Pairs)\nSize L (W 10-13 / M 8-12)',
      price: 'US$10.00',
      quantity: 1,
      size: 'M',
      image: null,
    },
    {
      id: 4,
      name: 'Nike Everyday Plus Cushioned',
      description: 'Training Ankle Socks (6 Pairs)\nSize L (W 10-13 / M 8-12)',
      price: 'US$10.00',
      quantity: 1,
      size: 'M',
      image: null,
    },
  ]);

  const [modalStates, setModalStates] = useState({
    promoCodeExpanded: false,
    pointsApplied: false,
    quantityModalVisible: false,
    sizeModalVisible: false,
    sizeChartModalVisible: false,
    deliveryModalVisible: false,
  });

  const [selectedItem, setSelectedItem] = useState(null);

  // Memoized calculations for performance - optimized for better performance
  const bagCalculations = useMemo(() => {
    const subtotal = bagItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('US$', ''));
      return total + (price * item.quantity);
    }, 0);
    
    const shipping = subtotal > 0 ? 5.00 : 0;
    const tax = subtotal * 0.1; // 10% tax
    const discount = modalStates.pointsApplied ? subtotal * 0.1 : 0; // 10% discount if points applied
    const total = subtotal + shipping + tax - discount;
    
    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2),
      itemCount: bagItems.length,
    };
  }, [bagItems, modalStates.pointsApplied]);

  const deliveryInfo = useMemo(() => ({
    dateRange: 'Wed, 11 May to Fri, 13 May',
    location: 'Edit Location',
  }), []);

  const priceBreakdown = useMemo(() => ({
    delivery: 'Standard - Free',
    internationalDelivery: 'Standard - $200',
    promo: 'US$1.0',
    pointsDiscount: modalStates.pointsApplied ? 'US$1.0' : 'US$0.0',
    total: `US$${bagCalculations.total}`,
  }), [bagCalculations.total, modalStates.pointsApplied]);

  // Effect for handling navigation params
  useEffect(() => {
    if (route?.params?.updatedItem) {
      const { updatedItem } = route.params;
      setBagItems(prevItems => 
        prevItems.map(item => 
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    }
  }, [route?.params]);

  // Enhanced navigation handlers
  const handleGoBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  }, [navigation]);

  const handleNavigateToDelivery = useCallback(() => {
    setModalStates(prev => ({ ...prev, deliveryModalVisible: true }));
  }, []);

  const handleCloseDeliveryModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, deliveryModalVisible: false }));
  }, []);

  const handleCheckout = useCallback(() => {
    if (bagItems.length === 0) {
      Alert.alert('Empty Bag', 'Please add items to your bag before checking out.');
      return;
    }
    
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate('DeliveryOptionsStepOneScreen', {
        bagItems,
        totalAmount: bagCalculations.subtotal,
        deliveryInfo,
      });
    });
  }, [navigation, bagItems, bagCalculations.subtotal, deliveryInfo]);

  // Optimized handler functions with better state management
  const handleQuantityChange = useCallback((itemId, newQuantity) => {
    if (newQuantity === 0) {
      setBagItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } else {
      setBagItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }, []);

  const handleRemoveItem = useCallback((itemId, index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setBagItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, []);

  const handleOpenQuantityModal = useCallback((item, index) => {
    setSelectedItem(item);
    setModalStates(prev => ({ ...prev, quantityModalVisible: true }));
  }, []);

  const handleCloseQuantityModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, quantityModalVisible: false }));
    setSelectedItem(null);
  }, []);

  const handleSizeChange = useCallback((itemId, newSize) => {
    setBagItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, size: newSize } : item
      )
    );
  }, []);

  const handleOpenSizeModal = useCallback((item, index) => {
    setSelectedItem(item);
    setModalStates(prev => ({ ...prev, sizeModalVisible: true }));
  }, []);

  const handleCloseSizeModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, sizeModalVisible: false }));
    setSelectedItem(null);
  }, []);

  const handleOpenSizeChart = useCallback(() => {
    setModalStates(prev => ({ ...prev, sizeChartModalVisible: true }));
  }, []);

  const handleCloseSizeChart = useCallback(() => {
    setModalStates(prev => ({ ...prev, sizeChartModalVisible: false }));
  }, []);

  const togglePromoCode = useCallback(() => {
    setModalStates(prev => ({ ...prev, promoCodeExpanded: !prev.promoCodeExpanded }));
  }, []);

  const togglePoints = useCallback(() => {
    setModalStates(prev => ({ ...prev, pointsApplied: !prev.pointsApplied }));
  }, []);

  const handleApplyPromo = useCallback((promoCode) => {
    Alert.alert('Promo Applied', `${promoCode} has been applied to your order.`);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bag</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Empty Bag State */}
        {bagItems.length === 0 ? (
          <View style={styles.emptyBagContainer}>
            <Text style={styles.emptyBagTitle}>Your bag is empty</Text>
            <Text style={styles.emptyBagSubtitle}>Add some items to get started</Text>
            <TouchableOpacity 
              style={styles.continueShoppingButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.continueShoppingText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Bag Items - Optimized rendering with swipe-to-delete */}
            {bagItems.map((item, index) => (
              <SwipeableBagItem 
                key={`bag-item-${item.id}`}
                item={item} 
                index={index}
                onOpenQuantityModal={handleOpenQuantityModal}
                onOpenSizeModal={handleOpenSizeModal}
                onRemoveItem={handleRemoveItem}
              />
            ))}

            {/* Delivery Information */}
            <View style={styles.deliveryContainer}>
              <Text style={styles.deliveryTitle}>Delivery</Text>
              <Text style={styles.deliveryDate}>Arrives {deliveryInfo.dateRange}</Text>
              <View style={styles.deliveryLocationContainer}>
                <Text style={styles.deliveryLocationText}>to Fri, 13 May</Text>
                <TouchableOpacity 
                  onPress={handleNavigateToDelivery}
                  accessibilityLabel="Edit delivery location"
                >
                  <Text style={styles.editLocationText}>{deliveryInfo.location}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Apply Points Section */}
            <View style={styles.applyPointsContainer}>
              <View style={styles.pointsRow}>
                <TouchableOpacity 
                  style={styles.pointsCheckbox}
                  onPress={togglePoints}
                >
                  {modalStates.pointsApplied && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
                <View style={styles.pointsIcon}>
                  <Text style={styles.pointsIconText}>⚡</Text>
                </View>
                <Text style={styles.pointsText}>Apply Points</Text>
              </View>
              <Text style={styles.availablePoints}>Available Points: 100</Text>
            </View>

            {/* Promo Code Section */}
            <TouchableOpacity 
              style={styles.promoToggleContainer}
              onPress={togglePromoCode}
            >
              <Text style={styles.promoToggleText}>Have a Promo Code?</Text>
              <Text style={styles.promoToggleIcon}>+</Text>
            </TouchableOpacity>

            {modalStates.promoCodeExpanded && <PromoCodeSection onApplyPromo={handleApplyPromo} />}

            {/* Price Breakdown */}
            <View style={styles.priceBreakdownContainer}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery</Text>
            <Text style={styles.priceValue}>{priceBreakdown.delivery}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>International Delivery</Text>
            <Text style={styles.priceValue}>{priceBreakdown.internationalDelivery}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Promo</Text>
            <Text style={styles.priceValue}>{priceBreakdown.promo}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Points Discount</Text>
            <Text style={styles.priceValue}>{priceBreakdown.pointsDiscount}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{priceBreakdown.total}</Text>
          </View>
        </View>

        {/* Payment Icons */}
        <View style={styles.paymentIconsContainer}>
          <View style={styles.paymentIconsRow}>
            <VisaIcon width={24} height={14} />
            <MasterCardIcon width={24} height={14} />
            <AmexIcon width={24} height={14} />
            <PayPalIcon width={24} height={14} />
            <DiscoverIcon width={24} height={14} />
            <GooglePayIcon width={24} height={14} />
            <ApplePayIcon width={24} height={14} />
            <DinersIcon width={24} height={14} />
            <UnionPayIcon width={24} height={14} />
            <JCBIcon width={24} height={14} />
            <MetroIcon width={24} height={14} />
            <MaestroIcon width={24} height={14} />
            <Text style={styles.codText}>COD</Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
          </>
        )}
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.checkoutContainer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigationBar activeTab="Home" />

      {/* Quantity Selector Modal */}
      <BagQuantitySelectorModalOverlay
        visible={modalStates.quantityModalVisible}
        onClose={handleCloseQuantityModal}
        item={selectedItem}
        onQuantityChange={handleQuantityChange}
      />

      {/* Size Selector Modal */}
      <BagSizeSelectorModalOverlay
        visible={modalStates.sizeModalVisible}
        onClose={handleCloseSizeModal}
        item={selectedItem}
        onSizeChange={handleSizeChange}
        onSizeChartPress={() => {
          Alert.alert('Test', 'Inline onSizeChartPress called!');
          handleOpenSizeChart();
        }}
      />

      {/* Size Chart Modal */}
      <BagSizeSelectorSizeChart
        key={`size-chart-${modalStates.sizeChartModalVisible}`}
        visible={modalStates.sizeChartModalVisible}
        onClose={handleCloseSizeChart}
      />

      {/* Delivery Options Modal */}
      <DeliveryOptionsStepTwoModal
        visible={modalStates.deliveryModalVisible}
        onClose={handleCloseDeliveryModal}
        navigation={navigation}
        selectedDeliveryOption="standard"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 0, // Remove default padding
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    height: 94, // 54px top padding + 24px content + 16px bottom
  },
  backButton: {
    width: 68,
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    letterSpacing: -0.4,
    fontFamily: 'Montserrat',
  },
  headerRight: {
    width: 68,
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 0, // Remove padding to start right after header
  },
  productContainer: {
    paddingHorizontal: 16, // Changed from 24 to 16 to match Figma
    paddingTop: 24,
    paddingBottom: 0,
  },
  productRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
    marginBottom: 16, // Added spacing between product and actions
  },
  productImageContainer: {
    flex: 1,
  },
  productImagePlaceholder: {
    height: 154,
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#999999',
    fontSize: 16,
  },
  productDetailsContainer: {
    flex: 1,
    paddingTop: 0, // Removed top padding
  },
  productInfo: {
    gap: 3,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.14,
    lineHeight: 16.8,
    fontFamily: 'Montserrat',
  },
  productDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#767676',
    letterSpacing: -0.14,
    lineHeight: 16.8,
    fontFamily: 'Montserrat',
  },
  removeButton: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FF3B30',
    textDecorationLine: 'underline',
  },
  productActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 24,
    paddingHorizontal: 16, // Match the product container padding
    marginBottom: 0, // Remove bottom margin
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // Match Figma gap
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 19.2,
    fontFamily: 'Montserrat',
  },
  dropdownButton: {
    padding: 4,
  },
  sizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // Match Figma gap
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 19.2,
    fontFamily: 'Montserrat',
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'right',
    lineHeight: 19.2,
    fontFamily: 'Montserrat',
  },
  deliveryContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 8,
    marginTop: 16, // Add spacing after products
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 19.2,
    fontFamily: 'Montserrat',
  },
  deliveryDate: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: -0.4,
    lineHeight: 16,
    fontFamily: 'Montserrat',
  },
  deliveryLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deliveryLocationText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: -0.4,
    lineHeight: 16,
    fontFamily: 'Montserrat',
  },
  editLocationText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textDecorationLine: 'underline',
    letterSpacing: -0.4,
    lineHeight: 16,
    fontFamily: 'Montserrat',
  },
  applyPointsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E4E4E4',
    height: 64, // Fixed height to match Figma
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  pointsCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#BCBCBC',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 12,
    color: '#111111',
  },
  pointsIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 17.371,
    height: 26.974,
  },
  pointsIconText: {
    fontSize: 16,
    color: '#848688',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.4,
    lineHeight: 16,
    fontFamily: 'Montserrat',
  },
  availablePoints: {
    fontSize: 10,
    fontWeight: '400',
    color: '#6C6C6C',
    lineHeight: 12,
    marginLeft: 28, // Adjusted to match Figma positioning
    fontFamily: 'Montserrat',
  },
  promoToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12, // Reduced padding
    borderTopWidth: 1,
    borderTopColor: '#E4E4E4',
    height: 64, // Fixed height to match Figma
  },
  promoToggleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.4,
    fontFamily: 'Montserrat',
  },
  promoToggleIcon: {
    fontSize: 14,
    color: '#000000',
    width: 14,
    height: 14,
  },
  // Replace the old promo code styles with voucher styles
  voucherContainer: {
    paddingHorizontal: 16,
    paddingVertical: 0,
    marginTop: 0,
  },
  voucherCard: {
    height: 137,
    alignSelf: 'center',
    position: 'relative',
    marginHorizontal: 8,
    maxWidth: 345,
    width: '100%',
  },
  voucherShape: {
    backgroundColor: '#F6F6F6',
    height: 137,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    marginHorizontal: 10, // Space for the cutouts
  },
  voucherContent: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  voucherTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#1F2937', // Neutral-800 equivalent
    lineHeight: 25,
    fontFamily: 'Montserrat',
    position: 'absolute',
    left: 24,
    top: 14,
  },
  voucherCode: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6C6C6C', // Neutral-80
    fontFamily: 'Montserrat',
    position: 'absolute',
    left: 24,
    top: 49,
  },
  voucherDate: {
    fontSize: 10,
    fontWeight: '400',
    color: '#6C6C6C', // Neutral-80
    fontFamily: 'Montserrat',
    position: 'absolute',
    right: 52,
    top: 16,
  },
  voucherDivider: {
    position: 'absolute',
    left: 0.5,
    right: 0.5,
    top: 84, // Half of 137 height + 16.5 offset
    height: 1,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: '#000000',
    borderStyle: 'dashed',
  },
  voucherApplyButton: {
    position: 'absolute',
    bottom: 28,
    alignSelf: 'center',
    left: '50%',
    transform: [{ translateX: -23.5 }],
  },
  voucherApplyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7F7F7F', // Neutral-70
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
  voucherLeftCutout: {
    position: 'absolute',
    left: -10,
    top: '50%',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginTop: -10,
    zIndex: 10,
  },
  voucherRightCutout: {
    position: 'absolute',
    right: -10,
    top: '50%',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginTop: -10,
    zIndex: 10,
  },
  priceBreakdownContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 10,
    marginTop: 8, // Add spacing after voucher
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#767676',
    letterSpacing: -0.4,
    lineHeight: 16,
    fontFamily: 'Montserrat',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#767676',
    textAlign: 'right',
    letterSpacing: -0.32,
    lineHeight: 16,
    fontFamily: 'Montserrat',
  },
  totalRow: {
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 19.2,
    fontFamily: 'Montserrat',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'right',
    lineHeight: 19.2,
    fontFamily: 'Montserrat',
  },
  paymentIconsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginBottom: 16, // Add spacing before checkout
  },
  paymentIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  codText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#848688',
    letterSpacing: -0.25,
    marginLeft: 8,
    fontFamily: 'Montserrat',
  },
  bottomSpacing: {
    height: 80, // Reduced spacing
  },
  checkoutContainer: {
    paddingHorizontal: 22,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0, // Remove any border
  },
  checkoutButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 51,
    alignItems: 'center',
    justifyContent: 'center',
    width: 331, // Fixed width to match Figma
    alignSelf: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 19.2,
    fontFamily: 'Montserrat',
  },
  // Empty bag styles
  emptyBagContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  emptyBagTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
  emptyBagSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#767676',
    marginBottom: 32,
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
  continueShoppingButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueShoppingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 19.2,
    fontFamily: 'Montserrat',
  },
  // Swipe-to-delete styles
  swipeableContainer: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  deleteButtonContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1A1A1', // Pink background as shown in Figma
    zIndex: 1,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#CA3327', // Red text color as shown in Figma
    fontFamily: 'Montserrat',
  },
  swipeableItem: {
    backgroundColor: '#FFFFFF',
    zIndex: 2,
  },
});

export default React.memo(BagScreen);
