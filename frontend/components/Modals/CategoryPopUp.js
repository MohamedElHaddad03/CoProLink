import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export  const  CategoryPopUp = ({isModalVisible,toggleModal}) => {
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };
const [categ,setCateg]=useState('');

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
            <Text style={{marginTop:20,fontSize:21,fontWeight:'bold'}}>Categorie :</Text>
          <TouchableOpacity onPress={toggleModal} style={styles.close}>
              <Ionicons name="close" size={30} color='red'  />
            </TouchableOpacity>
            <TextInput
              id='Categorie'
              value={categ}
              onChange={(value) => setCateg(value)}
              placeholder='Saisir la nouvelle Categorie'
              style={styles.input}
            />
            <View style={styles.btnContainer}>
  {/* <TouchableOpacity onPress={toggleModal} style={[styles.buttons,{backgroundColor:'#800020',}]}>
    <Text style={styles.buttonText}>Annuler</Text>
    <Ionicons name="close" size={30} color='white' />
  </TouchableOpacity> */}
  <TouchableOpacity onPress={()=>{}} style={[styles.buttons,{backgroundColor:'#65B741',}]}>
    <Text style={styles.buttonText}>Ajouter</Text>
    <Ionicons name="checkmark" size={30} color='white' />
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
    borderColor:'#000',
    borderWidth:1,
    flex: 1,
    width:'80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width:'80%',
    padding: 20,
    borderRadius: 10,
  },
  input:{
    marginTop:20,
    borderRadius:5,
    padding:3,
    paddingLeft:20,
    paddingRight:20,
    borderColor:'#000',
    borderWidth:1,
    backgroundColor:'#3b67bb20',



  },
  close:{
    position:'absolute',
    top:0,
    left:0,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  buttons: {
    borderRadius:10,
    padding:3,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  buttonText: {
    marginRight: 5,
    color: 'white',
  },
});

