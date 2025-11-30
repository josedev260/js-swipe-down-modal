# js-swipe-down-modal

[![npm version](https://img.shields.io/npm/v/js-swipe-down-modal.svg)](https://www.npmjs.com/package/js-swipe-down-modal)
[![License](https://img.shields.io/npm/l/js-swipe-down-modal.svg)](LICENSE)

**js-swipe-down-modal** is a lightweight, smooth, and customizable **swipe-down modal for React Native**.  
Built with **Reanimated 3** and **React Native Gesture Handler**, it provides a modern, native-feeling modal experience with swipe-to-dismiss functionality and backdrop press support.

---

## Features

- Swipe down to dismiss
- Tap backdrop to dismiss
- Smooth spring animations
- Works on both iOS and Android
- Fully customizable modal content
- Lightweight and easy to integrate
- No BackHandler crashes or deprecated API usage

---

## Installation

```bash
npm install js-swipe-down-modal
# or
yarn add js-swipe-down-modal
```

**Peer dependencies** (ensure your project has these):

```bash
react-native >= 0.70.0
react-native-reanimated >= 3.0.0
react-native-gesture-handler >= 2.0.0
```

---

## Usage

```jsx
import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import SwipeDownModal from "js-swipe-down-modal";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Open Modal" onPress={() => setShowModal(true)} />

      <SwipeDownModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        bgColor="#fff"
      >
        <KeyboardAvoidingView behavior="padding">
          <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Hello from js-swipe-down-modal!
            </Text>
            <Text style={{ marginTop: 10 }}>
              This is a swipe-down dismissible modal created by Joseph Kyondera.
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SwipeDownModal>
    </View>
  );
}
```

---

## Props

| Prop       | Type       | Required | Description                      |
| ---------- | ---------- | -------- | -------------------------------- |
| `visible`  | `boolean`  | ✅       | Controls modal visibility        |
| `onClose`  | `function` | ✅       | Callback when modal is dismissed |
| `bgColor`  | `function` | ✅       | Changing background color        |
| `children` | `node`     | ✅       | Modal content                    |

---

## Styling & Customization

The modal container has default styling:

- Rounded top corners (`borderTopLeftRadius`, `borderTopRightRadius`)
- Drop shadow / elevation
- Swipe handle bar at the top

You can wrap your custom content inside `children` and style it as needed.

---

## Author

**Joseph Kyondera** – [GitHub](https://github.com/nzoyi) | [Website](https://galacticbytestudio.com)

---

## License

MIT License – see [LICENSE](LICENSE)
