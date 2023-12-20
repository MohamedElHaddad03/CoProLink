import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Animated, Easing,SafeAreaView, StatusBar } from 'react-native';
import icons from '../constants/icons';
import { Ionicons } from '@expo/vector-icons';

const Sidebar = ({ selectedItem, setSelectedItem }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const largeur = useRef(new Animated.Value(50)).current;
  const iconColor = isSidebarOpen ? '#3b67bb' : '#fff';
  const bgColor = isSidebarOpen ? '#fff' : '#3b67bb';
 
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
      
      <View>
        <TouchableOpacity style={{marginBottom:50}} onPress={toggleSidebar}>
          {!isSidebarOpen && (
            <Ionicons name="menu" size={30} color={iconColor} />
          )}
          {isSidebarOpen && (
            <Ionicons name="close" size={40} color={iconColor} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.sidebarItem]}  onPress={() => handleItemClick('Statistiques')}>
      <Ionicons name={ selectedItem === "Statistiques"? "stats-chart":"stats-chart-outline"} size={26} color={iconColor} />
        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Statistiques</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.sidebarItem} onPress={() => handleItemClick('Documents')}>
      <Ionicons name={ selectedItem === "Documents"? "documents":"documents-outline"} size={26} color={iconColor} />
        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Documents</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem} onPress={() => handleItemClick('Depenses')}>
      <Ionicons name={ selectedItem === "Depenses"? "cash":"cash-outline"} size={26} color={iconColor} />

        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Dépenses</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem} onPress={() => handleItemClick('Paiement')}>
      <Ionicons name={ selectedItem === "Paiement"? "card":"card-outline"} size={26} color={iconColor} />

        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Paiments</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem} onPress={() => handleItemClick('Profile')}>
      <Ionicons name={ selectedItem === "Profile"? "person":"person-outline"} size={26} color={iconColor} />

        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Profil</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem} onPress={() => handleItemClick('Settings')}>
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
    padding: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 40,
    paddingRight: 5,
  },
  sidebarText: {
    color: '#F0F8FF',
    marginLeft: 10,
  },
  sideBarbtn: {
    
  },
});

export default Sidebar;
