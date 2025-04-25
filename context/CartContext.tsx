import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemsCount: number;
  pointsToEarn: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [pointsToEarn, setPointsToEarn] = useState(0);

  useEffect(() => {
    // Calculate cart total and count whenever cartItems changes
    calculateCartTotals();
  }, [cartItems]);

  const calculateCartTotals = () => {
    let total = 0;
    let count = 0;

    cartItems.forEach((item) => {
      const itemPrice = item.product.discountPrice || item.product.price;
      total += itemPrice * item.quantity;
      count += item.quantity;
    });

    setCartTotal(total);
    setCartItemsCount(count);
    
    // Calculate loyalty points to earn (1 point per LKR 100)
    setPointsToEarn(Math.floor(total / 100));
  };

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex !== -1) {
        // Increment quantity if product already in cart
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Add new product to cart
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const incrementQuantity = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (productId: string) => {
    setCartItems((prevItems) => {
      // Find the item
      const item = prevItems.find((item) => item.product.id === productId);
      
      // If item doesn't exist or quantity is already 1, don't change anything
      if (!item || item.quantity <= 1) return prevItems;
      
      // Otherwise, decrement the quantity
      return prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        cartTotal,
        cartItemsCount,
        pointsToEarn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};