// App.js
import React from 'react';

import LoginScreen from './components/Login';
import ProfileScreen from './components/Profile';
import DocumentsManager from './components/DocumentsManager';
import Sidebar from './components/sideBar'
import { SafeAreaView, StatusBar, View } from 'react-native';

const App = () => {
  return (
    //<LoginScreen/>
    // <SafeAreaViewBase>
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
     
        <Sidebar />
     
        <DocumentsManager />

      
    </SafeAreaView>
   // {/* </SafeAreaViewBase> */}
  );
};

export default App;
