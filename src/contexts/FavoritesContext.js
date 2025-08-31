import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Initialize with some demo favorites for testing
  const [favorites, setFavorites] = useState(new Set(['1', '2', '3', '4']));

  const addToFavorites = (productId) => {
    const newFavorites = new Set(favorites);
    newFavorites.add(productId);
    setFavorites(newFavorites);
  };

  const removeFromFavorites = (productId) => {
    const newFavorites = new Set(favorites);
    newFavorites.delete(productId);
    setFavorites(newFavorites);
  };

  const toggleFavorite = (productId) => {
    if (favorites.has(productId)) {
      removeFromFavorites(productId);
      return false; // Item was removed
    } else {
      addToFavorites(productId);
      return true; // Item was added
    }
  };

  const isFavorite = (productId) => {
    return favorites.has(productId);
  };

  const getFavoritesArray = () => {
    return Array.from(favorites);
  };

  const getFavoritesCount = () => {
    return favorites.size;
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoritesArray,
    getFavoritesCount,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export default FavoritesContext;
