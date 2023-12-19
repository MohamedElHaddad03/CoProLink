import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Dimensions, Alert } from 'react-native';import { MaterialIcons } from '@expo/vector-icons';

const PaiementsManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([
    { id: '1', property: 'Propriété 1', date: 'Janvier 2024' , price: '1000 DH'},
    { id: '2', property: 'Propriété 2', date: 'Février 2024' , price: '1000 DH'},
    { id: '3', property: 'Propriété 3', date: 'Mars 2024' , price: '1000 DH'},
    { id: '4', property: 'Propriété 4', date: 'Avril 2024' , price: '1000 DH'},
    { id: '5', property: 'Propriété 5', date: 'Mai 2024' , price: '1000 DH'},
    { id: '6', property: 'Propriété 6', date: 'Juin 2024' , price: '1000 DH'},
    { id: '7', property: 'Propriété 7', date: 'Juillet 2024' , price: '1000 DH'},

    // Add more property data as needed
  ]);
    

  const confirmPayment = (property) => {
    Alert.alert(
      'Confirmation',
      `Confirmer le paiement pour ${property}?`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Confirmer',
          onPress: () => {handlePaymentConfirmation(property), alert('Paiement confirmé')},
        },
      ],
      { cancelable: true }
    );
  };

  const handlePaymentConfirmation = () => {
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>{item.property}</Text>
          <Text style={styles.cardSubtitle}>Date: {item.date}</Text>
        </View>
        <TouchableOpacity onPress={() => confirmPayment(item.property)} style={styles.confirmButton}>
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.amountSection}>
        <Text style={styles.amountText}>Montant: <Text style={styles.amountValue}>{item.price}</Text></Text>
      </View>
    </View>
  );


  const searchPaiement = () => {
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Paiement</Text>
      </View>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <KeyboardAvoidingView behavior='height'>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.Flatlist}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position:'relative',
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '80%',
    top: '10%',
    left: '5%',
    height:Dimensions.get('window').height,
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
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  Flatlist:{
    alignSelf: 'center',
    width: '100%',
    maxHeight: '85%',
    marginTop: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: '#65B741',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
  },
  amountSection: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexDirection: 'row',
  },
  amountText: {
    fontSize: 16,
    color: '#444',
  },
  amountValue: {
    color: '#65B741',
  },
});

export default PaiementsManager;
