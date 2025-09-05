# Google Sign In Setup Guide

## Overview
This guide will help you set up Google Sign In for your React Native app with Firebase authentication.

## Prerequisites
- React Native project with Firebase already configured
- Firebase project in Firebase Console
- Google Cloud Console access

## Step 1: Configure Google Cloud Console

### 1.1 Create OAuth 2.0 Client IDs
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create one if needed)
3. Go to **APIs & Services** > **Credentials**
4. Click **+ CREATE CREDENTIALS** > **OAuth 2.0 Client IDs**

### 1.2 Create iOS OAuth Client
1. Select **iOS** as application type
2. **Name**: `YORAA iOS App`
3. **Bundle ID**: `com.yoraaapparelsprivatelimited.yoraa` (match your iOS bundle ID)
4. Click **Create**
5. **Save the Client ID** - you'll need it later

### 1.3 Create Android OAuth Client
1. Click **+ CREATE CREDENTIALS** > **OAuth 2.0 Client IDs** again
2. Select **Android** as application type
3. **Name**: `YORAA Android App`
4. **Package name**: `com.yoraaapparelsprivatelimited.yoraa` (match your Android package)
5. **SHA-1 certificate fingerprint**: 
   - For debug: Run `cd android && ./gradlew signingReport` and copy the SHA1 from debug
   - For release: Use your release keystore SHA1
6. Click **Create**

### 1.4 Create Web OAuth Client (Required for Firebase)
1. Click **+ CREATE CREDENTIALS** > **OAuth 2.0 Client IDs** again
2. Select **Web application** as application type
3. **Name**: `YORAA Web Client`
4. Click **Create**
5. **Save the Web Client ID** - this is your `webClientId`

## Step 2: Configure Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** > **Sign-in method**
4. Click on **Google**
5. **Enable** Google Sign-In
6. **Web SDK configuration**: Paste your **Web Client ID** from Step 1.4
7. **Project support email**: Enter your email
8. Click **Save**

## Step 3: Update Google Auth Service

Replace the placeholder in `src/services/googleAuthService.js`:

\`\`\`javascript
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID_FROM_STEP_1.4', // Replace this!
  offlineAccess: true,
  hostedDomain: '',
  forceCodeForRefreshToken: true,
});
\`\`\`

## Step 4: iOS Configuration

### 4.1 Add URL Scheme
1. Open `ios/Yoraa.xcworkspace` in Xcode
2. Select your project in the navigator
3. Select the **YoraaApp** target
4. Go to **Info** tab
5. Expand **URL Types**
6. Click **+** to add a new URL type
7. **URL Schemes**: Add your **iOS Client ID** (the reversed format like `com.googleusercontent.apps.123456789-xxx`)
8. **Identifier**: `GoogleSignIn`

### 4.2 Update Info.plist
Add this to `ios/YoraaApp/Info.plist` before `</dict>`:

\`\`\`xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>GoogleSignIn</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>YOUR_IOS_CLIENT_ID</string>
    </array>
  </dict>
</array>
\`\`\`

## Step 5: Android Configuration

### 5.1 Add Google Services Plugin
Ensure `android/app/build.gradle` has:

\`\`\`gradle
apply plugin: 'com.google.gms.google-services'
\`\`\`

### 5.2 Update google-services.json
1. Download the latest `google-services.json` from Firebase Console
2. Replace the existing file in `android/app/google-services.json`
3. Make sure it includes the OAuth client information

## Step 6: Get SHA-1 Fingerprint (Android)

### Debug Keystore:
\`\`\`bash
cd android
./gradlew signingReport
\`\`\`

Copy the SHA1 from the debug variant and add it to your Android OAuth client in Google Cloud Console.

### Release Keystore:
\`\`\`bash
keytool -list -v -keystore upload-keystore.jks -alias upload
\`\`\`

## Step 7: Test Implementation

### 7.1 New User Flow
1. Tap "Sign in with Google"
2. Complete Google authentication
3. Should navigate: Google Sign In → Terms & Conditions → Preferences → Home

### 7.2 Returning User Flow
1. Tap "Sign in with Google"
2. Should navigate directly to Home

## Step 8: Troubleshooting

### Common Issues:

1. **"Sign in failed" error**
   - Check that webClientId is correct
   - Verify Firebase has Google auth enabled
   - Ensure SHA-1 fingerprint is added to Android OAuth client

2. **"DEVELOPER_ERROR" on Android**
   - SHA-1 fingerprint doesn't match
   - Package name doesn't match
   - google-services.json is outdated

3. **iOS URL scheme error**
   - iOS Client ID not added to URL schemes
   - Bundle ID doesn't match OAuth client

4. **"Play Services not available" (Android only)**
   - Test on real device or emulator with Google Play Services

### Debug Logs:
Check console for these logs:
- "Google Sign In configured successfully"
- "Google Sign In userInfo: [object]"
- "Firebase Google Sign In successful"

## Step 9: Security Notes

- Keep Client IDs secure
- Use different OAuth clients for debug/release
- Regularly rotate secrets for production
- Test on both platforms before release

## Quick Reference

**Required Values:**
- Web Client ID (for Firebase config)
- iOS Client ID (for URL scheme)
- Android SHA-1 fingerprint
- Correct package/bundle IDs

**Files to Update:**
- `src/services/googleAuthService.js` (webClientId)
- `ios/YoraaApp/Info.plist` (URL scheme)
- `android/app/google-services.json` (download fresh)
