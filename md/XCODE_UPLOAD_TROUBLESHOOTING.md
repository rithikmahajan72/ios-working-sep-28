# Xcode Upload Troubleshooting

## Common Upload Issues & Solutions

### 1. **Team Selection Issues**
- **Problem**: "No teams found" or wrong team
- **Solution**: 
  - Xcode → Preferences → Accounts
  - Add your Apple ID
  - Download manual provisioning profiles

### 2. **Bundle ID Conflicts**
- **Problem**: "Bundle ID not found in App Store Connect"
- **Solution**: 
  - Register app in App Store Connect first
  - Use exact Bundle ID: com.yoraaapparelsprivatelimited.yoraa

### 3. **Provisioning Profile Issues**
- **Problem**: "No matching provisioning profile"
- **Solution**:
  - Xcode will auto-generate if needed
  - Or create manually in Apple Developer Portal

### 4. **Archive Not Showing**
- **Problem**: Archive doesn't appear in Organizer
- **Solution**:
  ```bash
  # Rebuild archive
  cd ios
  rm -rf build/
  xcodebuild clean -workspace Yoraa.xcworkspace -scheme YoraaApp
  xcodebuild archive -workspace Yoraa.xcworkspace -scheme YoraaApp -archivePath build/YoraaApp.xcarchive
  ```

### 5. **Upload Timeout**
- **Problem**: Upload gets stuck or times out
- **Solution**:
  - Check internet connection
  - Try again later (Apple servers busy)
  - Use Application Loader as alternative

## Alternative: Command Line Upload
If Xcode Organizer fails, use altool:

```bash
# Replace with your Apple ID and app-specific password
xcrun altool --upload-app \
  --type ios \
  --file "ios/build/YoraaApp-IPA/YoraaApp.ipa" \
  --username "your-apple-id@email.com" \
  --password "your-app-specific-password"
```

## Alternative: Transporter App
1. Download "Transporter" from Mac App Store
2. Drag and drop your IPA file
3. Click "Deliver"
