import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
const ProfileScreen = () => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('Mr');  
  const [activeInput, setActiveInput] = useState('');

  const handleSave = () => {
    Alert.alert('Confirmation', 'Save changes?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Save', onPress: () => saveChanges(), style: 'default' },
    ]);
  };

  const saveChanges = () => {
    Alert.alert('Success', 'Changes saved successfully!');
  };

  const handleFocus = (inputName) => {
    setActiveInput(inputName);
  };

  const handleBlur = () => {
    setActiveInput('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioOption, { backgroundColor: gender === 'Mr' ? '#3b67bb' : '#fff' }]}
          onPress={() => setGender('Mr')}
        >
          <Text style={[styles.radioText, { color: gender === 'Mr' ? '#fff' : '#000' }]}>Mr</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioOption, { backgroundColor: gender === 'Mrs' ? '#3b67bb' : '#fff' }]}
          onPress={() => setGender('Mrs')}
        >
          <Text style={[styles.radioText, { color: gender === 'Mrs' ? '#fff' : '#000' }]}>Mrs</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="CIN*"
          value={"LA123456"}
          editable={false}
          // Disabled CIN input
        />
        <MaterialCommunityIcons name="lock" size={24} color="#3b67bb" style={styles.lockIcon} />
      </View>
      <TextInput
        style={[styles.input, { borderBottomWidth: activeInput === 'Prenom' ? 1 : 0 }]}
        placeholder="Prenom*"
        value={prenom}
        onChangeText={(text) => setPrenom(text)}
        backgroundColor="#3b67bb20"
        onFocus={() => handleFocus('Prenom')}
          onBlur={handleBlur}
      />
      <TextInput
        style={[styles.input, { borderBottomWidth: activeInput === 'Nom' ? 1 : 0 }]}        placeholder="Nom*"
        value={nom}
        onChangeText={(text) => setNom(text)}
        backgroundColor="#3b67bb20"
        onFocus={() => handleFocus('Nom')}
          onBlur={handleBlur}
      />
      <TextInput
        style={[styles.input, { borderBottomWidth: activeInput === 'Email' ? 1 : 0 }]}        placeholder="Email*"
        value={email}
        onChangeText={(text) => setEmail(text)}
        backgroundColor="#3b67bb20"
        onFocus={() => handleFocus('Email')}
          onBlur={handleBlur}
      />
      <TextInput
        style={[styles.input, { borderBottomWidth: activeInput === 'Phone' ? 1 : 0 }]}        placeholder="Phone*"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        backgroundColor="#3b67bb20"
        onFocus={() => handleFocus('Phone')}
          onBlur={handleBlur}
      />
      <TextInput
        style={[styles.input, { borderBottomWidth: activeInput === 'Username' ? 1 : 0 }]}        placeholder="Username*"
        value={username}
        onChangeText={(text) => setUsername(text)}
        backgroundColor="#3b67bb20"
        onFocus={() => handleFocus('Username')}
          onBlur={handleBlur}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={[styles.buttonText, styles.boldText]}>Save</Text>
      </TouchableOpacity>
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
    width: '80%',
    top: '10%',
    marginLeft: '10%',
  },
  titleContainer: {
    top: '2%',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  title: {
    fontSize: 24,
    fontWeight: '300', 
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  radioOption: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3b67bb',
    marginRight: 10,
  },
  radioText: {
    fontSize: 16,
  },
  inputContainer: {
  },
  input: {
    height: 40,
    borderWidth: 0,
    borderColor: '#3b67bb',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#3b67bb20',
    width: '100%',
  },
  lockIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  saveButton: {
    backgroundColor: '#3b67bb',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold', 
  },
});

export default ProfileScreen;