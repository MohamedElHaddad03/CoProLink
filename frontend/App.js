// App.js
import React, { useState } from 'react';
import { AuthProvider } from './Context/AuthContext'; // Assurez-vous de définir le chemin correct
import LoginScreen from './components/Login';
import ProfileScreen from './components/Profile';
import Sidebar from './components/sideBar';
import { SafeAreaView } from 'react-native';
import ControllerComponent from './components/Controller';

const App = () => {
  const [selectedItem, setSelectedItem] = useState('Profile');

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <AuthProvider>
        <Sidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        <ControllerComponent selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      </AuthProvider>
    </SafeAreaView>
  );
};

export default App;
