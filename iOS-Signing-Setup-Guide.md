# iOS Signing & Certificate Setup Verification Guide

## 🔍 Step 1: Check Your Apple Developer Account

### 1.1 Verify Your Team Membership
1. Go to [Apple Developer Console](https://developer.apple.com/account/)
2. Sign in with your Apple ID
3. Verify you see: **Yoraa Apparels Private Limited (UX6XB9FMNN)**
4. Make sure your role is **Admin** or **App Manager**

### 1.2 Check App ID Configuration
1. Go to **Certificates, Identifiers & Profiles**
2. Click **Identifiers** → **App IDs**
3. Find: `com.yoraaapparelsprivatelimited.yoraa`
4. Verify these capabilities are enabled:
   - ✅ **Push Notifications**
   - ✅ **Sign in with Apple** (if you want this feature)
   - ✅ **Associated Domains** (if needed)

---

## 🔑 Step 2: Verify Development Certificates

### 2.1 Check Certificates in Apple Developer Console
1. Go to **Certificates** section
2. Look for **iOS Development** certificates
3. Make sure you have a valid certificate for your Apple ID
4. Certificate should show: **Valid** and not expired

### 2.2 Check Certificates in Keychain (Mac)
1. Open **Keychain Access** app
2. Go to **login** keychain → **Certificates** category
3. Look for: **Apple Development: [Your Name]**
4. Make sure it's valid and has a 🔑 private key icon next to it
5. If it shows ⚠️ or ❌, the certificate is invalid

### 2.3 Create New Development Certificate (if needed)
If you don't have a valid certificate:
1. In Apple Developer Console → **Certificates**
2. Click **+** to create new certificate
3. Select **iOS App Development**
4. Generate CSR (Certificate Signing Request):
   - Open **Keychain Access**
   - Menu: **Keychain Access** → **Certificate Assistant** → **Request Certificate from CA**
   - Enter your email and name
   - Save to disk
5. Upload the CSR file
6. Download and install the certificate

---

## 📱 Step 3: Device Registration

### 3.1 Register Rithik's iPhone
1. In Apple Developer Console → **Devices**
2. Click **+** to add device
3. Get device UDID:
   ```bash
   # Connect iPhone and run:
   xcrun xctrace list devices
   ```
4. Add device with name: **Rithik's iPhone**

---

## 📋 Step 4: Provisioning Profiles

### 4.1 Development Provisioning Profile
1. Go to **Profiles** section
2. Create new **iOS App Development** profile
3. Select your App ID: `com.yoraaapparelsprivatelimited.yoraa`
4. Select your development certificate
5. Select Rithik's iPhone device
6. Name it: **Yoraa Development**
7. Download and install (double-click)

### 4.2 Distribution Provisioning Profile (for App Store)
1. Create new **App Store** profile
2. Select your App ID
3. Select distribution certificate
4. Name it: **Yoraa App Store Distribution**
5. Download and install

---

## ⚙️ Step 5: Xcode Configuration

### 5.1 Open Xcode Project
```bash
open ios/Yoraa.xcworkspace
```

### 5.2 Configure Signing for Development
1. Select **YoraaApp** target
2. Go to **Signing & Capabilities**
3. **Debug** configuration:
   - ✅ **Automatically manage signing**
   - **Team**: Yoraa Apparels Private Limited (UX6XB9FMNN)
   - **Bundle Identifier**: com.yoraaapparelsprivatelimited.yoraa
4. **Release** configuration:
   - ✅ **Automatically manage signing**
   - **Team**: Yoraa Apparels Private Limited (UX6XB9FMNN)
   - **Bundle Identifier**: com.yoraaapparelsprivatelimited.yoraa

### 5.3 Verify Capabilities
Make sure these are present (add if missing):
- **Push Notifications**
- **Sign in with Apple** (if you want this feature)

---

## 🧪 Step 6: Test the Setup

### 6.1 Clean and Build
```bash
# Clean everything
cd ios
rm -rf build DerivedData
xcodebuild clean -workspace Yoraa.xcworkspace -scheme YoraaApp

# Test build for device
xcodebuild build -workspace Yoraa.xcworkspace -scheme YoraaApp -configuration Debug -destination 'platform=iOS,name=rithiks iPhone'
```

### 6.2 Install on Device
```bash
# Install on connected iPhone
npx react-native run-ios --device "rithiks iPhone"
```

---

## 🔧 Step 7: Common Fixes

### 7.1 If "No matching provisioning profiles found"
```bash
# Delete derived data
rm -rf ~/Library/Developer/Xcode/DerivedData

# Refresh provisioning profiles
xcodebuild -downloadAllProvisioningProfiles
```

### 7.2 If Certificate Issues
```bash
# Reset certificates (last resort)
security delete-keychain ~/Library/Keychains/login.keychain-db
# Then recreate certificates from Apple Developer Console
```

### 7.3 If Team Issues
1. Make sure you're signed into the correct Apple ID in Xcode:
   - **Xcode** → **Preferences** → **Accounts**
   - Add your Apple ID if missing
   - Download Manual Profiles

---

## ✅ Step 8: Verification Checklist

Before building, verify:
- [ ] Valid Apple Developer account access
- [ ] App ID exists with correct bundle identifier
- [ ] Development certificate is valid and in Keychain
- [ ] Device is registered in Apple Developer Console
- [ ] Provisioning profile exists and is downloaded
- [ ] Xcode team selection is correct
- [ ] Bundle identifier matches exactly
- [ ] iPhone is connected and trusted

---

## 🚀 Step 9: Final Test Commands

Once everything is verified:

```bash
# For development (on device)
npx react-native run-ios --device "rithiks iPhone"

# For simulator (testing)
npx react-native run-ios --simulator "iPhone 15"
```

---

## 🆘 If Still Having Issues

1. **Check Xcode Logs**: Build in Xcode.app for detailed error messages
2. **Verify Bundle ID**: Make sure it matches exactly in all places
3. **Certificate Expiry**: Check if certificates are expired
4. **Team Permissions**: Ensure you have proper permissions in the team
5. **Clean Install**: Remove and reinstall Xcode if necessary

Run this diagnostic script to check your current setup:
```bash
# Check certificates
security find-identity -v -p codesigning

# Check provisioning profiles
ls ~/Library/MobileDevice/Provisioning\ Profiles/

# Check connected devices
xcrun xctrace list devices
```
