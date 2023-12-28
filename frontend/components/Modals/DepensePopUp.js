import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput  } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export  const  DepensePopUp = ({isModalVisible,toggleModal,refetch}) => {
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };
const [name,setName]=useState('');
const [desc,setDesc]=useState('');
const [price,setPrice]=useState(0);
const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    'Assainissement',
    'Matériel',
    'Gardiennage',
    'Maintenance et réparation',
    'Autre',
  ];

  const HandleAddDepense = async() => {
    const formattedDate = new Date().toISOString().slice(0, 10);
    console.log(formattedDate);
    const newDepense = {
      nomDep: name,
      montant: price,
      categorie: selectedCategory,
      description: desc,
      date_dep: formattedDate,
      id_cop: 1,
    };
    console.log(newDepense);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/interfaces/depense/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDepense),
      });

      if (response.ok) {
        // Alert.alert(
        //     'Success',
        //     'User deleted successfully',
        //     [
        //       {
        //         text: 'Cancel',
        //         style: 'cancel',
        //       },
        //     ],
        //     { cancelable: true }
        //   );
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }



     toggleModal();
    refetch();
  };



  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={toggleModal} style={styles.close}>
              <Ionicons name="close" size={30} color="red" />
            </TouchableOpacity>
            <Text style={{ marginTop: 20, fontSize: 21, fontWeight: 'bold' }}>Depense :</Text>
            <TextInput
              id="Name"
              value={name}
              onChangeText={(value) => setName(value)}
              placeholder="Saisir la nouvelle depense"
              style={styles.input}
            />
            <Text style={{ marginTop: 20, fontSize: 21, fontWeight: 'bold' }}>Montant :</Text>
            <TextInput
              id="Price"
              value={price}
              onChangeText={(value) => setPrice(value)}
              placeholder="Saisir le montant"
              keyboardType="numeric"
              style={styles.input}
            />
            <Text style={{ marginTop: 20, fontSize: 21, fontWeight: 'bold' }}>Categorie :</Text>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
              style={styles.input}
            >
              {categories.map((category, index) => (
                <Picker.Item key={index} label={category} value={category} />
              ))}
            </Picker>
            <Text style={{ marginTop: 20, fontSize: 21, fontWeight: 'bold' }}>Description :</Text>
            <TextInput
              id="Description"
              value={desc}
              onChangeText={(value) => setDesc(value)}
              placeholder="Saisir la nouvelle description"
              textAlignVertical="top"
              multiline
              numberOfLines={4}
              maxLength={150}
              style={[styles.input, { maxWidth: '100%' }]}
            />
            <Text style={{ marginTop: 20, fontSize: 21, fontWeight: 'bold' }}>Catégorie :</Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity onPress={HandleAddDepense} style={[styles.buttons, { backgroundColor: '#65B741' }]}>
                <Text style={styles.buttonText}>Ajouter</Text>
                <Ionicons name="checkmark" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   // 
    flex: 1,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    borderColor:'#000',
   borderWidth:1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width:'80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input:{
    marginTop:10,
    borderRadius:5,
    padding:3,
    paddingLeft:20,
    paddingRight:20,
    borderColor:'#f2f5f9',
    borderWidth:1,
    width:"100%",
    backgroundColor:'#3b67bb20',
    


  },
  close:{
    position:'absolute',
    top:0,
    left:0,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttons: {
    borderRadius:10,
    padding:5,
    paddingHorizontal:25,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  buttonText: {
    fontSize:20,
    marginRight: 5,
    color: 'white',
  },
});

