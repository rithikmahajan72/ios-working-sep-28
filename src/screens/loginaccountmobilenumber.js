import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import GlobalBackButton from '../components/GlobalBackButton';

const LoginAccountMobileNumber = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' or 'email'

  const handleLogin = () => {
    // Handle login logic
    
    // Navigate to verification code screen
    if (navigation) {
      navigation.navigate('LoginAccountMobileNumberVerificationCode');
    }
  };

  const handleSignUp = () => {
    // Navigate to create account screen
    if (navigation) {
      navigation.navigate('CreateAccountMobileNumber');
    }
  };

  const handleSocialLogin = (provider) => {
    // Handle social login
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header with Global Back button */}
        <View style={styles.header}>
          <GlobalBackButton 
            navigation={navigation}
            onPress={() => navigation && navigation.navigate('Rewards')}
          />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Log into your account</Text>
        </View>

        {/* Toggle Switch for Phone/Email */}
        <View style={styles.toggleContainer}>
          <View style={styles.toggleWrapper}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                loginMethod === 'phone' && styles.toggleButtonActive,
              ]}
              onPress={() => setLoginMethod('phone')}
            >
              <Text style={[
                styles.toggleText,
                loginMethod === 'phone' && styles.toggleTextActive,
              ]}>
                Phone
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                loginMethod === 'email' && styles.toggleButtonActive,
              ]}
              onPress={() => {
                setLoginMethod('email');
                if (navigation) {
                  navigation.navigate('LoginAccountEmail');
                }
              }}
            >
              <Text style={[
                styles.toggleText,
                loginMethod === 'email' && styles.toggleTextActive,
              ]}>
                Email
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Container */}
        <View style={styles.inputContainer}>
          {loginMethod === 'phone' ? (
            <View style={styles.phoneInputWrapper}>
              {/* Country Code Section */}
              <View style={styles.countrySection}>
                <View style={styles.flagContainer}>
                  <View style={styles.indianFlag}>
                    <View style={[styles.flagStripe, { backgroundColor: '#FF8C1A' }]} />
                    <View style={[styles.flagStripe, { backgroundColor: '#FFFFFF' }]} />
                    <View style={[styles.flagStripe, { backgroundColor: '#5EAA22' }]} />
                  </View>
                </View>
                <Text style={styles.countryCode}>+91</Text>
                <Text style={styles.chevron}>⌄</Text>
              </View>
              
              {/* Separator Line */}
              <View style={styles.separator} />
              
              {/* Mobile Number Input */}
              <TextInput
                style={styles.mobileInput}
                placeholder="Mobile Number"
                placeholderTextColor="#848688"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          ) : (
            <TextInput
              style={styles.emailInput}
              placeholder="Email Address"
              placeholderTextColor="#848688"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        </View>

        {/* Login Button */}
        <TouchableOpacity 
          style={[
            styles.loginButton,
            !mobileNumber && styles.loginButtonDisabled
          ]} 
          onPress={handleLogin}
          disabled={!mobileNumber}
        >
          <Text style={[
            styles.loginButtonText,
            !mobileNumber && styles.loginButtonTextDisabled
          ]}>
            LOGIN
          </Text>
        </TouchableOpacity>

        {/* Or log in with */}
        <View style={styles.dividerContainer}>
          <Text style={styles.dividerText}>or log in with</Text>
        </View>

        {/* Social Login Options */}
        <View style={styles.socialContainer}>
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => handleSocialLogin('apple')}
          >
            <Text style={styles.appleIcon}>🍎</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => handleSocialLogin('google')}
          >
            <Text style={styles.googleIcon}>G</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 32,
    paddingTop: 20,
  },
  titleContainer: {
    paddingHorizontal: 33,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    color: '#000000',
    lineHeight: 48,
  },
  toggleContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  toggleWrapper: {
    flexDirection: 'row',
    backgroundColor: '#EDEDED',
    borderRadius: 50,
    height: 30,
    width: 124,
  },
  toggleButton: {
    flex: 1,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#000000',
  },
  toggleText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
  },
  toggleTextActive: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  inputContainer: {
    marginHorizontal: 38,
    marginTop: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    height: 47,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 11,
  },
  countrySection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagContainer: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    overflow: 'hidden',
    marginRight: 8,
  },
  indianFlag: {
    flex: 1,
    flexDirection: 'column',
  },
  flagStripe: {
    flex: 1,
  },
  countryCode: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    color: '#000000',
    marginRight: 4,
    letterSpacing: -0.35,
  },
  chevron: {
    fontSize: 12,
    color: '#848688',
    marginRight: 8,
  },
  separator: {
    width: 1,
    height: 34,
    backgroundColor: '#E9E9E9',
    marginRight: 16,
  },
  mobileInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    height: '100%',
    letterSpacing: -0.35,
  },
  emailInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    height: '100%',
    paddingHorizontal: 16,
    letterSpacing: -0.35,
  },
  loginButton: {
    marginHorizontal: 38,
    marginTop: 50,
    backgroundColor: '#000000',
    borderRadius: 26.5,
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    lineHeight: 24,
  },
  loginButtonTextDisabled: {
    color: '#999999',
  },
  dividerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  dividerText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    opacity: 0.6,
    letterSpacing: 0.24,
    lineHeight: 24,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  socialButton: {
    width: 42,
    height: 42,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#332218',
    opacity: 0.14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appleIcon: {
    fontSize: 18,
    color: '#332218',
  },
  googleIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#332218',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 33,
    marginBottom: 40,
  },
  signupText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    lineHeight: 20,
  },
  signupLink: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
});

export default LoginAccountMobileNumber;
