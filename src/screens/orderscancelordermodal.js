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
  MEDIUM: FontSizes.lg,
  LARGE: FontSizes.xl,
};

const CancelOrderRequest = forwardRef((props, ref) => {
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
            maxHeight: DEVICE_HEIGHT * 0.6,
          }}
        >
          {/* Heading */}
          <Text
            style={{
              fontSize: FONT_SIZE.LARGE,
              fontFamily: FONT_FAMILY.BOLD,
              marginTop: 10,
              textAlign: "left",
            }}
          >
            Want to cancel your order ?
          </Text>

          {/* Subtext */}
          <Text
            style={{
              fontSize: FONT_SIZE.MEDIUM,
              fontFamily: FONT_FAMILY.BOLD,
              color: "gray",
              marginVertical: 10,
            }}
          >
            You can cancel order for a short time after they are placed - free of charge.
          </Text>

          {/* Buttons */}
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              // Open confirmation modal after a short delay to allow the current modal to close
              setTimeout(() => {
                props.onRequestConfirmed?.();
              }, 300);
            }}
            style={{
              backgroundColor: "black",
              width: "100%",
              paddingVertical: 15,
              borderRadius: 30,
              marginVertical: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ 
              color: "white", 
              fontFamily: FONT_FAMILY.BOLD,
              fontSize: FONT_SIZE.MEDIUM 
            }}>
              Cancel Order
            </Text>
          </TouchableOpacity>
          
          {/* go back button */}
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "lightgray",
              width: "100%",
              paddingVertical: 15,
              borderRadius: 30,
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ 
              color: "black",  
              fontFamily: FONT_FAMILY.BOLD,
              fontSize: FONT_SIZE.MEDIUM, 
            }}>
              Go Back
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
});

export default CancelOrderRequest;
