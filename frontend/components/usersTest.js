import React, { useState, useEffect } from 'react';
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
  ActivityIndicator, // Import ActivityIndicator for the loading spinner
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
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

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
              {item.user?.first_name} : {item.user?.last_name}
            </Text>
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
    const filteredUsers = data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setData(filteredUsers);
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

    //console.log(newUser);
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
          Alert.alert('Success','Utilisateur ajouté avec succés')
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
            method: 'PUT',
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
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchUser}
        />
        {/* <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
          <Ionicons name="person-add-outline" size={25} color="white" />
          <Text style={styles.addText}>Add User</Text>
        </TouchableOpacity> */}
      </View>
      <KeyboardAvoidingView behavior="height">
        {isLoading && (
          <ActivityIndicator size="large" color="#3b67bb" />
        )}
        {!isLoading && <FlatList
          data={users.length > 0 ? users : data}
          keyExtractor={(item) => item.id}
          renderItem={renderUserItem}
          numColumns={1}
          refreshing={false}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
        />}
        {/* )} */}
      </KeyboardAvoidingView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <KeyboardAvoidingView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add User</Text>
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
            {/* <TextInput
              style={styles.modalInput}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={newUserData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
            /> */}
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

            {/* <TextInput
              style={styles.modalInput}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={newUserData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
            /> */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '80%',
    top: '10%',
    left: '5%',
    height: Dimensions.get('window').height,
  },
  titleContainer: {
    top: '1%',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
  },
  header: {
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
  userInfo: {
    flex: 1, // Takes remaining space in the row
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
    maxHeight: '85%',
    marginTop: 20,
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
    Height: '75%',
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
