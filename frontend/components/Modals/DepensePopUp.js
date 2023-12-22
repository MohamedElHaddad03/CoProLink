import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export  const  DepensePopUp = ({isModalVisible,toggleModal}) => {
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };
const [name,setName]=useState('');
const [desc,setDesc]=useState('');
const [price,setPrice]=useState(0);

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
              <Ionicons name="close" size={30} color='red'  />
            </TouchableOpacity>
            <Text style={{marginTop:20,fontSize:21,fontWeight:'bold'}}>Depense :</Text>
            <TextInput
              id='Name'
              value={name}
              onChange={(value) => setName(value)}
              placeholder='Saisir la nouvelle depense'
              style={styles.input}
            />
            <Text style={{marginTop:20,fontSize:21,fontWeight:'bold'}}>Montant :</Text>
            <TextInput
              id='Price'
              value={price}
              onChange={(value) => setPrice(value)}
                placeholder="Saisir le montant"
                 keyboardType="numeric"
              style={styles.input}
            />
             <Text style={{marginTop:20,fontSize:21,fontWeight:'bold'}}>Description :</Text>
            <TextInput
              id='Description'
              value={desc}
              onChange={(value) => setDesc(value)}
              placeholder='Saisir la nouvelle Categorie'
                         textAlignVertical="top"
        multiline
        numberOfLines={4}
        maxLength={150}
              style={[styles.input,{maxWidth:'100%'}]}
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
    width:'100%',
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

