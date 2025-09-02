import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';

const OrderConfirmationPhone = ({ navigation }) => {
  const handleViewOrder = () => {
    // Navigate to order management screen
    if (navigation) {
      navigation.navigate('Orders', { previousScreen: 'OrderConfirmationPhone' });
    }
  };

  const handlePlaceOrder = () => {
    // Navigate to the final Figma design (node 4003:5758)
    if (navigation) {
      navigation.navigate('FinalOrderScreen'); // This will be implemented next
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Confirmation</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Thank You Section */}
        <View style={styles.thankYouSection}>
          <View style={styles.checkmarkContainer}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
          <Text style={styles.thankYouTitle}>Thank You For Your Order!</Text>
          <Text style={styles.thankYouSubtitle}>
            Your order has been placed and is being processed.
          </Text>
        </View>

        {/* Order Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          
          {/* Order Number */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order Number:</Text>
            <Text style={styles.detailValue}>#YOR2024001</Text>
          </View>
          
          {/* Estimated Delivery */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Estimated Delivery:</Text>
            <Text style={styles.detailValue}>Wed, 11 May - Fri, 13 May</Text>
          </View>
          
          {/* Delivery Address */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Delivery Address:</Text>
            <Text style={styles.detailValue}>
              John Smith{'\n'}
              2950 S 108th St{'\n'}
              West Allis, United States
            </Text>
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Method:</Text>
            <Text style={styles.detailValue}>Credit Card (**** 1234)</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Subtotal:</Text>
            <Text style={styles.detailValue}>$149.99</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Delivery:</Text>
            <Text style={styles.detailValue}>Free</Text>
          </View>
          
          <View style={[styles.detailRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>$149.99</Text>
          </View>
        </View>

        {/* Items Ordered */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items Ordered</Text>
          
          <View style={styles.itemRow}>
            <View style={styles.itemImageContainer}>
              <View style={styles.itemImagePlaceholder} />
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>Premium Cotton T-Shirt</Text>
              <Text style={styles.itemSpecs}>Size: M, Color: Black</Text>
              <Text style={styles.itemPrice}>$149.99</Text>
            </View>
            <Text style={styles.itemQuantity}>Qty: 1</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.viewOrderButton} onPress={handleViewOrder}>
            <Text style={styles.viewOrderButtonText}>View or Manage Order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            You will receive a confirmation email shortly with your order details and tracking information.
          </Text>
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: 12,
  },
  backIcon: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    flex: 1,
    fontFamily: 'Montserrat-Medium',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  thankYouSection: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  checkmarkContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  checkmark: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  thankYouTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  thankYouSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Montserrat-Regular',
    maxWidth: 300,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    minHeight: 20,
  },
  detailLabel: {
    fontSize: 16,
    color: '#8E8E93',
    flex: 1,
    fontFamily: 'Montserrat-Regular',
  },
  detailValue: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
    fontFamily: 'Montserrat-Medium',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 16,
    marginTop: 16,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  itemImageContainer: {
    marginRight: 16,
  },
  itemImagePlaceholder: {
    width: 72,
    height: 72,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
    marginRight: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
    fontFamily: 'Montserrat-Medium',
  },
  itemSpecs: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 6,
    fontFamily: 'Montserrat-Regular',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 24,
    gap: 16,
  },
  viewOrderButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
  },
  viewOrderButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },
  placeOrderButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
  },
  infoText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'Montserrat-Regular',
  },
});

export default OrderConfirmationPhone;
