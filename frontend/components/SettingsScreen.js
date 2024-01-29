import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../Context/AuthContext';

const SettingsScreen = ({selectedItem, setSelectedItem}) => {
  
  const { logout } = useAuth();

  const Logout = ()=>{
    logout();
    //setSelectedItem('Logout');
  }
  const options = [
    { title: 'Profile', icon: 'person-outline', action: () => setSelectedItem('Profile') },
    { title: 'Language', icon: 'language-outline', action: () => setSelectedItem('Language') },
    { title: 'Contact Support', icon: 'chatbubble-ellipses-outline', action: () => setSelectedItem('ContactSupport') },
    { title: 'Logout', icon: 'exit-outline', action: () => Logout()  },
  ];



  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <View key={index}>
          <TouchableOpacity style={styles.option} onPress={option.action}>
            <Ionicons name={option.icon} size={24} color="#3b67bb" style={styles.optionIcon} />
            <Text style={styles.optionText}>{option.title}</Text>
          </TouchableOpacity>
          {index !== options.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: '#fff',
    width: '90%',
    marginLeft: '10%',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginLeft: 20,
  },
});

export default SettingsScreen;
