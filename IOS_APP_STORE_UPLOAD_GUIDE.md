# iOS App Store Upload Guide

## 🍎 App Store Connect Upload Process

### Prerequisites
- ✅ Xcode Archive: `ios/build/YoraaApp.xcarchive`
- ✅ IPA File: `ios/build/YoraaApp-IPA/YoraaApp.ipa`
- ✅ Bundle ID: `com.yoraaapparelsprivatelimited.yoraa`

## Method 1: Using Xcode (Recommended)

### Step 1: Open Archive in Xcode
```bash
open ios/build/YoraaApp.xcarchive
```

### Step 2: Distribute App
1. Xcode Organizer will open
2. Click "Distribute App"
3. Select "App Store Connect"
4. Choose "Upload"
5. Select your development team
6. Review app information
7. Click "Upload"

## Method 2: Using Xcode Command Line

### Upload IPA directly:
```bash
xcrun altool --upload-app --type ios --file "ios/build/YoraaApp-IPA/YoraaApp.ipa" --username "YOUR_APPLE_ID" --password "YOUR_APP_SPECIFIC_PASSWORD"
```

## Method 3: Using Transporter App

### Step 1: Download Transporter
- Download from Mac App Store: "Transporter"

### Step 2: Upload IPA
1. Open Transporter app
2. Drag and drop your IPA file: `ios/build/YoraaApp-IPA/YoraaApp.ipa`
3. Click "Deliver"

## Method 4: Setup Fastlane for iOS (Optional)

### Create Fastfile for iOS:
```ruby
# ios/fastlane/Fastfile
default_platform(:ios)

platform :ios do
  desc "Upload to App Store Connect"
  lane :upload_to_app_store do
    upload_to_app_store(
      ipa: "build/YoraaApp-IPA/YoraaApp.ipa",
      skip_metadata: true,
      skip_screenshots: true,
      skip_binary_upload: false
    )
  end
end
```

## App Store Connect Setup Requirements

### 1. App Store Connect Account
- Apple Developer Program membership ($99/year)
- App registered in App Store Connect

### 2. App Information Required
- **App Name**: Yoraa (or your chosen name)
- **Bundle ID**: com.yoraaapparelsprivatelimited.yoraa
- **Version**: 1.0
- **Category**: Shopping/Lifestyle
- **App Description**: Detailed description (4000 chars max)
- **Keywords**: Relevant search keywords
- **Support URL**: Your support website
- **Privacy Policy URL**: Required privacy policy

### 3. App Store Assets Required
- **App Icon**: 1024x1024 PNG
- **Screenshots**:
  - iPhone 6.7": 1290x2796 or 1284x2778
  - iPhone 6.5": 1242x2688 or 1284x2778  
  - iPhone 5.5": 1242x2208
  - iPad Pro 12.9": 2048x2732
  - iPad Pro 11": 1668x2388

### 4. App Review Information
- **Demo Account**: If app requires login
- **Review Notes**: Special instructions for reviewers
- **Contact Information**: Review contact details

## Post-Upload Steps

### 1. Processing (1-2 hours)
- Apple processes your binary
- Check for processing errors

### 2. TestFlight (Optional)
- Add internal/external testers
- Distribute beta versions

### 3. App Review Submission
- Complete all metadata
- Submit for App Store review
- Review typically takes 1-3 days

### 4. Release
- Auto-release or manual release
- App appears on App Store

## Troubleshooting

### Common Issues:
1. **Invalid Binary**: Check Xcode build settings
2. **Missing Metadata**: Complete App Store Connect info
3. **Icon Issues**: Ensure 1024x1024 icon is provided
4. **Privacy Issues**: Add privacy policy and data usage info

### Build Issues:
```bash
# Clean and rebuild if needed
cd ios
rm -rf build/
xcodebuild clean -workspace Yoraa.xcworkspace -scheme YoraaApp
xcodebuild archive -workspace Yoraa.xcworkspace -scheme YoraaApp -configuration Release -archivePath build/YoraaApp.xcarchive
```

## Current Status
- ✅ Archive created: Aug 29, 16:33
- ✅ IPA exported: Aug 29, 16:35  
- 🔄 Ready for App Store Connect upload
- 📱 Next: Upload using one of the methods above
