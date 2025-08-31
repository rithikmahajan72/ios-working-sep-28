import React, { useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import TrackingModal from './orderstrackmodeloverlay';
import CancelOrderRequest from './orderscancelordermodal';
import CancelledOrderConfirm from './orderscancelorderconfirmationmodal';

const OrdersScreen = ({ navigation, route }) => {
  // Memoized order data to prevent recreation on each render
  const mockOrders = useMemo(() => [
  {
    id: '1',
    status: 'delivered',
    statusColor: '#32862B',
    productName: 'Nike Everyday Plus Cushioned',
    productDescription: 'Training Crew Socks Mystic Navy/Worn Blue/Worn Bl...',
    size: 'Size L (W 10-13 / M 8-12)',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop',
    actions: [
      { id: 'buy_again', title: 'Buy It Again', style: 'primary' },
      { id: 'return_exchange', title: 'Return/Exchange', style: 'secondary' },
      { id: 'rate_product', title: 'Rate your product', style: 'secondary' }
    ]
  },
  {
    id: '2',
    status: 'confirmed',
    statusColor: '#32862B',
    productName: 'Nike Everyday Plus Cushioned',
    productDescription: 'Training Crew Socks Mystic Navy/Worn Blue/Worn Bl...',
    size: 'Size L (W 10-13 / M 8-12)',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop',
    actions: [
      { id: 'track', title: 'Track', style: 'primary' }
    ]
  },
  {
    id: '3',
    status: 'canceled',
    statusColor: '#EA4335',
    productName: 'Nike Everyday Plus Cushioned',
    productDescription: 'Training Crew Socks Mystic Navy/Worn Blue/Worn Bl...',
    size: 'Size L (W 10-13 / M 8-12)',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop',
    actions: []
  },
  {
    id: '4',
    status: 'exchange_requested',
    statusColor: '#FBBC05',
    productName: 'Nike Everyday Plus Cushioned',
    productDescription: 'Training Crew Socks Mystic Navy/Worn Blue/Worn Bl...',
    size: 'Size L (W 10-13 / M 8-12)',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop',
    actions: [
      { id: 'cancel_order', title: 'Cancel Order', style: 'secondary' }
    ]
  }
  ], []); // End of useMemo

  const getStatusText = useCallback((status) => {
    switch (status) {
    case 'delivered':
      return 'Order delivered';
    case 'confirmed':
      return 'Order confirmed';
    case 'canceled':
      return 'Order canceled';
    case 'exchange_requested':
      return 'Exchange Requeted';
    default:
      return status;
  }
  }, []); // End of useCallback

  const OrderCard = useCallback(({ order, onTrack, onCancelOrder, navigation: nav }) => (
  <View style={styles.orderContainer}>
    <View style={styles.productContainer}>
      <Image source={{ uri: order.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={[styles.statusText, { color: order.statusColor }]}>
          {getStatusText(order.status)}
        </Text>
        <Text style={styles.productName}>{order.productName}</Text>
        <Text style={styles.productDescription}>{order.productDescription}</Text>
        <Text style={styles.productSize}>{order.size}</Text>
      </View>
    </View>
    
    {order.actions.map((action, index) => (
      <TouchableOpacity
        key={action.id}
        style={[
          styles.actionButton,
          action.style === 'primary' ? styles.primaryButton : styles.secondaryButton,
          index > 0 ? styles.actionButtonWithMargin : null
        ]}
        onPress={() => {
          if (action.id === 'track') {
            onTrack(order);
          } else if (action.id === 'return_exchange') {
            navigation?.navigate('OrdersReturnExchange', { order });
          } else if (action.id === 'cancel_order') {
            onCancelOrder(order);
          } else if (action.id === 'rate_product') {
            navigation?.navigate('ProductDetailsMainReview', { order });
          } else if (action.id === 'buy_again') {
            navigation?.navigate('ProductDetailsMain', { order });
          } else {
          }
        }}
        activeOpacity={0.8}
      >
        <Text style={[
          styles.buttonText,
          action.style === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText
        ]}>
          {action.title}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
  ), [getStatusText, navigation]); // End of OrderCard useCallback

  const trackingModalRef = useRef(null);
  const cancelOrderModalRef = useRef(null);
  const cancelConfirmationModalRef = useRef(null);

  // Get the previous screen from route params
  const previousScreen = route?.params?.previousScreen;

  // Custom back handler
  const handleBackPress = useCallback(() => {
    if (previousScreen === 'OrderConfirmationPhone') {
      navigation.navigate('OrderConfirmationPhone');
    } else {
      navigation?.goBack();
    }
  }, [previousScreen, navigation]);

  // Mock tracking data - you can replace this with actual API data
  const getTrackingData = useCallback((order) => {
    // Mock tracking data based on order status
    if (order.status === 'confirmed') {
      return [
        { status: "Packing", location: "Warehouse Mumbai", timestamp: "2024-01-15 10:30 AM" },
        { status: "Picked", location: "Courier Hub Mumbai", timestamp: "2024-01-15 02:45 PM" },
      ];
    } else if (order.status === 'delivered') {
      return [
        { status: "Packing", location: "Warehouse Mumbai", timestamp: "2024-01-15 10:30 AM" },
        { status: "Picked", location: "Courier Hub Mumbai", timestamp: "2024-01-15 02:45 PM" },
        { status: "In Transit", location: "In Transit to Delhi", timestamp: "2024-01-16 08:00 AM" },
        { status: "Delivered", location: "Delivered to Customer", timestamp: "2024-01-17 11:30 AM" },
      ];
    }
    return [];
  }, []); // End of getTrackingData useCallback

  const handleTrackOrder = useCallback((order) => {
    const trackingData = getTrackingData(order);
    trackingModalRef.current?.openModal(trackingData);
  }, [getTrackingData]);

  const handleCancelOrder = (order) => {
    cancelOrderModalRef.current?.open();
  };

  const handleCancelOrderConfirmed = () => {
    // Open the confirmation modal
    cancelConfirmationModalRef.current?.open();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders</Text>
        <View style={styles.searchContainer}>
          {/* Empty view for layout balance */}
        </View>
      </View>

      {/* Orders List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {mockOrders.map((order) => (
          <OrderCard 
            key={order.id} 
            order={order} 
            onTrack={handleTrackOrder}
            onCancelOrder={handleCancelOrder}
            navigation={navigation}
          />
        ))}
      </ScrollView>

      {/* Tracking Modal */}
      <TrackingModal ref={trackingModalRef} />
      
      {/* Cancel Order Modal */}
      <CancelOrderRequest 
        ref={cancelOrderModalRef} 
        onRequestConfirmed={handleCancelOrderConfirmed}
      />
      
      {/* Cancel Order Confirmation Modal */}
      <CancelledOrderConfirm ref={cancelConfirmationModalRef} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 68,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '300',
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
  searchContainer: {
    width: 68,
    height: 24,
    opacity: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  orderContainer: {
    marginBottom: 24,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  productImage: {
    width: 140,
    height: 140,
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 3,
    letterSpacing: -0.14,
    fontFamily: 'Montserrat-Medium',
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -0.14,
    fontFamily: 'Montserrat-Medium',
  },
  productDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#767676',
    lineHeight: 16.8,
    marginBottom: 4,
    letterSpacing: -0.14,
    fontFamily: 'Montserrat-Regular',
  },
  productSize: {
    fontSize: 14,
    fontWeight: '400',
    color: '#767676',
    lineHeight: 16.8,
    letterSpacing: -0.14,
    fontFamily: 'Montserrat-Regular',
  },
  actionButton: {
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 51,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonWithMargin: {
    marginTop: 12,
  },
  primaryButton: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#000000',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E4E4E4',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#000000',
  },
});

export default React.memo(OrdersScreen);
