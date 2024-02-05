import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  Modal,
  ActivityIndicator,
  StatusBar, // Import ActivityIndicator for the loading spinner
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useFetchSecure from '../hook/useFetchSecure';
import getBaseUrl from '../config';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../Context/AuthContext';


const UsersManagement = () => {
  const [BASEURL, setBaseUrl] = useState('');

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
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [item2, setItem] = useState({});
  const [prop, setProp] = useState({
    id_prop: 0,
    num: "",
    occupation: true,
    id_user: 0,
    id_cot: 0,
    id_cop: 0
  });
  const [data, setData] = useState(null); // Initialize 'data' state
  const [users, setUsers] = useState([]);
  const [users1, setUsers1] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  const [error, setError] = useState(null);
  const [idProp, setIdProp] = useState();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  //--------------------SignUp--------------------
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cin, setCin] = useState('');
  const [usernameSU, setUserNameSU] = useState('');
  const [passwordSU, setPasswordSU] = useState('');
  const [profile, setProfile] = useState('');
  const [error2, setError2] = useState('');
  const [montantNormal, setMontantNormal] = useState(0);
  const [montantBuisness, setMontantBuisness] = useState(0);
  const [montantExceptionnel, setMontantExcetionnel] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Cotisation Normale');

  const categories = [
    'Cotisation Normale',
    'Cotisation Buisness',
    'Cotisation Exceptionnelle',

  ];

  const [id_current_user, setIdUser] = useState(0);

  const [newUserData, setNewUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    profile: {
      telephone: '',
      cin: '',
      id_cop: 1,
      role: 'proprietaire',
    },
  });
  useEffect(() => {
    if (id_current_user !== 0) {
      console.log('idUserrrrrrrrrr', id_current_user);

    }
  }, [id_current_user]);

  // Replace the axios.request options with the useFetch hook

  const handleDefault = (item) => {
    setCin(item?.user?.profile?.cin);
    setEmail(item?.user?.email);
    setFirstName(item?.user?.first_name)
    setLastName(item?.user?.last_name)
    setPhone(item?.user?.telephone)
    setUserName(item?.user?.username)
    setPasswordSU(item?.user?.password)
  }

  const { data: fetchedData, isLoading: isLoadingData, error: fetchedError, refetch } = useFetchSecure('api/interfaces/propusers');

  useEffect(() => {
    setError(fetchedError)
    setUsers(fetchedData);
    setIsLoading(isLoadingData);
    setUsers1(fetchedData);


  }, [fetchedData, isLoadingData]);
  // //console.log(data)
  // Call fetchData on component mount
  // useEffect(()=>{
  // // fetchData();
  // //console.log(data)
  // refetch();
  // }, [data]);
  const handleUser = async (id) => {

    const newUser = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      username: username,
      //  password: "password" ,
      id_cot: 1,
      profile: {
        telephone: phone,
        cin: cin,
        id_cop: user.User.profile.id_cop,
        role: 'proprietaire',
      },
    };

    console.log(newUser);
    try {
      const response = await fetch(`${BASEURL}/api/users/update/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + user.Token,
        },
        body: JSON.stringify(newUser),
      });
      console.log('TOKEEEEEEEEEEEEN', user.Token);
      if (response.ok) {
        Alert.alert("Success", "Utilisateur modifié avec succès")
        setShowModal2(false)
        refetch();
      } else {
        throw new Error(`Failed to Update user: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error ADDING user:', error.message);
    }
  };

  const renderUserItem = ({ item }) => {
    //console.log(item)
    return (
      <View style={styles.userItem}>

        <View style={styles.userInfo}>

          <Text>
            <FontAwesome6 name="building-user" size={24} color="black" /> Appartement : {item?.num}
          </Text>
          {item.occupation && <View>

            <Text>
              Nom : {item.user?.first_name}  {item.user?.last_name}
            </Text>
            <Text>Statut :  </Text>
            <Text>
              Email : {item.user?.email}
            </Text>
            <Text>
              Telephone : {item.user?.profile?.telephone}
            </Text>
          </View>}
        </View>
        {item.occupation && <View style={styles.ButtonsContainer}>


          <TouchableOpacity
            style={styles.settingUser}
            onPress={() => {
              setShowModal2(true);
              setIdUser(item?.user?.id);
              handleDefault(item);
            }}
          >

            <MaterialCommunityIcons name="account-settings" size={24} color="black" />

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeIconContainer}
            onPress={() => { //console.error('id', item); 
              handleDeleteUser(item.id_user);
            }
            }
          >
            <Ionicons name="person-remove" size={20} color="red" />
          </TouchableOpacity>
        </View>}
        {!item.occupation && <View style={styles.ButtonsContainer}>



          <TouchableOpacity
            style={styles.addIconContainer}
            onPress={() => {
              setShowModal(true);
              setIdProp(item?.id_prop);
              setItem(item)
              console.log('item2', item2)
            }}
          >
            <Ionicons name="person-add" size={20} color="green" />
          </TouchableOpacity>
        </View>}

      </View>
    );
  };

  const searchUser = () => {
    if (searchQuery.trim() === '') {
      // If the search query is empty, reset the users to the original data
      setUsers(fetchedData);
    } else {
      const filteredUsers = users1.filter(item => {
        if (item.occupation && item.user) {
          const fullName = `${item.user.first_name} ${item.user.last_name}`;
          return (
            fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.user.email.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        return false;
      });
      setUsers(filteredUsers);
    }
  };

  const addUser = async () => {
    const newUser = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      username: username,
      password: password,
      id_prop: idProp,
      id_cot: 1,
      profile: {
        telephone: phone,
        cin: cin,
        id_cop: user.User.profile.id_cop,
        role: 'proprietaire',
      },
    };

    try {
      const response = await fetch(`${BASEURL}/api/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + user.Token,
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const responseData = await response.json();
        const response2 = await fetch(`${BASEURL}/api/interfaces/prop/update/${idProp}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + user.Token,
          },
          body: JSON.stringify({
            "num": item2?.num,
            "id_cop": item2?.id_cop,
            "occupation": true,
            "id_user": responseData.id
          }),
        });

        if (response2.ok) {
          setShowModal(false)
          Alert.alert('Success', 'Utilisateur ajouté avec succés')
          refetch();
        } else {
          throw new Error(`Failed to update prop: ${response2.statusText}`);
        }
      } else {
        throw new Error(`Failed to ADD user: ${response.statusText}`);
      }
    } catch (error) {
      //console.error('Error ADDING user:', error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    // Custom hook for deleting a user
    try {
      const response = await fetch(`${BASEURL}/api/users/${id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        if (response.ok) {
          const responseData = await response.json();
          const response2 = await fetch(`${BASEURL}/api/interfaces/prop/update/${idProp}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + user.Token,
            },
            body: JSON.stringify({
              "num": item2?.num,
              "id_cop": item2?.id_cop,
              "occupation": false,
              "id_user": responseData.id
            }),
          });
        }
        Alert.alert(
          'Success',
          'User deleted successfully',
          [
            {
              text: 'ok',
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );

      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      //console.error('Error deleting user:', error.message);
    }

    refetch();

    // Alert.alert(
    //   'Confirm',
    //   'Are you sure you want to delete this user?',
    //   [
    //     {
    //       text: 'Cancel',
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'Delete',
    //       onPress: () => {
    //         const updatedUsers = data.filter((user) => user.id !== id);
    //         setData(updatedUsers); // Update 'data' after deleting the user
    //       },
    //       style: 'destructive',
    //     },
    //   ],
    //   { cancelable: true }
    // );
  };

  const handleInputChange = (field, value) => {
    if (field.startsWith('profile')) {
      // Handle profile nested fields
      const profileField = field.split('.')[1]; // Extract the profile field name
      setNewUserData({
        ...newUserData,
        profile: {
          ...newUserData.profile,
          [profileField]: value, // Update the specific profile field
        },
      });
    } else {
      // For non-profile fields
      setNewUserData({ ...newUserData, [field]: value });
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Utilisateurs</Text>
      </View>
      
      <View style={[styles.header]}>

        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchUser}
        />

      </View>

      <KeyboardAvoidingView behavior="height" >
        <TouchableOpacity onPress={() => setShowModal3(true)} style={styles.ButtonCotisation}>
          <Text style={styles.buttonText}>
            Cotisation
          </Text>
          <Ionicons
            name="add-circle-outline"
            size={30}
            color="white"
            style={{ marginLeft: 7 }}
          // Change 'true' to {true}
          />
        </TouchableOpacity>
        {isLoading && (
          <ActivityIndicator size="large" color="#3b67bb" />
        )}
        {!isLoading && <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderUserItem}
          numColumns={1}
          refreshing={false}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
        />}

      </KeyboardAvoidingView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <KeyboardAvoidingView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter User</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="CIN"
              value={cin}
              onChangeText={(text) => setCin(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="First Name"
              value={firstname}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Last Name"
              value={lastname}
              onChangeText={(text) => setLastName(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Phone"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUserName(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity style={styles.modalButton} onPress={() => addUser()}>
              <Text style={styles.modalButtonText}>Ajouter Utilisateur</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal2}
        onRequestClose={() => setShowModal2(false)}
      >
        <KeyboardAvoidingView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modifier Utilisateur</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="CIN"
              value={cin}
              onChangeText={(text) => setCin(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="First Name"

              value={firstname}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Last Name"
              value={lastname}
              onChangeText={(text) => setLastName(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Téléphone"
              value={phone}
              keyboardType="numeric"
              onChangeText={(text) => setPhone(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUserName(text)}
            />
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
              style={styles.input}
              itemStyle={styles.pickerItem} // Style des éléments de la liste déroulante
              mode="dropdown" // Mode de la liste déroulante
            >
              {categories.map((category, index) => (
                <Picker.Item key={index} label={category} value={category} />
              ))}
            </Picker>

            <TouchableOpacity style={styles.modalButton} onPress={() => {
              handleUser(id_current_user);
            }}>
              <Text style={styles.modalButtonText}>Modifier Utilisateur</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal2(false)}>
              <Text style={styles.modalButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal3}
        onRequestClose={() => setShowModal3(false)}
      >
        <KeyboardAvoidingView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modifier les cotisations</Text>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
              style={styles.input}
              itemStyle={styles.pickerItem} // Style des éléments de la liste déroulante
              mode="dropdown" // Mode de la liste déroulante
            >
              {categories.map((category, index) => (
                <Picker.Item key={index} label={category} value={category} />
              ))}
            </Picker>

            {selectedCategory === 'Cotisation Normale' && <View>
              <Text >Modifier la cotisation normale</Text>
              <TextInput

                style={styles.modalInput}
                keyboardType="numeric"
                placeholder="Cotisation normale"
                value={montantNormal}
                onChangeText={(text) => setMontantNormal(text)}
              />
            </View>}
            {selectedCategory === 'Cotisation Buisness' && <View>
              <Text >Modifier la cotisation buisness</Text>

              <TextInput
                style={styles.modalInput}
                keyboardType="numeric"
                placeholder="Cotisation buisness"
                value={montantBuisness}
                onChangeText={(text) => setMontantBuisness(text)}
              />
            </View>}
            {selectedCategory === 'Cotisation Exceptionnelle' && <View>
              <Text >Modifier la cotisation exceptionnelle</Text>

              <TextInput
                style={styles.modalInput}
                keyboardType="numeric"
                placeholder="Cotisation exceptionnelle"
                value={montantExceptionnel}
                onChangeText={(text) => setMontantExcetionnel(text)}
              />
            </View>}


            <TouchableOpacity style={styles.modalButton} onPress={() => addUser()}>
              <Text style={styles.modalButtonText}>Confirmer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal3(false)}>
              <Text style={styles.modalButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection:'column',
    padding: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '80%',
    top: StatusBar.currentHeight,
    left: '5%',
    height: Dimensions.get('window').height,
  },
  titleContainer: {
    top: StatusBar.currentHeight ,
    alignSelf: 'center',
    alignItems: 'center',
 //   position: 'absolute',
  },
  title: {
    fontSize: 24,
   // marginBottom:125,
    fontWeight: '300',
  },
  header: {
   // top:100,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#3b67bb',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  addText: {
    color: '#fff',
    marginLeft: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  ButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'center', // Optional, adjust as needed
  },

  settingUser: {
    marginBottom: 30,
    marginLeft: 10,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
    width: '100%',
    justifyContent: 'space-between', // Aligns items along the main axis with space in between
  },
  ButtonCotisation: {
    width: 'auto',
    backgroundColor: '#115E83',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centrer horizontalement
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  userInfo: {
    fontSize: 15,
    flex: 1, // Takes remaining space in the row
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 10,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10, // Ajoute un espace en bas du composant
    backgroundColor: '#00000010', // Couleur de fond du composant
  },
  pickerItem: {
    fontSize: 16, // Taille de la police pour les éléments de la liste déroulante
    color: 'black', // Couleur du texte des éléments de la liste déroulante
  },
  removeIconContainer: {
    marginLeft: 10, // Provides some spacing between user info and remove icon
  },
  addIconContainer: {
    padding: 10
  },
  flatList: {
    alignSelf: 'center',
    width: '100%',
    maxHeight: '80%',
    marginTop: 20,
    paddingBottom:100,
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: 'auto',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,

    padding: 8,
    paddingTop: 10,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#3b67bb',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UsersManagement;
