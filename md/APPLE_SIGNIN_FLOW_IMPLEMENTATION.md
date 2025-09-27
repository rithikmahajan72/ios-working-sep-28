# Apple Sign In Navigation Flow Implementation

## Overview
Implemented conditional navigation flow for Apple Sign In that differentiates between new and returning users.

## User Flow Implementation

### New Users (First Time Login)
```
Apple Sign In → Terms & Conditions → Preference Selector → HomeScreen
```

### Returning Users
```
Apple Sign In → HomeScreen (Direct Navigation)
```

## Technical Implementation

### 1. User Detection Logic
- **File**: `src/screens/loginaccountmobilenumber.js`
- **Method**: `handleSocialLogin` function
- **Detection**: Uses Firebase's `userCredential.additionalUserInfo?.isNewUser` property
- **Flow**: Automatically detects if user is signing in for the first time

### 2. Navigation Implementation
- **New Users**: Navigate to Terms & Conditions with user data
- **Returning Users**: Navigate directly to HomeScreen
- **Data Passing**: User information is passed between screens via navigation params

### 3. AsyncStorage Service
- **File**: `src/services/userPreferencesService.js`
- **Purpose**: Track onboarding completion and store user preferences
- **Methods**:
  - `hasCompletedOnboarding()`: Check if user completed onboarding
  - `setOnboardingCompleted()`: Mark onboarding as completed
  - `saveUserPreferences()`: Save user preference selections

### 4. Screen Updates

#### Terms & Conditions Screen
- **File**: `src/screens/termsandconditions.js`
- **Update**: Modified `handleYes` function to pass user data to Preference Selector
- **Navigation**: Passes `isNewUser: true` flag to next screen

#### Preference Selector Screen
- **File**: `src/screens/preferenceselector.js`
- **Update**: Modified navigation logic to go to HomeScreen after preference selection
- **Methods**: Updated both `handleLetsYoraa` and `handleDismiss` functions

## Key Features

### 1. Automatic User Type Detection
- Firebase automatically tracks new vs returning users
- No manual storage or tracking required for user status
- Works across app reinstalls and different devices

### 2. Seamless Navigation
- New users get full onboarding experience
- Returning users skip onboarding for faster access
- Consistent navigation patterns throughout the app

### 3. Data Persistence
- User preferences stored locally using AsyncStorage
- Onboarding completion status tracked
- Works offline and across app restarts

## Testing Instructions

### Test Scenario 1: New User Flow
1. Ensure you're signed out of Apple ID on the simulator/device
2. Open the app and tap "Sign in with Apple"
3. Complete Apple authentication
4. Should navigate to Terms & Conditions
5. Tap "Yes" to accept terms
6. Should navigate to Preference Selector
7. Select preferences and tap "Let's Yoraa"
8. Should navigate to HomeScreen

### Test Scenario 2: Returning User Flow
1. Complete the new user flow first (Scenario 1)
2. Sign out of the app
3. Tap "Sign in with Apple" again
4. Should navigate directly to HomeScreen (skipping terms and preferences)

### Test Scenario 3: Error Handling
1. Test with poor network connection
2. Test Apple Sign In cancellation
3. Verify proper error messages and fallback behavior

## Files Modified

1. **src/screens/loginaccountmobilenumber.js**
   - Added new/returning user detection logic
   - Implemented conditional navigation flow

2. **src/screens/termsandconditions.js**
   - Updated navigation to pass user data
   - Ensured proper flow continuation

3. **src/screens/preferenceselector.js**
   - Modified navigation to go to HomeScreen
   - Updated both acceptance and dismissal flows

4. **src/services/userPreferencesService.js** (New File)
   - Created AsyncStorage service for user preferences
   - Implemented onboarding tracking methods

## Dependencies Added
- **@react-native-async-storage/async-storage**: For local data persistence
- **iOS Pods**: Installed via `pod install` for iOS compatibility

## Expected Behavior

### Console Logs
- "Apple Sign In successful, isNewUser: [true/false]"
- "Onboarding marked as completed"
- "User preferences saved: [preferences object]"

### Navigation Events
- New users: 4 navigation steps (Login → Terms → Preferences → Home)
- Returning users: 2 navigation steps (Login → Home)

## Troubleshooting

### Common Issues
1. **Apple Sign In Error 1001**: Should be resolved with proper navigation flow
2. **Navigation not working**: Check that all screens are properly imported
3. **AsyncStorage errors**: Ensure pods are installed and app is rebuilt

### Debug Steps
1. Check console logs for user detection
2. Verify navigation params are passed correctly
3. Test both simulator and physical device
4. Ensure Apple ID is properly configured in simulator
