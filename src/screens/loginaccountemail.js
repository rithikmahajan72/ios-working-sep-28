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

const LoginAccountEmail = ({ navigation }) => {
  const [isEmailSelected, setIsEmailSelected] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailLogin = () => {
    // TODO: Implement actual email login logic
    // Login logic removed for production logging
    
    if (navigation && navigation.navigate) {
      navigation.navigate('LoginAccountEmailVerificationCode', { email });
    }
  };

  const handleToggle = (type) => {
    setIsEmailSelected(type === 'email');
    if (type === 'phone') {
      // Navigate to mobile number login screen
      if (navigation) {
        navigation.navigate('LoginAccountMobileNumber');
      }
    }
  };

  const handleSignUpLink = () => {
    // Handle "Sign Up" link in the footer
    if (navigation) {
      navigation.navigate('CreateAccountEmail');
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password
    // Forgot password logging removed for production
    // Navigate to forgot password screen
    if (navigation) {
      navigation.navigate('ForgotLoginPassword');
    }
  };

  const handleAppleLogin = () => {
    // Handle Apple login
    // Apple login logging removed for production
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    // Google login logging removed for production
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

        {/* Toggle between Phone and Email */}
        <View style={styles.toggleContainer}>
          <View style={styles.toggleBackground}>
            <TouchableOpacity
              style={[
                styles.toggleOption,
                !isEmailSelected && styles.toggleOptionActive,
              ]}
              onPress={() => handleToggle('phone')}
            >
              <Text
                style={[
                  styles.toggleText,
                  !isEmailSelected && styles.toggleTextActive,
                ]}
              >
                Phone
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleOption,
                isEmailSelected && styles.toggleOptionActive,
              ]}
              onPress={() => handleToggle('email')}
            >
              <Text
                style={[
                  styles.toggleText,
                  isEmailSelected && styles.toggleTextActive,
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Email Field */}
          <View style={styles.inputField}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              placeholderTextColor="#BDBCBC"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.underline} />
          </View>

          {/* Password Field */}
          <View style={styles.inputField}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                placeholder="Password"
                placeholderTextColor="#BDBCBC"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeText}>{showPassword ? '👁️' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.underline} />
          </View>
        </View>

        {/* Forgot Password Link */}
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleEmailLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        {/* Divider with "or log in with" */}
        <View style={styles.dividerSection}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or log in with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={handleAppleLogin}>
            <Text style={styles.appleIcon}>🍎</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
            <Text style={styles.googleIcon}>G</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text style={styles.footerLink} onPress={handleSignUpLink}>
              Sign Up
            </Text>
          </Text>
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
    marginTop: 66,
  },
  toggleBackground: {
    flexDirection: 'row',
    backgroundColor: '#ededed',
    borderRadius: 15,
    height: 30,
    width: 124,
  },
  toggleOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  toggleOptionActive: {
    backgroundColor: '#000000',
  },
  toggleText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
  },
  toggleTextActive: {
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
  },
  formContainer: {
    paddingHorizontal: 33,
    marginTop: 48,
  },
  inputField: {
    marginBottom: 20,
    height: 50,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    color: '#000000',
    paddingVertical: 0,
    paddingBottom: 12,
    height: 30,
    letterSpacing: 0.32,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    padding: 5,
  },
  eyeText: {
    fontSize: 16,
    color: '#979797',
  },
  underline: {
    height: 1,
    backgroundColor: '#D6D6D6',
    marginTop: 8,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 33,
    marginTop: 10,
  },
  forgotPasswordText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 24,
  },
  loginButton: {
    marginHorizontal: 33,
    marginTop: 40,
    backgroundColor: '#000000',
    borderRadius: 26.5,
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    lineHeight: 24,
  },
  dividerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 33,
    marginTop: 40,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E9E9E9',
  },
  dividerText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    opacity: 0.6,
    marginHorizontal: 16,
    letterSpacing: 0.24,
    lineHeight: 24,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 36,
    gap: 20,
  },
  socialButton: {
    width: 42,
    height: 42,
    borderRadius: 30,
    backgroundColor: '#ffffff',
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
  footer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
    paddingHorizontal: 33,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    lineHeight: 20,
  },
  footerLink: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});

export default LoginAccountEmail;