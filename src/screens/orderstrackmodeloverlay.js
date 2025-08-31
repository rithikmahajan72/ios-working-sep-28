import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, View, Text, TouchableOpacity, Dimensions, StatusBar } from "react-native";
import { FontFamilies, FontSizes } from "../constants/styles";

const DEVICE_HEIGHT = Dimensions.get("window").height;

// Font constants to match your app structure
const FONT_FAMILY = {
  REGULAR: FontFamilies.regular,
  BOLD: FontFamilies.bold,
};

const FONT_SIZE = {
  XS: FontSizes.xs,
  S: FontSizes.sm,
  LARGE: FontSizes.xl,
};

// Simple cross icon component since Vector 2.svg is not available
const CrossIcon = ({ width, height }) => (
  <View
    style={{
      width: width,
      height: height,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ fontSize: width * 0.8, color: '#000', fontWeight: 'bold' }}>×</Text>
  </View>
);

const TrackingModal = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [trackingData, setTrackingData] = useState([]);

  // Static master steps
  const masterSteps = [
    { status: "Packing" },
    { status: "Picked" },
    { status: "In Transit" },
    { status: "Delivered" },
  ];

  useImperativeHandle(ref, () => ({
    openModal(data) {
      setTrackingData(data || []);
      setVisible(true);
    },
    closeModal() {
      setVisible(false);
    },
  }));

  const isStatusCompleted = (status) =>
    trackingData.find((step) => step.status === status);

  const getStepDetails = (status) =>
    trackingData.find((step) => step.status === status) || {};

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
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
            backgroundColor: "#fff",
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: DEVICE_HEIGHT * 0.7,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: FONT_SIZE.LARGE,
                fontFamily: FONT_FAMILY.BOLD,
              }}
            >
              Order Status
            </Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <CrossIcon
                width={DEVICE_HEIGHT * 0.02}
                height={DEVICE_HEIGHT * 0.02}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: 1,
              width: "100%",
              alignSelf: "center",
              backgroundColor: "#ccc",
              marginVertical: 10,
            }}
          />

          {masterSteps.map((step, index) => {
            const isFilled = isStatusCompleted(step.status);
            const stepData = getStepDetails(step.status);
            const isLast = index === masterSteps.length - 1;

            return (
              <View key={index} style={{ flexDirection: "row", gap: 10 }}>
                {/* Dot & Line */}
                <View style={{ alignItems: "center", alignSelf: "flex-start" }}>
                  {/* Dot */}
                  <View
                    style={{
                      width: DEVICE_HEIGHT * 0.02,
                      height: DEVICE_HEIGHT * 0.02,
                      borderRadius: DEVICE_HEIGHT * 0.01,
                      borderColor: isFilled ? "black" : "gray",
                      borderWidth: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isFilled && (
                      <View
                        style={{
                          width: DEVICE_HEIGHT * 0.01,
                          height: DEVICE_HEIGHT * 0.01,
                          borderRadius: DEVICE_HEIGHT * 0.005,
                          backgroundColor: "black",
                        }}
                      />
                    )}
                  </View>

                  {/* Line below dot */}
                  {!isLast && (
                    <View
                      style={{
                        height: DEVICE_HEIGHT * 0.04,
                        width: DEVICE_HEIGHT * 0.002,
                        backgroundColor: isFilled ? "black" : "gray",
                      }}
                    />
                  )}
                </View>

                {/* Text Info */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: FONT_SIZE.S,
                      fontFamily: FONT_FAMILY.REGULAR,
                      color: "#000",
                    }}
                  >
                    {step.status}
                  </Text>
                  <Text
                    style={{
                      fontSize: FONT_SIZE.XS,
                      fontFamily: FONT_FAMILY.REGULAR,
                      color: "gray",
                    }}
                    numberOfLines={1}
                  >
                    {stepData.location || ""}
                  </Text>
                </View>
              </View>
            );
          })}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
});

export default TrackingModal;
