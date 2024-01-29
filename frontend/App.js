import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from './Context/AuthContext';
import MainScreen from './mainScreen'; // Your main component
import { useEffect, useState } from 'react';
export default function App() {
 
  return (
    // <View >
      <AuthProvider>
      <MainScreen />
    </AuthProvider>
    //  {/* <StatusBar style="auto" /> */}
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});
