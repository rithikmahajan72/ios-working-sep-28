/**
 * YORAA Fashion App
 * React Native App with Bottom Navigation
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { EnhancedLayout } from './src/components/layout';
import SplashScreen from './src/components/SplashScreen';
import { Colors } from './src/constants';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import ErrorBoundary from './src/components/ErrorBoundary';

// Main App Component with Routing
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <ErrorBoundary>
      <FavoritesProvider>
        <View style={styles.container}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={Colors.background}
            translucent={false}
          />
          <EnhancedLayout />
        </View>
      </FavoritesProvider>
    </ErrorBoundary>
  );
}

// Alternative App Component with Manual Routing (if you prefer more control)
const AppWithManualRouting = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentRoute, setCurrentRoute] = useState('Home');

  const handleRouteChange = (route) => {
    setCurrentRoute(route);
    // Navigation logging removed for production
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#FFFFFF"
      />
      
      {/* App Header */}
      <View style={styles.appHeader}>
        <Text style={styles.appTitle}>YORAA</Text>
        <Text style={styles.appSubtitle}>Fashion Forward</Text>
        <Text style={styles.currentRoute}>Current: {currentRoute}</Text>
      </View>

      {/* Main Layout with Routing */}
      <EnhancedLayout 
        initialRoute={currentRoute}
        onRouteChange={handleRouteChange}
      />
    </SafeAreaView>
  );
};

// Router Component for managing navigation state
const Router = ({ children, initialRoute = 'Home' }) => {
  const [currentRoute, setCurrentRoute] = useState(initialRoute);
  const [routeHistory, setRouteHistory] = useState([initialRoute]);

  const navigateTo = (route) => {
    if (route !== currentRoute) {
      setCurrentRoute(route);
      setRouteHistory(prev => [...prev, route]);
      // Navigation logging removed for production
    }
  };

  const goBack = () => {
    if (routeHistory.length > 1) {
      const newHistory = routeHistory.slice(0, -1);
      const previousRoute = newHistory[newHistory.length - 1];
      setRouteHistory(newHistory);
      setCurrentRoute(previousRoute);
      // Navigation logging removed for production
    }
  };

  const routerProps = {
    currentRoute,
    navigateTo,
    goBack,
    routeHistory,
    canGoBack: routeHistory.length > 1,
  };

  return React.cloneElement(children, routerProps);
};

// Enhanced App with Router
const AppWithRouter = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <StatusBar 
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="#FFFFFF"
        />
        
        <Router initialRoute="Home">
          <EnhancedLayout />
        </Router>
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});export default App;
export { AppWithManualRouting, AppWithRouter, Router };
