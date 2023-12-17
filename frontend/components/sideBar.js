import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Animated, Easing,SafeAreaView, StatusBar } from 'react-native';
import icons from '../constants/icons';

const Sidebar = () => {
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

  return (

    <Animated.View style={[styles.sidebar, { width: largeur, backgroundColor: bgColor }]}>
      
      <View>
        <TouchableOpacity style={{marginBottom:50}} onPress={toggleSidebar}>
          {!isSidebarOpen && (
            <Image
              source={icons.menu}
              fadeDuration={0}
              style={{ width: 30, height: 30, tintColor: iconColor }}
            />
          )}
          {isSidebarOpen && (
            <Image
              source={icons.X}
              fadeDuration={0}
              style={{ width: 30, height: 30, tintColor: iconColor }}
            />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.sidebarItem]}>
        <Image
          source={icons.statistic}
          fadeDuration={0}
          style={{ width: 30, height: 30, tintColor: iconColor }}
        />
        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Statistiques</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.sidebarItem}>
        <Image
          source={icons.document}
          fadeDuration={0}
          style={{ width: 30, height: 30, tintColor: iconColor }}
        />
        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Documents</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem}>
        <Image
          source={icons.person}
          fadeDuration={0}
          style={{ width: 30, height: 30, tintColor: iconColor }}
        />
        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Profil</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem}>
        <Image
          source={icons.money}
          fadeDuration={0}
          style={{ width: 30, height: 30, tintColor: iconColor }}
        />
        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Dépenses</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem}>
        <Image
          source={icons.card}
          fadeDuration={0}
          style={{ width: 30, height: 30, tintColor: iconColor }}
        />
        {isSidebarOpen && (
          <Text style={[styles.sidebarText, { color: iconColor }]}>Paiments</Text>
        )}
      </TouchableOpacity>
      {/* Add other sidebar items as needed */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
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
    paddingRight: 10,
  },
  sidebarText: {
    color: '#F0F8FF',
    marginLeft: 10,
  },
  sideBarbtn: {
    
  },
});

export default Sidebar;
