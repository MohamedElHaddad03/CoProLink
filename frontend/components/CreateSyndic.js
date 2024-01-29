import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../Context/AuthContext';
import useFetchSecure from '../hook/useFetchSecure';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import getBaseUrl from '../config';
const CreateSyndic = () => {
    const [BASEURL,setBaseUrl]=useState('');

    useEffect(() => {
        const fetchBaseUrl = async () => {
            try {
                const BASEURL = await getBaseUrl();
                setBaseUrl(BASEURL);
            } catch (error) {
                console.error("Error fetching BASEURL:", error);
            }
        };

        fetchBaseUrl(); // Call the async function immediately
    }, []);
    const [prenom, setPrenom] = useState('');
    const [CIN, setCIN] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const [gender, setGender] = useState('Mr');
    const [activeInput, setActiveInput] = useState('');
    const [data, setData] = useState(null); // Initialize 'data' state
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [saved, setSaved] = useState(false)
    const { user } = useAuth();
    const syndic = JSON.parse(SecureStore.getItem("responseData"));
    console.log('syndic',syndic)
   // useEffect(,[]);
    //const { data: fetchedData, isLoading: isLoadingData, error: fetchedError, refetch } = useFetchSecure(`api/users/${user.User.id}`);




    // useEffect(() => {
    //   setError(fetchedError);
    //   setData(fetchedData);
    //   setIsLoading(isLoadingData);

    //   if (fetchedData) {
    //     setEmail(fetchedData.email);
    //     setNom(fetchedData.last_name);
    //     setPrenom(fetchedData.first_name);

    //     if (fetchedData.profile) {
    //       setPhone(fetchedData.profile.telephone);
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
                            url: `${BASEURL}/api/users/`,
                            data: {
                                "id": "hh",
                                "username": username,
                                "email": email,
                                "first_name": prenom,
                                "last_name": nom,
                                "password": password,
                                "profile": {
                                    "cin": CIN,
                                    "telephone": phone,
                                    "role": 'syndic',
                                    "id_cop": 1,
                                },

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

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Création Syndic</Text>
                <Text>Copropriété {syndic.name} </Text>
                <Text>Adresse {syndic.adresse}</Text>
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
            <SafeAreaView style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { borderBottomWidth: activeInput === 'CIN' ? 1 : 0 }]}
                    onChangeText={(text) => setCIN(text)}

                    placeholder="CIN*"
                    value={CIN}
                    onFocus={() => handleFocus('CIN')}
                    onBlur={handleBlur}
                //  editable={false}
                // Disabled CIN input
                />

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
                    style={[styles.input, { borderBottomWidth: activeInput === 'Nom' ? 1 : 0 }]} placeholder="Nom*"
                    value={nom}
                    onChangeText={(text) => setNom(text)}
                    backgroundColor="#3b67bb20"
                    onFocus={() => handleFocus('Nom')}
                    onBlur={handleBlur}
                />
                <TextInput
                    style={[styles.input, { borderBottomWidth: activeInput === 'Email' ? 1 : 0 }]} placeholder="Email*"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    backgroundColor="#3b67bb20"
                    onFocus={() => handleFocus('Email')}
                    onBlur={handleBlur}
                />
                <TextInput
                    style={[styles.input, { borderBottomWidth: activeInput === 'Phone' ? 1 : 0 }]} placeholder="Phone*"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    backgroundColor="#3b67bb20"
                    onFocus={() => handleFocus('Phone')}
                    onBlur={handleBlur}
                />
                <TextInput
                    style={[styles.input, { borderBottomWidth: activeInput === 'Username' ? 1 : 0 }]} placeholder="Username*"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    backgroundColor="#3b67bb20"
                    onFocus={() => handleFocus('Username')}
                    onBlur={handleBlur}
                />
                <TextInput
                    style={[styles.input, { borderBottomWidth: activeInput === 'Password' ? 1 : 0 }]} placeholder="Mot de passe*"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    backgroundColor="#3b67bb20"
                    onFocus={() => handleFocus('Password')}
                    onBlur={handleBlur}
                />
                <TextInput
                    style={[styles.input, { borderBottomWidth: activeInput === 'confirm' ? 1 : 0 }]} placeholder="Confirmer Mot de passe*"
                    value={confirm}
                    onChangeText={(text) => setConfirm(text)}
                    backgroundColor="#3b67bb20"
                    onFocus={() => handleFocus('confirm')}
                    onBlur={handleBlur}
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={[styles.buttonText, styles.boldText]}>Save</Text>
                </TouchableOpacity>
            </SafeAreaView>
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

export default CreateSyndic;