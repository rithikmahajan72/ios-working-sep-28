import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

class GoogleAuthService {
  constructor() {
    this.isConfigured = false;
    this.configure();
  }

  configure() {
    try {
      GoogleSignin.configure({
        // Web Client ID from your Firebase project
        webClientId: '133733122921-cr74erk8tdpgt1akts7juqq0cm44bjda.apps.googleusercontent.com',
        offlineAccess: true,
        hostedDomain: '',
        forceCodeForRefreshToken: true,
      });
      this.isConfigured = true;
      console.log('Google Sign In configured successfully');
    } catch (error) {
      console.error('Google Sign In configuration error:', error);
      this.isConfigured = false;
    }
  }

  async signInWithGoogle() {
    if (!this.isConfigured) {
      throw new Error('Google Sign In is not configured. Please set up your webClientId.');
    }

    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Get the users ID token
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Sign In userInfo:', userInfo);
      
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.data?.idToken || userInfo.idToken,
        userInfo.data?.accessToken || userInfo.accessToken
      );

      console.log('Google credential created successfully');
      
      // Sign in with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      
      console.log('Firebase Google Sign In successful:', userCredential.user);
      
      return userCredential;
    } catch (error) {
      console.error('Google Sign In error:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error('Google Sign In was canceled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        throw new Error('Google Sign In is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error('Google Play Services not available');
      } else {
        throw new Error(`Google Sign In failed: ${error.message}`);
      }
    }
  }

  async signOut() {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
      console.log('Google Sign Out successful');
    } catch (error) {
      console.error('Google Sign Out error:', error);
    }
  }

  async isSignedIn() {
    try {
      return await GoogleSignin.isSignedIn();
    } catch (error) {
      console.error('Error checking Google Sign In status:', error);
      return false;
    }
  }
}

export default new GoogleAuthService();
