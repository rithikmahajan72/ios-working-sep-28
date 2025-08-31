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
import { Colors } from '../constants/colors';

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
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
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
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backIcon: {
    fontSize: 24,
    color: Colors.black,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  thankYouSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  checkmarkContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.success || '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkmark: {
    fontSize: 32,
    color: Colors.white,
    fontWeight: 'bold',
  },
  thankYouTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  thankYouSubtitle: {
    fontSize: 16,
    color: Colors.gray600,
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: Colors.gray600,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemImageContainer: {
    marginRight: 16,
  },
  itemImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: Colors.gray200,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 4,
  },
  itemSpecs: {
    fontSize: 14,
    color: Colors.gray600,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
  itemQuantity: {
    fontSize: 14,
    color: Colors.gray600,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
  },
  viewOrderButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
  },
  viewOrderButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
  placeOrderButton: {
    backgroundColor: Colors.black,
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  infoText: {
    fontSize: 14,
    color: Colors.gray600,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default OrderConfirmationPhone;
