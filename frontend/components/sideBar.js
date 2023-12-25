import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Animated, Easing,SafeAreaView, StatusBar } from 'react-native';
import icons from '../constants/icons';
import { Ionicons } from '@expo/vector-icons';

const Sidebar = ({ selectedItem, setSelectedItem }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const largeur = useRef(new Animated.Value(50)).current;
  const iconColor = isSidebarOpen ? '#3b67bb' : '#fff';
  const bgColor = isSidebarOpen ? '#fff' : '#3b67bb';
  const bgColorOpen = isSidebarOpen ? '#3b67bb20' : '#26467c';

  const toggleSidebar = () => {
    const newValue = isSidebarOpen ? 50 : 200;
    Animated.timing(largeur, {
      toValue: newValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    setSidebarOpen(!isSidebarOpen);
  };



const handleItemClick = (item) => {
    setSelectedItem(item); 
  };

  return (

    <Animated.View style={[styles.sidebar, { width: largeur, backgroundColor: bgColor }]}>
      
      <View style={{marginLeft:5}}>
        <TouchableOpacity style={{marginBottom:50}} onPress={toggleSidebar}>
          {!isSidebarOpen && (
            <Ionicons name="menu" size={40} color={iconColor} />
          )}
          {isSidebarOpen && (
            <Ionicons name="close" size={40} color={iconColor} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[
    styles.sidebarItem,
    selectedItem === 'Statistiques' && {backgroundColor:bgColorOpen},
  ]}  onPress={() => handleItemClick('Statistiques')}>
      <Ionicons name={ selectedItem === "Statistiques"? "stats-chart":"stats-chart-outline"} size={26} color={iconColor} />
        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Statistiques</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={[
    styles.sidebarItem,
    selectedItem === 'Documents' && {backgroundColor:bgColorOpen},
  ]} onPress={() => handleItemClick('Documents')}>
      <Ionicons name={ selectedItem === "Documents"? "documents":"documents-outline"} size={26} color={iconColor} />
        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Documents</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={[
    styles.sidebarItem,
    selectedItem === 'Login' && {backgroundColor:bgColorOpen},
  ]} onPress={() => handleItemClick('Login')}>
      <Ionicons name={ selectedItem === "Login"? "documents":"documents-outline"} size={26} color={iconColor} />
        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Documents</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={[
    styles.sidebarItem,
    selectedItem === 'Depenses' && {backgroundColor:bgColorOpen},
  ]} onPress={() => handleItemClick('Depenses')}>
      <Ionicons name={ selectedItem === "Depenses"? "cash":"cash-outline"} size={26} color={iconColor} />

        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Dépenses</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={[
    styles.sidebarItem,
    selectedItem === 'Paiement' && {backgroundColor:bgColorOpen},
  ]} onPress={() => handleItemClick('Paiement')}>
      <Ionicons name={ selectedItem === "Paiement"? "card":"card-outline"} size={26} color={iconColor} />

        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Paiments</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={[
    styles.sidebarItem,
    selectedItem === 'AddUser' && {backgroundColor:bgColorOpen},
  ]} onPress={() => handleItemClick('AddUser')}>
      <Ionicons name={ selectedItem === "AddUser"? "people":"people-outline"} size={26} color={iconColor} />

        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Profil</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={[
    styles.sidebarItem,
    selectedItem === 'Settings' && {backgroundColor:bgColorOpen},
  ]} onPress={() => handleItemClick('Settings')}>
      <Ionicons name={ selectedItem === "Settings"? "settings":"settings-outline"} size={26} color={iconColor} />

        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Settings</Text>
        )}
      </TouchableOpacity>
      {/* Add other sidebar items as needed */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    zIndex:1,
  //  padding: 10,
    position: 'absolute', // Use absolute positioning for overlay
   // top: 0,
   paddingTop:StatusBar.currentHeight +10 ,
    left: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    // Adjust the width of the sidebar as needed
    width: '10%',
    height: '100%',
    backgroundColor: '#3b67bb',
    elevation: 8, // Elevation for Android shadow
    shadowColor: '#3b67bb', // Shadow color for iOS
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  sidebarItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 5,
  },
  
  sidebarText: {
    color: '#F0F8FF',
    marginLeft: 10,
  },
  sideBarbtn: {
    
  },
  
});

export default Sidebar;
