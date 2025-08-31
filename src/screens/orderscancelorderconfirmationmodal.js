import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontFamilies, FontSizes } from "../constants/styles";

const DEVICE_HEIGHT = Dimensions.get("window").height;

// Font constants to match your app structure
const FONT_FAMILY = {
  REGULAR: FontFamilies.regular,
  BOLD: FontFamilies.bold,
};

const FONT_SIZE = {
  S: FontSizes.sm,
  MEDIUM: FontSizes.lg,
  LARGE: FontSizes.xl,
};

const CancelledOrderConfirm = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
    close() {
      setVisible(false);
    },
  }));

  return (
   <Modal transparent visible={visible} animationType="slide">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setVisible(false)}
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 25,
              // alignItems: "center",
              maxHeight: DEVICE_HEIGHT * 0.6,
            }}
          >
          
        
          {/* Heading */}
          <Text
            style={{
              fontSize: FONT_SIZE.LARGE,
              fontFamily: FONT_FAMILY.BOLD,
              marginTop: 10,
              textAlign: "center",
              // paddingVertical: 10,
            }}
          >
            Your Order has been Cancelled !
          </Text>

          {/* Subtext */}
          <Text
            style={{
              textAlign: "center",
              fontSize: FONT_SIZE.S,
              fontFamily: FONT_FAMILY.BOLD,
              color: "gray",
              marginVertical: 20,
            }}
          >
            Your cancellation has been processed and you wont be charged. It can take a few minutes for this page to show your orders status updated.
          </Text>
          {/* done button */}
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              backgroundColor: "black",
              borderWidth: 1,
              borderColor: "lightgray",
              width: "100%",
              paddingVertical: 15,
              borderRadius: 30,
              marginBottom: 10,
              alignItems: "center",alignSelf:'center'
            }}
          >
            <Text style={{ color: "white",  fontFamily: FONT_FAMILY.BOLD,
                                      fontSize: FONT_SIZE.MEDIUM,}}>
             Got it 
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
});

export default CancelledOrderConfirm;
