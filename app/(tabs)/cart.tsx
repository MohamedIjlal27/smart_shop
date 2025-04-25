import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Gift, ShoppingBag, CircleAlert as AlertCircle, ChevronRight } from 'lucide-react-native';
import CartItem from '../../components/CartItem';
import { useCart } from '../../context/CartContext';

interface CartItem {
  product: {
    id: string;
  };
}

export default function CartScreen() {
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    cartTotal,
    cartItemsCount,
    pointsToEarn,
  } = useCart();
  
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);
  const [loyaltyPointsUsed, setLoyaltyPointsUsed] = useState(0);
  
  const availableLoyaltyPoints: number = 500; // This would come from user data in a real app
  
  const discount = promoCodeApplied ? Math.round(cartTotal * 0.1) : 0; // 10% discount
  const loyaltyDiscount = loyaltyPointsUsed; // 1 point = 1 rupee discount
  const deliveryFee = cartTotal > 10000 ? 0 : 300;
  const totalPayable = cartTotal - discount - loyaltyDiscount + deliveryFee;

  const handleIncrementItem = (item: CartItem) => {
    incrementQuantity(item.product.id);
  };

  const handleDecrementItem = (item: CartItem) => {
    decrementQuantity(item.product.id);
  };

  const handleRemoveItem = (item: CartItem) => {
    removeFromCart(item.product.id);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'smart10') {
      setPromoCodeApplied(true);
    }
  };

  const applyLoyaltyPoints = () => {
    // Use all available points or up to the cart total
    const pointsToUse = Math.min(availableLoyaltyPoints, cartTotal);
    setLoyaltyPointsUsed(pointsToUse);
  };

  const resetLoyaltyPoints = () => {
    setLoyaltyPointsUsed(0);
  };

  const proceedToCheckout = () => {
    console.log('Proceeding to checkout with total:', totalPayable);
    // Navigate to checkout screen (will be implemented)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <View style={styles.cartCountContainer}>
          <ShoppingBag size={18} color="#0A2463" />
          <Text style={styles.cartCount}>{cartItemsCount}</Text>
        </View>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <ShoppingBag size={64} color="#CCC" />
          <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
          <Text style={styles.emptyCartText}>
            Looks like you haven't added any products to your cart yet.
          </Text>
          <TouchableOpacity style={styles.shopNowButton}>
            <Text style={styles.shopNowButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView style={styles.cartItemsContainer}>
            {cartItems.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onIncrement={handleIncrementItem}
                onDecrement={handleDecrementItem}
                onRemove={handleRemoveItem}
              />
            ))}
            
            <View style={styles.promoContainer}>
              <View style={styles.promoHeader}>
                <Gift size={20} color="#0A2463" />
                <Text style={styles.promoTitle}>Promo Code</Text>
              </View>
              
              {promoCodeApplied ? (
                <View style={styles.appliedPromoContainer}>
                  <Text style={styles.appliedPromoText}>SMART10 applied (10% off)</Text>
                  <TouchableOpacity onPress={() => setPromoCodeApplied(false)}>
                    <Text style={styles.removePromoText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.promoInputContainer}>
                  <TextInput
                    style={styles.promoInput}
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChangeText={setPromoCode}
                  />
                  <TouchableOpacity
                    style={styles.applyButton}
                    onPress={applyPromoCode}
                    disabled={!promoCode}
                  >
                    <Text style={[styles.applyButtonText, !promoCode && styles.disabledText]}>
                      Apply
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            
            <View style={styles.loyaltyContainer}>
              <View style={styles.loyaltyHeader}>
                <Gift size={20} color="#F9A826" />
                <Text style={styles.loyaltyTitle}>Loyalty Points</Text>
              </View>
              
              <View style={styles.loyaltyBalanceContainer}>
                <Text style={styles.loyaltyBalanceText}>
                  Available Points: <Text style={styles.loyaltyBalanceValue}>{availableLoyaltyPoints}</Text>
                </Text>
                
                {loyaltyPointsUsed > 0 ? (
                  <View style={styles.appliedLoyaltyContainer}>
                    <Text style={styles.appliedLoyaltyText}>
                      {loyaltyPointsUsed} points applied (Rs. {loyaltyPointsUsed} off)
                    </Text>
                    <TouchableOpacity onPress={resetLoyaltyPoints}>
                      <Text style={styles.removeLoyaltyText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.useLoyaltyButton}
                    onPress={applyLoyaltyPoints}
                    disabled={availableLoyaltyPoints === 0}
                  >
                    <Text style={styles.useLoyaltyButtonText}>Use Points</Text>
                  </TouchableOpacity>
                )}
              </View>
              
              <View style={styles.earnPointsContainer}>
                <AlertCircle size={16} color="#0A2463" />
                <Text style={styles.earnPointsText}>
                  You'll earn <Text style={styles.pointsHighlight}>{pointsToEarn} points</Text> with this purchase
                </Text>
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>Rs. {cartTotal.toLocaleString()}</Text>
            </View>
            
            {discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Discount</Text>
                <Text style={styles.discountValue}>- Rs. {discount.toLocaleString()}</Text>
              </View>
            )}
            
            {loyaltyPointsUsed > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Loyalty Discount</Text>
                <Text style={styles.discountValue}>- Rs. {loyaltyPointsUsed.toLocaleString()}</Text>
              </View>
            )}
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              {deliveryFee === 0 ? (
                <Text style={styles.freeDelivery}>FREE</Text>
              ) : (
                <Text style={styles.summaryValue}>Rs. {deliveryFee.toLocaleString()}</Text>
              )}
            </View>
            
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>Rs. {totalPayable.toLocaleString()}</Text>
            </View>
            
            <TouchableOpacity style={styles.checkoutButton} onPress={proceedToCheckout}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              <ChevronRight size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#0A2463',
  },
  cartCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartCount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#0A2463',
    marginLeft: 4,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyCartTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#0A2463',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyCartText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  shopNowButton: {
    backgroundColor: '#0A2463',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  shopNowButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  cartItemsContainer: {
    flex: 1,
    padding: 16,
  },
  promoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  promoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  promoTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#0A2463',
    marginLeft: 8,
  },
  promoInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginRight: 8,
  },
  applyButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#0A2463',
    borderRadius: 8,
  },
  applyButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  disabledText: {
    opacity: 0.6,
  },
  appliedPromoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  appliedPromoText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#0A2463',
  },
  removePromoText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FF6B6B',
  },
  loyaltyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  loyaltyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#0A2463',
    marginLeft: 8,
  },
  loyaltyBalanceContainer: {
    marginBottom: 12,
  },
  loyaltyBalanceText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  loyaltyBalanceValue: {
    fontFamily: 'Poppins-SemiBold',
    color: '#F9A826',
  },
  useLoyaltyButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F9A826',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  useLoyaltyButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  appliedLoyaltyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: '#FFF8E6',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  appliedLoyaltyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#F9A826',
  },
  removeLoyaltyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FF6B6B',
  },
  earnPointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
  },
  earnPointsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  pointsHighlight: {
    fontFamily: 'Poppins-SemiBold',
    color: '#0A2463',
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E1E1E1',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#0A2463',
  },
  discountValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FF6B6B',
  },
  freeDelivery: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#4ECDC4',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E1E1E1',
    marginTop: 4,
    marginBottom: 16,
  },
  totalLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#0A2463',
  },
  totalValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#0A2463',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A2463',
    paddingVertical: 14,
    borderRadius: 8,
  },
  checkoutButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 8,
  },
});