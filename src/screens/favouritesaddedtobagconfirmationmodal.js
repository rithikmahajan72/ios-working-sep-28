import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Colors, FontFamilies } from '../constants';

const FavouritesAddedToBagConfirmationModal = ({ navigation }) => {

  const handleViewBag = () => {
    // Navigate to bag screen and close all modals
    navigation.navigate('Bag');
  };

  const handleClose = () => {
    // Go back to the previous screen (likely the favorites screen)
    navigation.navigate('favourites');
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.overlayBackground} 
          onPress={handleClose}
          activeOpacity={1}
        />
        
        <View style={styles.modalContainer}>
          {/* Drawer Handle */}
          <View style={styles.drawerHandle} />
          
          {/* Success Icon */}
          <View style={styles.successIconContainer}>
            <View style={styles.successIconBackground}>
              <View style={styles.successIcon}>
                {/* Checkmark SVG equivalent */}
                <View style={styles.checkmark}>
                  <View style={styles.checkmarkStem} />
                  <View style={styles.checkmarkKick} />
                </View>
              </View>
            </View>
          </View>
          
          {/* Added to Bag Text */}
          <Text style={styles.addedToBagText}>Added to Bag</Text>
          
          {/* View Bag Button */}
          <TouchableOpacity 
            style={styles.viewBagButton}
            onPress={handleViewBag}
          >
            <Text style={styles.viewBagButtonText}>View Bag</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  overlayBackground: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 34,
    height: 467,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  drawerHandle: {
    width: 64,
    height: 6,
    backgroundColor: '#E6E6E6',
    borderRadius: 40,
    position: 'absolute',
    top: 8,
    alignSelf: 'center',
  },
  successIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successIconBackground: {
    width: 81,
    height: 81,
    borderRadius: 40.5,
    backgroundColor: 'rgba(80, 138, 123, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    width: 54.166,
    height: 54.166,
    borderRadius: 27.083,
    backgroundColor: '#508A7B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    width: 20,
    height: 15,
    position: 'relative',
  },
  checkmarkStem: {
    position: 'absolute',
    left: 11,
    top: 6,
    width: 8,
    height: 2,
    backgroundColor: Colors.white,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  checkmarkKick: {
    position: 'absolute',
    left: 6,
    top: 9,
    width: 5,
    height: 2,
    backgroundColor: Colors.white,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
  },
  addedToBagText: {
    fontSize: 24,
    fontWeight: '500',
    fontFamily: FontFamilies.montserrat,
    color: Colors.black,
    textAlign: 'center',
    letterSpacing: -0.96,
    lineHeight: 28.8,
    marginBottom: 120,
  },
  viewBagButton: {
    backgroundColor: Colors.black,
    borderRadius: 100,
    width: 331,
    height: 61,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 34,
  },
  viewBagButtonText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FontFamilies.montserrat,
    color: Colors.white,
    lineHeight: 19.2,
  },
});

export default FavouritesAddedToBagConfirmationModal;
