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

const CreateAccountEmail = ({ navigation }) => {
  const [isEmailSelected, setIsEmailSelected] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSkip = () => {
    // Navigate back or to next screen
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleSignUp = () => {
    // TODO: Implement actual sign up logic
    // Sign up logging removed for production
    
    if (navigation && navigation.navigate) {
      navigation.navigate('CreateAccountEmailSuccessModal');
    }
  };

  const handleToggle = (type) => {
    if (type === 'phone') {
      // Navigate to mobile number screen
      if (navigation) {
        navigation.navigate('CreateAccountMobileNumber');
      }
    }
    // Keep email selected since we're on the email screen
    setIsEmailSelected(true);
  };

  const handleLogInLink = () => {
    // Handle "Log In" link in the footer
    // Navigate to log in - logging removed for production
  };

  const handleLogInNavigation = () => {
    // Navigate to log in screen  
    // Navigation logging removed for production
    if (navigation) {
      navigation.navigate('LoginAccountEmail');
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
        {/* Header with Skip button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>SKIP</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create your account</Text>
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
          {/* Name Field */}
          <View style={styles.inputField}>
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              placeholderTextColor="#BDBCBC"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            <View style={styles.underline} />
          </View>

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

          {/* Confirm Password Field */}
          <View style={styles.inputField}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                placeholder="Confirm Password"
                placeholderTextColor="#BDBCBC"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Text style={styles.eyeText}>{showConfirmPassword ? '👁️' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.underline} />
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>

        {/* Divider with "or sign up with" */}
        <View style={styles.dividerSection}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or sign up with</Text>
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
            Already have account?{' '}
            <Text style={styles.footerLink} onPress={handleLogInLink}>
              Log In
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
    justifyContent: 'flex-end',
    paddingHorizontal: 32,
    paddingTop: 20,
  },
  skipButton: {
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    textAlign: 'right',
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
    marginTop: 40,
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
  signUpButton: {
    marginHorizontal: 33,
    marginTop: 60,
    backgroundColor: '#000000',
    borderRadius: 26.5,
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
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
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
  },
  footerLink: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});

export default CreateAccountEmail;
