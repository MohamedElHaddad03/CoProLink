import { Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import getBaseUrl from "../../config";
import { useEffect,useState } from "react";
import { useAuth } from "../../Context/AuthContext";


const CardDepense = ({ item,refetch }) => {
  const [BASEURL,setBaseUrl]=useState('');
  const {user}=useAuth();


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
console.log(item)
const handleDeleteDepense = async (id) => {
// Custom hook for deleting a user
    try {
      const response = await fetch(BASEURL+'/api/interfaces/depense/delete/'+ id, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert(
            'Success',
            'Depense deleted successfully',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ],
            { cancelable: true }
          );
      } else {
        throw new Error('Failed to delete Depense');
      }
    } catch (error) {
      console.error('Error deleting Depense:', error.message);
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

    return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.imageContainer} >
 {item.image && <Image source={{ uri: item.image }} style={styles.cardImage} />}
            {!item.image && <Image source={{ uri:'https://cdn-icons-png.flaticon.com/512/2150/2150150.png' }} style={styles.cardImage} />}
        </View>
     
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.nomDep}</Text>
          <Text style={styles.cardSubtitle}> {item.description}</Text>
        </View>
        {/* <View style={styles.cardImage}> */}
            
            {/* </View> */}
            {user.User?.profile?.role=="syndic"&&<TouchableOpacity onPress={() => handleDeleteDepense(item.id_depense)}>
                  <Ionicons name="trash-bin" size={24} color="red" />
                </TouchableOpacity>}
        
      </View>
      <View style={styles.divider} />
      <View style={styles.amountSection}>
        <Text style={styles.amountText}>Montant: <Text style={styles.amountValue}>{item.montant+'MAD'}</Text></Text>
      </View>
    </View>
  );
};


export default CardDepense;



const styles = StyleSheet.create({
    cardImage: {
      flex: 1,
      width: '100%', // Adjusted to take the full width
      height: '100%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  
    card: {
      flex: 1,
      flexDirection: 'column',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      marginBottom: 20,
      backgroundColor: '#f9f9f9',
      width: '100%',
      height: 'auto',
    },
  
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      minHeight: 100, // Adjusted the height for better visibility
    },
  
    imageContainer: {
      width: '30%', // Adjusted to take 30% of the available width
    },
  
    textContainer: {
      marginLeft: 10, // Added margin to separate text from image
      flex: 1, // Takes the remaining space in the row
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
  
    divider: {
      height: 1,
      backgroundColor: '#ccc',
    },
  
    amountSection: {
       // position: 'absolute',
        paddingLeft:'30%',
    //    top: 0,
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
        marginLeft: 5, // Add margin or adjust as needed
        color: '#339df2',
      },
      
  });