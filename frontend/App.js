import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from './Context/AuthContext';
import MainScreen from './mainScreen'; // Your main component
import { useEffect, useState } from 'react';
export default function App() {
  Platform.OS === "android" && StatusBar.setBackgroundColor("transparent");
  Platform.OS === "android" && StatusBar.setTranslucent(true);
  return (
    <GestureHandlerRootView style={{ flex: 1, top: 0 }}>
      <AuthProvider>
        <MainScreen />
      </AuthProvider>

    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: StatusBar.currentHeight,
  },
});