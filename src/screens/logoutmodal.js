import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const LogoutModal = ({ visible, onClose, onSignOut, navigation }) => {
  const handleStay = () => {
    onClose();
  };

  const handleSignOut = () => {
    // Close the modal first
    onClose();
    
    // Navigate to RewardsScreen
    if (navigation) {
      navigation.navigate('Rewards');
    }
    
    // Call the onSignOut callback if provided
    if (onSignOut) {
      onSignOut();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Are you sure you want to leave?</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.stayButton} onPress={handleStay}>
              <Text style={styles.stayButtonText}>stay</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
              <Text style={styles.signOutButtonText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    paddingTop: 43,
    paddingBottom: 40,
    paddingHorizontal: 31,
    width: width * 0.9,
    maxWidth: 380,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 81,
    lineHeight: 22,
    letterSpacing: -0.41,
    fontFamily: 'Montserrat-Bold',
    width: 319,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 0,
  },
  stayButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    height: 56,
    flex: 1,
  },
  stayButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    lineHeight: 19.2,
  },
  signOutButton: {
    backgroundColor: 'transparent',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#e4e4e4',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    height: 56,
    flex: 1,
  },
  signOutButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    lineHeight: 19.2,
  },
});

export default LogoutModal;
