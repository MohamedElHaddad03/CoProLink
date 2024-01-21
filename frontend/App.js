import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './Context/AuthContext';
import MainScreen from './mainScreen'; // Your main component
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
