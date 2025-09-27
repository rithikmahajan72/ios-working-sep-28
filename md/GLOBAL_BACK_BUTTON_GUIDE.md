# Global Back Button Component

A reusable back button component that provides consistent navigation behavior across the entire app.

## Features

- Consistent styling across all screens
- Built-in press animations
- Customizable appearance
- Automatic navigation handling
- Support for custom onPress handlers
- Works in headers, modals, and any container

## Basic Usage

```javascript
import GlobalBackButton from '../components/GlobalBackButton';

// Simple usage with default styling
<GlobalBackButton navigation={navigation} />
```

## Advanced Usage

```javascript
import GlobalBackButton from '../components/GlobalBackButton';

// Customized appearance and behavior
<GlobalBackButton 
  navigation={navigation}
  iconColor="#FF0000"
  iconSize={28}
  backgroundColor="#E5E5E5"
  animationDuration={250}
  style={{ marginLeft: 10 }}
/>
```

## Custom Handler

```javascript
import GlobalBackButton from '../components/GlobalBackButton';

// Custom onPress behavior (for modals, special cases)
<GlobalBackButton 
  onPress={() => {
    // Custom logic before navigation
    setModalVisible(false);
    console.log('Modal closed');
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `navigation` | Object | Optional* | React Navigation object |
| `style` | Object | `{}` | Additional styles for the button container |
| `iconColor` | String | `'#000000'` | Color of the back arrow icon |
| `iconSize` | Number | `24` | Size of the back arrow icon |
| `backgroundColor` | String | `'transparent'` | Background color of the button |
| `onPress` | Function | `null` | Custom press handler (overrides default navigation) |
| `animateOnPress` | Boolean | `true` | Enable/disable press animation |
| `animationDuration` | Number | `300` | Delay before navigation (ms) |
| `customEasing` | Function | `Easing.out(Easing.back(1.7))` | Animation easing function |

*Required unless `onPress` is provided

## Implementation Examples

### In Screen Headers

```javascript
// Header with back button and title
<View style={styles.header}>
  <GlobalBackButton navigation={navigation} />
  <Text style={styles.headerTitle}>Settings</Text>
  <View style={styles.headerSpacer} />
</View>
```

### In Modals

```javascript
// Modal header with custom close behavior
<View style={styles.modalHeader}>
  <GlobalBackButton 
    onPress={() => setModalVisible(false)}
    backgroundColor="transparent"
  />
  <Text style={styles.modalTitle}>Edit Address</Text>
</View>
```

### Custom Styling

```javascript
// Dark theme back button
<GlobalBackButton 
  navigation={navigation}
  iconColor="#FFFFFF"
  backgroundColor="#333333"
  style={{ borderRadius: 20 }}
/>

// Transparent back button
<GlobalBackButton 
  navigation={navigation}
  backgroundColor="transparent"
  iconColor="#007AFF"
/>
```

### With Animation Customization

```javascript
// Fast navigation without delay
<GlobalBackButton 
  navigation={navigation}
  animationDuration={0}
  animateOnPress={false}
/>

// Custom easing
<GlobalBackButton 
  navigation={navigation}
  customEasing={Easing.bounce}
  animationDuration={500}
/>
```

## Replacing Existing Back Buttons

To migrate from existing back button implementations:

### Before (Settings Screen Example)
```javascript
// Old implementation
const BackArrowIcon = () => (
  <View style={styles.backArrowIcon}>
    <Text style={styles.backChevronText}>〈</Text>
  </View>
);

const handleBack = () => {
  Animated.timing(slideAnim, {
    toValue: 300,
    duration: 300,
    easing: Easing.in(Easing.back(1.7)),
    useNativeDriver: true,
  }).start(() => {
    navigation.goBack();
  });
};

<TouchableOpacity style={styles.backButton} onPress={handleBack}>
  <BackArrowIcon />
</TouchableOpacity>
```

### After (Settings Screen Example)
```javascript
// New implementation
import GlobalBackButton from '../components/GlobalBackButton';

<GlobalBackButton 
  navigation={navigation}
  animationDuration={300}
  customEasing={Easing.in(Easing.back(1.7))}
/>
```

### Before (Edit Profile Screen Example)
```javascript
// Old implementation with PNG icon
const BackArrowIcon = () => (
  <Image 
    source={require('../assets/icons/CaretLeft.png')} 
    style={styles.backArrowIcon}
    resizeMode="contain"
  />
);

const handleGoBack = () => {
  setTimeout(() => {
    navigation.goBack();
  }, 300);
};

<TouchableOpacity 
  style={styles.backButton} 
  onPress={handleGoBack}
  activeOpacity={0.7}
>
  <BackArrowIcon />
</TouchableOpacity>
```

### After (Edit Profile Screen Example)
```javascript
// New implementation
import GlobalBackButton from '../components/GlobalBackButton';

<GlobalBackButton 
  navigation={navigation}
  animationDuration={300}
/>
```

## Styling Guidelines

The GlobalBackButton follows the app's design system:

- Default size: 40x40 pixels
- Default background: transparent
- Default icon color: #000000
- Default border radius: Medium (from constants)
- Built-in touch feedback with opacity
- SVG-based icon for crisp rendering at any size

## Current Implementation Status

The following screens have been updated to use GlobalBackButton:

✅ **Settings Screen** (`src/screens/settings.js`)
- Replaced custom BackArrowIcon with GlobalBackButton
- Removed handleBack function
- Maintained existing animation behavior

✅ **Edit Profile Screen** (`src/screens/editprofile.js`)
- Replaced both header and modal back buttons
- Removed handleGoBack function
- Custom onPress for modal close behavior

✅ **Communication Preferences Screen** (`src/screens/communicationpreferences.js`)
- Replaced BackArrowIcon with GlobalBackButton
- Removed handleBack function and BackArrowIcon component
- Maintained slide animation behavior

✅ **Delivery Addresses Settings Screen** (`src/screens/deliveryaddressessettings.js`)
- Updated both main view and form view headers
- Replaced PNG-based BackArrowIcon with SVG GlobalBackButton
- Custom onPress handler to maintain existing animation logic

✅ **Linked Account Screen** (`src/screens/linkedaccount.js`)
- Replaced custom BackArrowIcon with GlobalBackButton  
- Removed handleBack function and BackArrowIcon component
- Maintained slide animation with custom easing

✅ **Profile Visibility Screen** (`src/screens/profilevisibility.js`)
- Updated header back button implementation
- Removed BackArrowIcon component
- Custom onPress to maintain existing handleBack logic

🔄 **Screens to Update**:
- Delete Account
- Contact Us
- Orders
- Product Details screens
- FAQ
- Love Us Rate Us
- Invoice
- And other screens with back buttons

## Migration Checklist

When updating a screen to use GlobalBackButton:

1. ✅ Import GlobalBackButton component
2. ✅ Replace TouchableOpacity + custom icon with GlobalBackButton
3. ✅ Remove unused back icon components
4. ✅ Remove unused handleBack functions
5. ✅ Update any modal back buttons
6. ✅ Test navigation behavior
7. ✅ Verify animations work correctly

## Notes

- The component automatically handles navigation.goBack() when no custom onPress is provided
- Animation delays help provide smooth transitions between screens
- The component is fully compatible with React Navigation
- All existing back button implementations can be replaced with this component
- SVG icons provide better quality than PNG icons
- The component handles press states and animations automatically
