import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../Context/AuthContext';
import useFetchSecure from '../hook/useFetchSecure';
import axios from 'axios';
import BASEURL from '../config';
const CopropCreate = () => {
  const [nom, setNom] = useState('');
  const [adresse, setadresse] = useState('');
  const [nbProps, setnbProps] = useState('');

  const [activeInput, setActiveInput] = useState('');
  const [data, setData] = useState(null); // Initialize 'data' state
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [saved, setSaved] = useState(false)
  const { user } = useAuth();
  //const { data: fetchedData, isLoading: isLoadingData, error: fetchedError, refetch } = useFetchSecure(`api/users/${user.User.id}`);




  // useEffect(() => {
  //   setError(fetchedError);
  //   setData(fetchedData);
  //   setIsLoading(isLoadingData);

  //   if (fetchedData) {
  //     setadresse(fetchedData.adresse);
  //     setNom(fetchedData.last_name);
  //     setPrenom(fetchedData.first_name);

  //     if (fetchedData.profile) {
  //       setnbProps(fetchedData.profile.telenbProps);
  //       setCIN(fetchedData.profile.cin);
  //     }

  //     setUsername(fetchedData.username);
  //   }
  // }, [fetchedData, isLoadingData, fetchedError]);

  // useEffect(() => {

  //     refetch();

  // }, []);







  const handleSave = async () => {
    Alert.alert('Confirmation', 'Save changes?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Save',
        onPress: async () => {
          try {
            const options = {
              method: 'POST',
              url: `${BASEURL}/api/interfaces/copro/create/`,
              data: {
                "adresse": adresse,
                "name": nom,
                "nbProps": nbProps,

              },
              headers: {
                Authorization: "Token " + user.Token
              },
            };

            const response = await axios.request(options);
            console.log(response.data);
            saveChanges();
          } catch (error) {
            if (error.response) {
              // The request was made, but the server responded with a status code
              console.error('Response data:', error.response.data);
              console.error('Response status:', error.response.status);
              console.error('Response headers:', error.response.headers);

              alert('Error Updating: ' + error.response.data.detail || 'Unknown error');
            } else if (error.request) {
              // The request was made but no response was received
              console.error('No response received:', error.request);
              alert('Error Updating: No response received');
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error('Error setting up request:', error.message);
              alert('Error Updating: ' + error.message || 'Unknown error');
            }

            setError(error);
          }
        },
        style: 'default',
      },
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

  return ((
    user.User.profile.role==="syndic" && <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Copropriété</Text>
      </View>

      <TextInput
        style={[styles.input, { borderBottomWidth: activeInput === 'Nom' ? 1 : 0 }]} placeholder="Nom*"
        value={nom}
        onChangeText={(text) => setNom(text)}
        backgroundColor="#3b67bb20"
        onFocus={() => handleFocus('Nom')}
        onBlur={handleBlur}
      />
      <TextInput
        style={[styles.input, { borderBottomWidth: activeInput === 'Adresse' ? 1 : 0 }]} placeholder="Adresse*"
        value={adresse}
        onChangeText={(text) => setadresse(text)}
        backgroundColor="#3b67bb20"
        onFocus={() => handleFocus('Adresse')}
        onBlur={handleBlur}
      />
 
      <TextInput
        style={[styles.input, { borderBottomWidth: activeInput === 'nbProps' ? 1 : 0 }]} placeholder="nbProps*"
        value={nbProps}
        onChangeText={(text) => {
            // Vérifier si le texte est un nombre entier naturel
            const integerValue = parseInt(text, 10);
            if (!isNaN(integerValue) && integerValue >= 0 && Number.isInteger(integerValue)) {
              // Si c'est un nombre entier naturel, mettre à jour le state
              setnbProps(text);
            }
            // Sinon, ignorer le changement
          }}
        backgroundColor="#3b67bb20"
        onFocus={() => handleFocus('nbProps')}
        onBlur={handleBlur}
      />
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={[styles.buttonText, styles.boldText]}>Save</Text>
      </TouchableOpacity>
    </View>
  ));
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

export default CopropCreate;