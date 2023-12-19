// App.js
import React , {useState} from 'react';

import LoginScreen from './components/Login';
import ProfileScreen from './components/Profile';
import DocumentsManager from './components/DocumentsManager';
import Sidebar from './components/sideBar'
import { SafeAreaView, StatusBar, View } from 'react-native';
import ControllerComponent from './components/Controller';


const App = () => {

  const [selectedItem, setSelectedItem] = useState(null); 


  return (
    
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
     
        <Sidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
     
        <ControllerComponent selectedItem={selectedItem} />
        
    </SafeAreaView>
  );
};

export default App;
