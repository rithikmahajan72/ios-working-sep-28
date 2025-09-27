# Size Selection Chart Features

## Overview
The size selection chart has been updated to match the Figma design specifications with enhanced functionality and improved visual design.

## Features Implemented

### 1. Size Chart Tab
- **Selectable Size Options**: Radio button interface for selecting sizes (S, M, L, XL, XXL)
- **Unit Toggle**: Switch between inches ("in") and centimeters ("cm") with improved toggle design
- **Dynamic Measurements**: Size measurements automatically update based on selected unit
- **Interactive Table**: Clean table layout with proper spacing and typography

### 2. How To Measure Tab
- **Measurement Diagram**: Detailed pants measurement illustration showing:
  - To Fit Waist
  - Rise
  - Thigh
  - Inseam Length
  - Outseam Length
  - Bottom Hem
- **Visual Guidelines**: Dashed measurement lines with proper labels
- **Professional Layout**: Clean background with proper spacing

### 3. Design Improvements
- **Radio Buttons**: Properly styled radio buttons matching design specifications
- **Toggle Button**: Improved unit toggle with background container and active states
- **Typography**: Consistent font sizes and weights throughout
- **Spacing**: Proper margins and padding for better visual hierarchy
- **Colors**: Consistent color scheme with proper contrast

### 4. Technical Features
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: Modal slide-up animation with proper timing
- **Data Management**: Separate measurement data for inches and centimeters
- **State Management**: Proper state handling for selected size and unit preferences

## Data Structure
```javascript
const sizeData = [
  { size: 'S', waist_cm: '71.1', inseam_cm: '70.1', waist_in: '28.0', inseam_in: '27.6' },
  { size: 'M', waist_cm: '76.2', inseam_cm: '71.1', waist_in: '30.0', inseam_in: '28.0' },
  { size: 'L', waist_cm: '81.3', inseam_cm: '72.4', waist_in: '32.0', inseam_in: '28.5' },
  { size: 'XL', waist_cm: '86.4', inseam_cm: '73.7', waist_in: '34.0', inseam_in: '29.0' },
  { size: 'XXL', waist_cm: '91.4', inseam_cm: '74.9', waist_in: '36.0', inseam_in: '29.5' },
];
```

## Usage
The component is used as a modal that can be triggered from product detail screens:

```javascript
<SizeSelectionModal
  visible={showSizeModal}
  onClose={() => setShowSizeModal(false)}
  product={product}
  activeSize={selectedSize}
  setActiveSize={setSelectedSize}
  navigation={navigation}
/>
```

## Files Modified
- `src/screens/productdetailsmainsizeselectionchart.js` - Main component implementation

## Design Reference
- Figma Design: Size Chart Tab (Node ID: 10011:7236)
- Figma Design: How To Measure Tab (Node ID: 56:3373)
