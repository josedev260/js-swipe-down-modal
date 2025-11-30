import React from "react";
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const ScreenHeight = Dimensions.get("window").height;

const SwipeDownModal = ({ visible, onClose, bgColor = "#fff", children }) => {
  const translateY = useSharedValue(500);

  React.useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 15 });
    }
  }, [visible]);

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd(() => {
      if (translateY.value > 160) {
        translateY.value = withTiming(500, { duration: 200 }, () => {
          runOnJS(onClose)();
        });
      } else {
        translateY.value = withSpring(0, { damping: 15 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onClose} />

      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[styles.modal, animatedStyle, { backgroundColor: bgColor }]}
          >
            <View style={styles.handle} />
            {children}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default SwipeDownModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  modal: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    maxHeight: ScreenHeight * 0.8,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 10,
    paddingHorizontal: 5,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 10,
  },
  handle: {
    width: 100,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },
});
