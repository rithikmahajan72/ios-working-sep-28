# Google Play Store Release Requirements

## Required Assets

### App Icon
- ✅ Already configured in `android/app/src/main/res/`
- Size: 512x512 PNG (high-resolution icon)

### Screenshots
- **Phone screenshots**: 2-8 screenshots
- **7-inch tablet screenshots**: 1-8 screenshots  
- **10-inch tablet screenshots**: 1-8 screenshots
- Format: PNG or JPEG, 16:9 or 9:16 aspect ratio

### Feature Graphic
- Size: 1024x500 PNG
- Used in Play Store listing

### Privacy Policy
- Required for all apps
- Must be hosted on a publicly accessible URL

## Store Listing Information

### Basic Details
- **App name**: Yoraa (or your chosen name)
- **Short description**: 80 characters max
- **Full description**: 4000 characters max
- **Category**: Choose appropriate category (Shopping, Lifestyle, etc.)
- **Content rating**: Complete questionnaire
- **Target audience**: Select age groups

### Release Information
- **Version name**: Check `android/app/build.gradle` versionName
- **Version code**: Check `android/app/build.gradle` versionCode
- **Release notes**: Describe new features/changes

## Required Policies

### App Content
- [ ] Content rating questionnaire
- [ ] Target audience selection
- [ ] Ads declaration (if applicable)

### Privacy & Security
- [ ] Privacy policy URL
- [ ] Data safety section
- [ ] Permissions justification

## Pre-Launch Checklist

- [ ] Test on multiple devices ✅
- [ ] All required screenshots taken
- [ ] Feature graphic created
- [ ] Privacy policy published
- [ ] Store listing content written
- [ ] Content rating completed
- [ ] Release notes written

## Upload Process

1. Upload AAB: `android/app/build/outputs/bundle/release/app-release.aab`
2. Complete all required fields
3. Submit for review
4. Review process: 1-3 days typically

## Post-Release

- Monitor crash reports
- Respond to user reviews
- Plan future updates
