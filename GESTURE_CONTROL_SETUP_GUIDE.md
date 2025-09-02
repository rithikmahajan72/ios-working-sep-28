# React Native Gesture Control Setup Guide

## Overview
This guide explains how to implement React Native gesture control for bottom sheet dismissal in your legacy React Native project, following the official React Native documentation.

## Current Setup
Your project is already configured with:
- React Native 0.80.2 (legacy version)
- `react-native-gesture-handler` v2.28.0 ✅
- Proper Android/iOS native linking ✅

## Implementation Options

### 1. Built-in PanResponder (Current Implementation - Enhanced)
**File**: `src/screens/preferenceselector.js`

Your current implementation uses React Native's built-in `PanResponder` system, which is the official gesture system documented at:
- https://reactnative.dev/docs/0.80/gesture-responder-system
- https://reactnative.dev/docs/0.80/panresponder

**Key Features Implemented:**
- ✅ Proper gesture lifecycle handling
- ✅ Swipe-to-dismiss functionality
- ✅ Gesture thresholds and velocity detection
- ✅ Smooth animations
- ✅ Enhanced gesture detection following official docs

**Enhanced Implementation Details:**
```javascript
// Enhanced PanResponder following official React Native docs
const panResponder = useRef(
  PanResponder.create({
    // Official gesture responder lifecycle methods
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      return Math.abs(dy) > Math.abs(dx) && dy > 15 && Math.abs(dy) > 10;
    },
    onPanResponderGrant: (evt, gestureState) => {
      // Visual feedback as recommended by docs
      panY.setOffset(panY._value);
      panY.setValue(0);
    },
    onPanResponderMove: (evt, gestureState) => {
      // Enhanced movement with bounds checking
      const { dy } = gestureState;
      if (dy > 0) {
        panY.setValue(dy);
      } else if (dy < 0) {
        panY.setValue(dy * 0.1); // Resistance for upward movement
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      // Enhanced dismissal logic
      const { dy, vy } = gestureState;
      const shouldDismiss = dy > 120 || (dy > 50 && vy > 0.7);
      // ... dismissal animation
    },
    // Additional official handlers for robust gesture handling
    onPanResponderTerminationRequest: () => true,
    onPanResponderTerminate: () => { /* cleanup */ },
    onShouldBlockNativeResponder: () => true,
  })
);
```

### 2. Modern react-native-gesture-handler (Alternative Implementation)
**File**: `src/screens/preferenceselector-gesture-handler.js`

This implementation uses the modern `react-native-gesture-handler` library for better performance and more precise gesture recognition.

**Key Advantages:**
- ✅ Better performance (runs on UI thread)
- ✅ More precise gesture recognition
- ✅ Better iOS/Android parity
- ✅ More modern API

**Implementation Example:**
```javascript
import { PanGestureHandler, State } from 'react-native-gesture-handler';

// Modern gesture handler
const onGestureEvent = Animated.event(
  [{ nativeEvent: { translationY: panY } }],
  { useNativeDriver: false }
);

const onHandlerStateChange = useCallback((event) => {
  const { state, translationY, velocityY } = event.nativeEvent;
  
  if (state === State.END) {
    const shouldDismiss = 
      translationY > 120 || 
      (translationY > 50 && velocityY > 700);
    // ... handle dismissal
  }
}, []);

// Usage in JSX
<PanGestureHandler
  onGestureEvent={onGestureEvent}
  onHandlerStateChange={onHandlerStateChange}
  activeOffsetY={15}
  failOffsetX={[-20, 20]}
>
  <Animated.View style={animatedStyle}>
    {/* Your bottom sheet content */}
  </Animated.View>
</PanGestureHandler>
```

## Configuration Required

### App.js Setup
For `react-native-gesture-handler` to work properly, wrap your app with `GestureHandlerRootView`:

```javascript
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Your app content */}
    </GestureHandlerRootView>
  );
}
```

### Native Configuration (Already Done)
Based on your `package.json` and `Podfile.lock`, the native configuration is already complete:
- ✅ iOS: Pods installed and configured
- ✅ Android: Auto-linking configured
- ✅ React Native 0.80.2 compatibility

## Usage Examples

### Basic Bottom Sheet with Swipe Dismissal
```javascript
// Using your current PanResponder implementation
<Animated.View 
  style={[styles.bottomSheet, animatedStyle]}
  {...panResponder.panHandlers}
>
  <View style={styles.swipeHandle} />
  {/* Your content */}
</Animated.View>
```

### Advanced Gesture Configuration
```javascript
// Fine-tuning gesture recognition
onMoveShouldSetPanResponder: (evt, gestureState) => {
  const { dx, dy } = gestureState;
  // Only respond to predominantly vertical gestures
  return Math.abs(dy) > Math.abs(dx) && dy > 15;
},

// Enhanced thresholds
onPanResponderRelease: (evt, gestureState) => {
  const { dy, vy } = gestureState;
  const dismissThreshold = 120; // Minimum distance
  const velocityThreshold = 0.7; // Minimum velocity
  
  const shouldDismiss = 
    dy > dismissThreshold || 
    (dy > 50 && vy > velocityThreshold);
},
```

## Best Practices (From Official Docs)

### 1. Feedback and Highlighting
- ✅ Implemented: Visual feedback during gesture
- ✅ Implemented: Swipe handle indicator

### 2. Cancel-ability
- ✅ Implemented: Users can abort gesture by dragging back up
- ✅ Implemented: Spring-back animation for cancelled gestures

### 3. Performance Optimization
- ✅ Use `useNativeDriver: false` for transform animations
- ✅ Memoize callbacks with `useCallback`
- ✅ Proper gesture lifecycle management

## Testing Your Implementation

1. **Swipe Down**: Should dismiss bottom sheet smoothly
2. **Quick Flick**: Should dismiss with velocity threshold
3. **Partial Swipe**: Should spring back to original position
4. **Horizontal Swipe**: Should not trigger dismissal
5. **Backdrop Tap**: Should also dismiss (current implementation)

## Troubleshooting

### Common Issues:
1. **Gestures not working**: Ensure `GestureHandlerRootView` wraps your app
2. **Poor performance**: Check `useNativeDriver` settings
3. **Conflicting gestures**: Adjust `activeOffsetY` and `failOffsetX` values
4. **iOS vs Android differences**: Test on both platforms

### Debug Tips:
```javascript
// Add logging to gesture handlers
onPanResponderMove: (evt, gestureState) => {
  console.log('Gesture:', gestureState.dy, gestureState.vy);
  // Your gesture handling code
},
```

## Migration Path

### Current → Enhanced (Recommended)
Your current implementation is already solid. The enhanced version in `preferenceselector.js` includes:
- Better gesture detection
- Improved thresholds
- Enhanced animations
- More robust error handling

### Current → Modern Gesture Handler (Optional)
If you want the latest gesture handling technology:
1. Use the implementation in `preferenceselector-gesture-handler.js`
2. Test thoroughly on both platforms
3. Consider the performance benefits for complex gesture interactions

## Conclusion

Your current implementation already follows the official React Native gesture documentation very well. The enhancements provided improve:
- Gesture precision
- User experience
- Performance
- Robustness

Both implementations (PanResponder and react-native-gesture-handler) are valid and will work excellently for your bottom sheet dismissal functionality.
