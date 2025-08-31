import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import BottomNavigationBar from './bottomnavigationbar';
import { Colors, FontSizes, FontWeights, Spacing } from '../constants';
import { HomeScreen, FavouritesScreen, FavouritesContent, FavouritesContentEditView, FavouritesModalOverlayForSizeSelection, FavouritesAddedToBagConfirmationModal, FavouritesSizeChartReference, ShopScreen, CollectionScreen, FiltersScreen, SearchScreen, ScanBarcodeFlow, RewardsScreen, ProfileScreen, BagScreen, CreateAccountMobileNumber, CreateAccountEmail, CreateAccountEmailSuccessModal, CreateAccountMobileNumberVerification, CreateAccountMobileNumberAccountCreatedConfirmationModal, LoginAccountMobileNumber, LoginAccountEmail, ForgotLoginPassword, ForgotLoginPasswordVerificationCode, ForgotLoginPasswordCreateNewPassword, ForgotLoginPasswordConfirmationModal, LoginAccountMobileNumberVerificationCode, LoginAccountEmailVerificationCode, TermsAndConditions, PreferenceSelector, OrdersScreen, EditProfile, SettingsScreen, DeliveryAddressesSettings, CommunicationPreferences, LinkedAccountScreen, DeleteAccount, DeleteAccountConfirmation, ProfileVisibilityScreen, ContactUsScreen, InvoiceScreen, LoveUsRateUs, FAQScreen, ProductViewOne, ProductViewTwo, ProductViewThree, ProductDetailsMain, ProductDetailsMainReview, ProductDetailsReviewThreePointSelection, ProductDetailsWrittenUserReview, DeliveryOptionsStepOneScreen, Language, Region, MembersExclusive, PointsHistory, InviteAFriend, OrdersReturnExchange, OrdersExchangeSizeSelectionChart, OrdersCancelOrderModal, OrdersReturnRequest, OrdersReturnAcceptedModal, Inbox, OrderConfirmationPhone, DeliveryOptionsStepFourIfCustomRequired } from '../screens';

// Placeholder content components for each tab
const HomeContent = ({ navigation }) => <HomeScreen navigation={navigation} />;
const ShopContent = ({ navigation }) => <ShopScreen navigation={navigation} />;
const CollectionContent = ({ navigation }) => <CollectionScreen navigation={navigation} />;
const RewardsContent = ({ navigation, route }) => <RewardsScreen navigation={navigation} route={route} />;
const ProfileContent = ({ navigation }) => <ProfileScreen navigation={navigation} />;

// Enhanced Layout with improved navigation handling
const EnhancedLayout = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [headerTitle, setHeaderTitle] = useState('YORAA');
  const [routeParams, setRouteParams] = useState(null);

  // Navigation context for handling screen navigation
  const navigation = {
    navigate: (screenName, params) => {
      if (['Home', 'Shop', 'Collection', 'Rewards', 'Profile'].includes(screenName)) {
        setActiveTab(screenName);
        setCurrentScreen(screenName);
      } else {
        setCurrentScreen(screenName);
      }
      setRouteParams(params || null);
    },
    replace: (screenName, params) => {
      // Replace current screen with new screen (similar to navigate but more explicit)
      if (['Home', 'Shop', 'Collection', 'Rewards', 'Profile'].includes(screenName)) {
        setActiveTab(screenName);
        setCurrentScreen(screenName);
      } else {
        setCurrentScreen(screenName);
      }
      setRouteParams(params || null);
    },
    goBack: () => {
      // Handle back navigation to previous screen
      if (routeParams?.previousScreen) {
        setCurrentScreen(routeParams.previousScreen);
        if (['Home', 'Shop', 'Collection', 'Rewards', 'Profile'].includes(routeParams.previousScreen)) {
          setActiveTab(routeParams.previousScreen);
        }
      } else {
        // Default back to Home if no previous screen
        setCurrentScreen('Home');
        setActiveTab('Home');
      }
      
      setRouteParams(null);
    },
    route: { params: routeParams },
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setCurrentScreen(tabName);
    setHeaderTitle(tabName === 'Home' ? 'YORAA' : tabName);
  };

  const renderContent = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeContent navigation={navigation} />;
      case 'favourites':
        return <FavouritesScreen navigation={navigation} />;
      case 'FavouritesContent':
        return <FavouritesContent navigation={navigation} />;
      case 'FavouritesContentEditView':
        return <FavouritesContentEditView navigation={navigation} />;
      case 'FavouritesModalOverlayForSizeSelection':
        return <FavouritesModalOverlayForSizeSelection navigation={navigation} route={{ params: routeParams }} />;
      case 'FavouritesAddedToBagConfirmationModal':
        return <FavouritesAddedToBagConfirmationModal navigation={navigation} route={{ params: routeParams }} />;
      case 'FavouritesSizeChartReference':
        return <FavouritesSizeChartReference navigation={navigation} route={{ params: routeParams }} />;
      case 'Shop':
        return <ShopContent navigation={navigation} />;
      case 'Collection':
        return <CollectionContent navigation={navigation} />;
      case 'Filters':
        return <FiltersScreen navigation={navigation} route={{ params: routeParams }} />;
      case 'SearchScreen':
        return <SearchScreen navigation={navigation} route={{ params: routeParams }} />;
      case 'ScanBarcode':
        return <ScanBarcodeFlow navigation={navigation} />;
      case 'Rewards':
        return <RewardsContent navigation={navigation} route={{ params: routeParams }} />;
      case 'Profile':
        return <ProfileContent navigation={navigation} />;
      case 'Bag':
        return <BagScreen navigation={navigation} />;
      case 'CreateAccountMobileNumber':
        return <CreateAccountMobileNumber navigation={navigation} />;
      case 'CreateAccountEmail':
        return <CreateAccountEmail navigation={navigation} />;
      case 'CreateAccountEmailSuccessModal':
        return <CreateAccountEmailSuccessModal navigation={navigation} />;
      case 'CreateAccountMobileNumberVerification':
        return <CreateAccountMobileNumberVerification navigation={navigation} />;
      case 'CreateAccountMobileNumberAccountCreatedConfirmationModal':
        return <CreateAccountMobileNumberAccountCreatedConfirmationModal navigation={navigation} />;
      case 'LoginAccountMobileNumber':
        return <LoginAccountMobileNumber navigation={navigation} />;
      case 'LoginAccountEmail':
        return <LoginAccountEmail navigation={navigation} />;
      case 'ForgotLoginPassword':
        return <ForgotLoginPassword navigation={navigation} />;
      case 'ForgotLoginPasswordVerificationCode':
        return <ForgotLoginPasswordVerificationCode navigation={navigation} route={{ params: routeParams }} />;
      case 'forgotloginpqasswordcreatenewpasword':
        return <ForgotLoginPasswordCreateNewPassword navigation={navigation} route={{ params: routeParams }} />;
      case 'ForgotLoginPasswordConfirmationModal':
        return <ForgotLoginPasswordConfirmationModal navigation={navigation} />;
      case 'LoginAccountMobileNumberVerificationCode':
        return <LoginAccountMobileNumberVerificationCode navigation={navigation} />;
      case 'LoginAccountEmailVerificationCode':
        return <LoginAccountEmailVerificationCode navigation={navigation} route={{ params: routeParams }} />;
      case 'TermsAndConditions':
        return <TermsAndConditions navigation={navigation} />;
      case 'PreferenceSelector':
        return <PreferenceSelector navigation={navigation} />;
      case 'Orders':
        return <OrdersScreen navigation={navigation} route={{ params: routeParams }} />;
      case 'OrdersReturnExchange':
        return <OrdersReturnExchange navigation={navigation} route={{ params: routeParams }} />;
      case 'OrdersReturnRequest':
        return <OrdersReturnRequest navigation={navigation} route={{ params: routeParams }} />;
      case 'OrdersReturnAcceptedModal':
        return <OrdersReturnAcceptedModal navigation={navigation} route={{ params: routeParams }} />;
      case 'OrdersExchangeSizeSelectionChart':
        return <OrdersExchangeSizeSelectionChart navigation={navigation} route={{ params: routeParams }} />;
      case 'OrdersCancelOrder':
        return <OrdersCancelOrderModal navigation={navigation} route={{ params: routeParams }} />;
      case 'EditProfile':
        return <EditProfile navigation={navigation} />;
      case 'Settings':
        return <SettingsScreen navigation={navigation} />;
      case 'DeliveryAddressesSettings':
        return <DeliveryAddressesSettings navigation={navigation} />;
      case 'CommunicationPreferences':
        return <CommunicationPreferences navigation={navigation} />;
      case 'ProfileVisibilityScreen':
        return <ProfileVisibilityScreen navigation={navigation} />;
      case 'LinkedAccount':
        return <LinkedAccountScreen navigation={navigation} />;
      case 'DeleteAccount':
        return <DeleteAccount navigation={navigation} />;
      case 'DeleteAccountConfirmation':
        return <DeleteAccountConfirmation navigation={navigation} />;
      case 'ContactUs':
        return <ContactUsScreen navigation={navigation} />;
      case 'Invoice':
        return <InvoiceScreen navigation={navigation} />;
      case 'LoveUsRateUs':
        return <LoveUsRateUs navigation={navigation} route={{ params: routeParams }} />;
      case 'FAQ':
        return <FAQScreen navigation={navigation} />;
      case 'ProductViewOne':
        return <ProductViewOne navigation={navigation} />;
      case 'ProductViewTwo':
        return <ProductViewTwo navigation={navigation} />;
      case 'ProductViewThree':
        return <ProductViewThree navigation={navigation} />;
      case 'ProductDetailsMain':
        return <ProductDetailsMain navigation={navigation} route={{ params: routeParams }} />;
      case 'ProductDetailsMainReview':
        return <ProductDetailsMainReview navigation={navigation} route={{ params: routeParams }} />;
      case 'ProductDetailsReviewThreePointSelection':
        return <ProductDetailsReviewThreePointSelection navigation={navigation} route={{ params: routeParams }} />;
      case 'ProductDetailsWrittenUserReview':
        return <ProductDetailsWrittenUserReview navigation={navigation} route={{ params: routeParams }} />;
      case 'DeliveryOptionsStepOneScreen':
        return <DeliveryOptionsStepOneScreen navigation={navigation} />;
      case 'Language':
        return <Language navigation={navigation} />;
      case 'Region':
        return <Region navigation={navigation} />;
      case 'MembersExclusive':
        return <MembersExclusive navigation={navigation} />;
      case 'PointsHistory':
        return <PointsHistory navigation={navigation} route={{ params: routeParams }} />;
      case 'InviteAFriend':
        return <InviteAFriend navigation={navigation} route={{ params: routeParams }} />;
      case 'Inbox':
        return <Inbox navigation={navigation} route={{ params: routeParams }} />;
      case 'OrderConfirmationPhone':
        return <OrderConfirmationPhone navigation={navigation} route={{ params: routeParams }} />;
      case 'DeliveryOptionsStepFourIfCustomRequired':
        return <DeliveryOptionsStepFourIfCustomRequired navigation={navigation} route={{ params: routeParams }} />;
      default:
        return <HomeContent />;
    }
  };

  const shouldShowBottomNav = ['Home', 'Shop', 'Collection', 'Rewards', 'Profile'].includes(currentScreen);
  const shouldShowHeader = ['Profile'].includes(currentScreen);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Dynamic Header - Only show for main tabs except Collection and Home */}
        {shouldShowHeader && activeTab !== 'Home' && activeTab !== 'Profile' && (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
          </View>
        )}

        {/* Main Content Area */}
        <View style={styles.mainContent}>
          {renderContent()}
        </View>
      </SafeAreaView>

      {/* Bottom Navigation - Only show for main tabs */}
      {shouldShowBottomNav && (
        <BottomNavigationBar 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
});

export { EnhancedLayout };
export default EnhancedLayout;
