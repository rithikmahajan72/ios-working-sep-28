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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { EnhancedLayout } from './src/components/layout';
import SplashScreen from './src/components/SplashScreen';
import { Colors } from './src/constants';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import { BagProvider } from './src/contexts/BagContext';
import ErrorBoundary from './src/components/ErrorBoundary';

// Main App Component with Routing
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleSplashFinish = () => {
    try {
      setIsLoading(false);
    } catch (error) {
      console.error('Error finishing splash:', error);
      setHasError(true);
    }
  };

  // Add a fallback UI for critical errors
  if (hasError) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Something went wrong. Please restart the app.
        </Text>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  try {
    return (
      <GestureHandlerRootView style={styles.container}>
        <ErrorBoundary>
          <FavoritesProvider>
            <BagProvider>
              <View style={styles.container}>
                <StatusBar
                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                  backgroundColor={Colors.background}
                  translucent={false}
                />
                <EnhancedLayout />
              </View>
            </BagProvider>
          </FavoritesProvider>
        </ErrorBoundary>
      </GestureHandlerRootView>
    );
  } catch (error) {
    console.error('Critical error in App component:', error);
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>
          App failed to load. Please restart.
        </Text>
      </SafeAreaView>
    );
  }
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'System',
  },
});export default App;
export { AppWithManualRouting, AppWithRouter, Router };
