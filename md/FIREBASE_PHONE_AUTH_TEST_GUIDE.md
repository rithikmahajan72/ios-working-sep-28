# Firebase Phone Authentication Test Guide

## Test Steps After Uploading APNs Key

### 1. Build and Run on Physical Device
```bash
# Clean build
cd ios
rm -rf Pods Podfile.lock
pod install --clean-install
cd ..

# Run on physical device (replace with your device name)
npx react-native run-ios --device="Your iPhone Name"
```

### 2. Test Phone Authentication Flow
1. Open the app on your iPhone
2. Navigate to Login → Phone
3. Enter your real phone number (with country code)
4. Tap "LOGIN"
5. You should receive an SMS with a 6-digit code
6. Enter the code to complete authentication

### 3. What Should Happen
✅ **Success Indicators:**
- No reCAPTCHA popup (means APNs is working)
- SMS received within 30 seconds
- OTP verification works
- User successfully logged in

❌ **If You See Issues:**
- reCAPTCHA popup = APNs not configured properly
- No SMS received = Phone number format or Firebase quotas
- "Network error" = Check internet connection

### 4. Troubleshooting

#### Issue: reCAPTCHA Still Appears
- Verify APNs key uploaded correctly in Firebase Console
- Check Team ID is correct
- Ensure Push Notifications capability is enabled in Xcode

#### Issue: No SMS Received
- Verify phone number format: +[country code][number]
- Check Firebase Authentication quota
- Try different phone number

#### Issue: "Invalid verification code"
- Check if code expired (usually 5 minutes)
- Ensure correct 6-digit code entry
- Request new code if needed

### 5. Production Checklist
Before App Store release:
- [ ] Upload Production APNs certificate/key
- [ ] Remove test phone numbers from Firebase Console
- [ ] Test on multiple devices and carriers
- [ ] Set up proper error handling and user feedback

## Important Notes
- Phone authentication ONLY works on physical devices
- Simulator will always show reCAPTCHA fallback
- First-time setup may take a few minutes to propagate
- Test with your actual phone number first
