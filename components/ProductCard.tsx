import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Heart, ShoppingCart } from 'lucide-react-native';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24;

export default function ProductCard({ product, onPress, onAddToCart }: ProductCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(product)}
      activeOpacity={0.9}
    >
      {product.discountPrice && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
          </Text>
        </View>
      )}
      
      {product.isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newText}>NEW</Text>
        </View>
      )}
      
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        
        <View style={styles.priceContainer}>
          {product.discountPrice ? (
            <>
              <Text style={styles.discountPrice}>Rs. {product.discountPrice.toLocaleString()}</Text>
              <Text style={styles.originalPrice}>Rs. {product.price.toLocaleString()}</Text>
            </>
          ) : (
            <Text style={styles.price}>Rs. {product.price.toLocaleString()}</Text>
          )}
        </View>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {product.rating}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          <ShoppingCart size={16} color="#FFFFFF" />
          <Text style={styles.addToCartText}>Add</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  newText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#0A2463',
    marginBottom: 8,
    height: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#0A2463',
  },
  discountPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#0A2463',
    marginRight: 8,
  },
  originalPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#F9A826',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A2463',
    paddingVertical: 8,
    borderRadius: 6,
  },
  addToCartText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
});