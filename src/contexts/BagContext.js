import React, { createContext, useContext, useState } from 'react';

const BagContext = createContext();

export const BagProvider = ({ children }) => {
  // Initialize with empty bag items
  const [bagItems, setBagItems] = useState([]);

  const addToBag = (product) => {
    const existingItemIndex = bagItems.findIndex(
      item => item.id === product.id && item.size === product.size
    );

    if (existingItemIndex >= 0) {
      // Item exists, increase quantity
      const newBagItems = [...bagItems];
      newBagItems[existingItemIndex].quantity += 1;
      setBagItems(newBagItems);
    } else {
      // New item, add to bag
      let price = product.price;
      
      // Handle price conversion - ensure it's a number
      if (typeof price === 'string') {
        // Remove currency symbols and convert to number
        price = parseFloat(price.replace(/[^0-9.]/g, ''));
      }
      
      // If price is still not valid, default to 0
      if (isNaN(price)) {
        price = 0;
      }

      const newItem = {
        ...product,
        price: price, // Store as number
        quantity: 1,
        addedAt: new Date().toISOString(),
      };
      setBagItems(prevItems => [...prevItems, newItem]);
    }
  };

  const removeFromBag = (productId, size) => {
    setBagItems(prevItems => 
      prevItems.filter(item => !(item.id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromBag(productId, size);
      return;
    }

    setBagItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const updateSize = (productId, oldSize, newSize) => {
    setBagItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.size === oldSize
          ? { ...item, size: newSize }
          : item
      )
    );
  };

  const clearBag = () => {
    setBagItems([]);
  };

  const getBagCount = () => {
    return bagItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getBagItemsCount = () => {
    return bagItems.length;
  };

  const getTotalPrice = () => {
    return bagItems.reduce((total, item) => {
      // Handle different price formats: "$10.00", "US$10.00", "10.00", etc.
      let price = item.price;
      if (typeof price === 'string') {
        // Remove currency symbols and convert to number
        price = parseFloat(price.replace(/[^0-9.]/g, ''));
      }
      // If price is still not a valid number, default to 0
      if (isNaN(price)) {
        price = 0;
      }
      return total + (price * item.quantity);
    }, 0);
  };

  const isInBag = (productId, size) => {
    return bagItems.some(item => item.id === productId && item.size === size);
  };

  const value = {
    bagItems,
    addToBag,
    removeFromBag,
    updateQuantity,
    updateSize,
    clearBag,
    getBagCount,
    getBagItemsCount,
    getTotalPrice,
    isInBag,
  };

  return (
    <BagContext.Provider value={value}>
      {children}
    </BagContext.Provider>
  );
};

export const useBag = () => {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error('useBag must be used within a BagProvider');
  }
  return context;
};
