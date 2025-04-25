import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onIncrement: (item: CartItemType) => void;
  onDecrement: (item: CartItemType) => void;
  onRemove: (item: CartItemType) => void;
}

export default function CartItem({ item, onIncrement, onDecrement, onRemove }: CartItemProps) {
  const { product, quantity } = item;
  const price = product.discountPrice || product.price;
  const totalPrice = price * quantity;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>Rs. {price.toLocaleString()}</Text>
          {product.discountPrice && (
            <Text style={styles.originalPrice}>Rs. {product.price.toLocaleString()}</Text>
          )}
        </View>
        
        <View style={styles.actionsContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={() => onDecrement(item)}
              disabled={quantity <= 1}
            >
              <Minus size={16} color={quantity <= 1 ? '#CCC' : '#0A2463'} />
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={() => onIncrement(item)}
            >
              <Plus size={16} color="#0A2463" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.removeButton} 
            onPress={() => onRemove(item)}
          >
            <Trash2 size={16} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Rs. {totalPrice.toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#0A2463',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#0A2463',
    marginRight: 8,
  },
  originalPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 6,
    overflow: 'hidden',
  },
  quantityButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#0A2463',
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  totalContainer: {
    justifyContent: 'flex-end',
    paddingLeft: 8,
  },
  totalText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#0A2463',
  },
});