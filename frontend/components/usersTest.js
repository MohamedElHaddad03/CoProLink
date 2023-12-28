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
import useFetch from '../hook/useFetch';

const UsersManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(null); // Initialize 'data' state
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

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

  // Replace the axios.request options with the useFetch hook



  const { data: fetchedData, isLoading: isLoadingData, error: fetchedError, refetch } = useFetch('api/users/');

  useEffect(() => {
    setError(fetchedError)
    setData(fetchedData);
    setIsLoading(isLoadingData);

   
  }, [fetchedData, isLoadingData]);
 // console.log(data)
  // Call fetchData on component mount
  // useEffect(()=>{
  // // fetchData();
  // console.log(data)
  // refetch();
  // }, [data]);

  const renderUserItem = ({ item }) => {
    console.log(item)
    return (
      <View style={styles.userItem}>
        <View style={styles.userInfo}>
          <Text>
            {item.username} : {item.email}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.removeIconContainer}
          onPress= {()=>handleDeleteUser(item.id)}
        >
          <Ionicons name="person-remove" size={20} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  const searchUser = () => {
    const filteredUsers = data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const addUser  = async () => {
    const newUser = {...newUserData  };
    //setData([...data, newUser]); // Update 'data' with the new user
    // setShowModal(false);
    
    console.log(newUser)
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set appropriate headers
      },
      body: JSON.stringify(newUser), // Convert new user data to JSON string for the request body
    });
    console.log(newUser)

      if (response.ok) {
        
        refetch();
      } else {
        throw new Error('Failed to ADD user');
      }
    } catch (error) {
      console.error('Error ADDING user:', error.message);

    }

   
  };

  const handleDeleteUser = async (id) => {
// Custom hook for deleting a user
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert(
            'Success',
            'User deleted successfully',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ],
            { cancelable: true }
          );
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
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
    }  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>All Users</Text>
      </View>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchUser}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
          <Ionicons name="person-add-outline" size={25} color="white" />
          <Text style={styles.addText}>Add User</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView behavior="height">
        {/* {isLoading ? (
          <ActivityIndicator size="large" color="#3b67bb" />
        ) : ( */}
        <FlatList
          data={users.length > 0 ? users : data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUserItem}
          numColumns={1}
          refreshing={false}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
        />
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
              value={newUserData.cin}
              onChangeText={(text) => handleInputChange('profile.cin', text)}
            />
             <TextInput
              style={styles.modalInput}
              placeholder="First Name"
              value={newUserData.name}
              onChangeText={(text) => handleInputChange('first_name', text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Last Name"
              value={newUserData.lastname}
              onChangeText={(text) => handleInputChange('last_name', text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              value={newUserData.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Phone"
              value={newUserData.phone}
              onChangeText={(text) => handleInputChange('profile.telephone', text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Username"
              value={newUserData.username}
              onChangeText={(text) => handleInputChange('username', text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Password"
              secureTextEntry={true}
              value={newUserData.password}
              onChangeText={(text) => handleInputChange('password', text)}
            />
            {/* <TextInput
              style={styles.modalInput}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={newUserData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
            /> */}
            <TouchableOpacity style={styles.modalButton} onPress={addUser}>
              <Text style={styles.modalButtonText}>Add User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
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
