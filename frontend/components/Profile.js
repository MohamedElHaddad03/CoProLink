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
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>
            CIN*
          </Text>
          <TextInput
            style={styles.input}
            value={"LA123456"}
            editable={false}
          />
          <MaterialCommunityIcons name="lock" size={24} color="#3b67bb" style={styles.lockIcon} />
        </View>
        
        <View style={styles.inputWrapper}>
          <Text style={[styles.label, { top: activeInput === 'Prenom' || prenom !== '' ? -15 : 8 }]}>
            Prenom*
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Prenom*"
            value={prenom}
            onChangeText={(text) => setPrenom(text)}
            onFocus={() => handleFocus('Prenom')}
            onBlur={handleBlur}
            backgroundColor="#3b67bb20"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={[styles.label, { top: activeInput === 'Nom' || nom !== '' ? -15 : 8 }]}>
            Nom*
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nom*"
            value={nom}
            onChangeText={(text) => setNom(text)}
            onFocus={() => handleFocus('Nom')}
            onBlur={handleBlur}
            backgroundColor="#3b67bb20"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={[styles.label, { top: activeInput === 'Email' || email !== '' ? -15 : 8 }]}>
            Email*
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email*"
            value={email}
            onChangeText={(text) => setEmail(text)}
            onFocus={() => handleFocus('Email')}
            onBlur={handleBlur}
            backgroundColor="#3b67bb20"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={[styles.label, { top: activeInput === 'Phone' || phone !== '' ? -15 : 8 }]}>
            Phone*
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Phone*"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            onFocus={() => handleFocus('Phone')}
            onBlur={handleBlur}
            backgroundColor="#3b67bb20"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={[styles.label, { top: activeInput === 'Username' || username !== '' ? -15 : 8 }]}>
            Username*
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Username*"
            value={username}
            onChangeText={(text) => setUsername(text)}
            onFocus={() => handleFocus('Username')}
            onBlur={handleBlur}
            backgroundColor="#3b67bb20"
          />
        </View>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={[styles.buttonText, styles.boldText]}>Save</Text>
        </TouchableOpacity>
      </View>
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
  inputContainer: {
  },
  inputWrapper: {
    borderBottomWidth: 1,
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    height: 40,
    borderWidth: 0,
    paddingLeft: 10,
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
  label: {
    position: 'absolute',
    left: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    fontSize: 12,
    color: '#999',
    top: 8,
    zIndex: 1,
  },
});

export default ProfileScreen;
