// MainScreen.js
import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './Context/AuthContext'; // Assurez-vous de définir le chemin correct
import LoginScreen from './components/Login';
import ProfileScreen from './components/Profile';
import Sidebar from './components/sideBar';
import { SafeAreaView, View } from 'react-native';
import ControllerComponent from './components/Controller';
import LoginStack from './stacks/loginStack';
import SidebarAdmin from './components/sideBarAdmin';
import SidebarUser from './components/sideBarUser';

const MainScreen = () => {
  const [selectedItem, setSelectedItem] = useState('Profile');
 // const [user1,setUser]=useState(null)
  const { user } = useAuth();
 
  
console.log("main",user)

  return (
    
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>

        {user   ? (
          <>
              {user.User?.profile?.role=="syndic" &&
            <Sidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
              }
              {user.User?.profile?.role=="admin" &&
            <SidebarAdmin selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
              }
              {user.User?.profile?.role=="proprietaire" &&
            <SidebarUser selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
              }

            <ControllerComponent selectedItem={selectedItem} setSelectedItem={setSelectedItem} />

          </>
        ) : (
          <LoginStack />
        )}
       
      </SafeAreaView>
      
  );
};

export default MainScreen;



