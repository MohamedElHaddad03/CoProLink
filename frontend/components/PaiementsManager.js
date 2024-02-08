import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Dimensions, Alert, ActivityIndicator, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import useFetch from '../hook/useFetch';
import useFetchSecure from '../hook/useFetchSecure';
import getBaseUrl from '../config';

const PaiementsManager = () => {
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
  const [searchQuery, setSearchQuery] = useState('');
  const [montantPayer, setMontantPayer] = useState('');
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //   { id: '1', property: 'Propriété 1', date: 'Janvier 2024' , price: '1000 DH'},
  //   { id: '2', property: 'Propriété 2', date: 'Février 2024' , price: '1000 DH'},
  //   { id: '3', property: 'Propriété 3', date: 'Mars 2024' , price: '1000 DH'},
  //   { id: '4', property: 'Propriété 4', date: 'Avril 2024' , price: '1000 DH'},
  //   { id: '5', property: 'Propriété 5', date: 'Mai 2024' , price: '1000 DH'},
  //   { id: '6', property: 'Propriété 6', date: 'Juin 2024' , price: '1000 DH'},
  //   { id: '7', property: 'Propriété 7', date: 'Juillet 2024' , price: '1000 DH'},

  //   // Add more property data as needed
  // ]);


  const { data: fetchedData, isLoading: isLoadingData, error: fetchedError, refetch } = useFetchSecure('api/interfaces/paiement');

  useEffect(() => {
    setError(fetchedError)
    setData(fetchedData.paiements);
    setIsLoading(isLoadingData);
    setData1(fetchedData);

  }, [fetchedData, isLoadingData]);
  console.log(data);

  const confirmPayment = (id_prop, num, montant) => {
    if(!montantPayer[id_prop]){
      Alert.alert(
        'Erreur',
        'Veuillez entrer un montant',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    }else{
      Alert.alert(
      'Confirmation',
      `Changer l'état du paiement pour ${num}?`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Confirmer',
          onPress: () => { handlePaymentConfirmation(id_prop, montant) },
         },
          ],
        { cancelable: true }
      );
    }  
  };
  const handleMontantChange = (id_prop, value) => {
    setMontantPayer(prevState => ({
      ...prevState,
      [id_prop]: value,
    }));
  };
  const handlePaymentConfirmation = async (id_prop, montant) => {
    try {
      const response = await fetch(BASEURL + `/api/interfaces/paiement/vpay/${id_prop}/${montant}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      if (response.ok) {
        console.log(response);
        alert('paiement validé');
        montantPayer[id_prop] = '';
        refetch();
      } else {
        throw new Error('Failed to validate pay');
      }
    } catch (error) {
      console.error('Error validate pay:', error.message);

    }
  };




  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
      'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    
    return monthNames[date.getMonth()];
  };

  const handlePaiement = async (id_pay,num, montant) => {
    confirmPayment(id_pay,num, montant);
  };

  const renderItem = ({ item }) => {
    // const buttonLabel = item.etat ? 'Invalider' : 'Valider';
    // const buttonColor = item.etat ? '#FF6347' : '#65B741';
      return (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Proprieté : {item.num}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#ffffff'}}>
          <TextInput
            style={styles.MontantInput}
            placeholder="Entrer un montant"
            value={montantPayer[item.id_prop] || ''}
            onChangeText={text => handleMontantChange(item.id_prop, text)}
            keyboardType='numeric'
          />
            <TouchableOpacity style={styles.confirmButton} onPress={() => handlePaiement(item.id_prop, item.num, montantPayer[item.id_prop]) }>
              <Text style={styles.buttonText}>Confirmer</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.amountSection}>
            <Text style={styles.amountText}>Total à payer: <Text style={styles.amountValue}>{item.total_payments}</Text></Text>
          </View>
        </View>
      );
    };
    
  const searchPaiement = () => {
    if (searchQuery.trim() === '') {
      setData(fetchedData);
    } else {
      const filteredPaiements = data1.filter(item => {
        const monthName = getMonthName(item.date_creation);
        return (
          monthName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.num.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
  
      setData(filteredPaiements);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Paiements</Text>
      </View>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchPaiement}
        />
      </View>
      {isLoading && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      {!isLoading && <KeyboardAvoidingView behavior='height'>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_prop}
          style={styles.Flatlist}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>}
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
    top: StatusBar.currentHeight,
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
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  MontantInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '60%',
    height: '80%',
  },
  Flatlist: {
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
    backgroundColor: '#ffffff',
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#65B741',
    width: '40%',
    height: '80%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center', 
    flex: 1, 
    textAlignVertical: 'center',
  },
  
  divider: {
    height: 1,
    backgroundColor: '#ccc',
  },
  amountSection: {
    padding: 7,
    backgroundColor: '#ffffff',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  amountText: {
    fontSize: 16,
    color: '#444',
    bottom: 5,
    left: 5,
  },
  amountValue: {
    color: '#65B741',
  },
});

export default PaiementsManager;