import React from "react";
import {
  Dimensions,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  ScrollView,
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
  const keyboardHeight = useSharedValue(0);
  const scrollY = useSharedValue(0);

  React.useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 15 });
    }
  }, [visible]);

  React.useEffect(() => {
    const show = Keyboard.addListener("keyboardWillShow", (e) => {
      keyboardHeight.value = withTiming(e.endCoordinates.height, {
        duration: 250,
      });
    });

    const hide = Keyboard.addListener("keyboardWillHide", () => {
      keyboardHeight.value = withTiming(0, { duration: 250 }, () => {
        translateY.value = withSpring(0, { damping: 15 });
      });
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      "worklet";
      if (scrollY.value <= 0 && event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd(() => {
      "worklet";
      if (translateY.value > 160) {
        translateY.value = withTiming(500, { duration: 200 }, () => {
          runOnJS(onClose)();
        });
      } else {
        translateY.value = withSpring(0, { damping: 15 });
      }
    });

  const scrollGesture = Gesture.Native();

  const sheetGesture = Gesture.Simultaneous(pan, scrollGesture);

  const animatedStyle = useAnimatedStyle(() => {
    const maxUp = -keyboardHeight.value;
    const y = translateY.value;

    return {
      transform: [{ translateY: y < maxUp ? maxUp : y }],
    };
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onClose} />

      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={sheetGesture}>
          <Animated.View
            style={[styles.modal, animatedStyle, { backgroundColor: bgColor }]}
          >
            <View style={styles.handle} />

            <ScrollView
              onScroll={(e) => {
                scrollY.value = e.nativeEvent.contentOffset.y;
              }}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40 }}
            >
              {children}
            </ScrollView>
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
    maxHeight: ScreenHeight * 0.85,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 10,
    paddingHorizontal: 10,
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
