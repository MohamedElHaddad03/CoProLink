import { Dimensions, FlatList, KeyboardAvoidingView, SafeAreaView, ScrollView, ScrollViewBase, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import CardDepense from "./cards/cardDepense"
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { CategoryPopUp } from "./Modals/CategoryPopUp";
import { DepensePopUp } from "./Modals/DepensePopUp";

export const Depense = () => {
  const [isModalCategVisible, setModalCategVisible] = useState(false);
  const [isModalDepVisible, setModalDepVisible] = useState(false);

  const toggleCategModal = () => {
    setModalCategVisible(!isModalCategVisible);
  }
  const toggleDepgModal = () => {
    setModalDepVisible(!isModalDepVisible);
  }

  const [data, setData] = useState([
    { id: '1', Categorie: 'Categorie 1', name: 'Sanitaire', description: 'eskfdvbsfkdvjlftjhstdjhsjstjsdjnstjnstnstnbqsfvkbjq svddmkjsBMlSDNVmlSDJV', price: 1500, },
    { id: '2', Categorie: 'Categorie 2', name: 'Électroménager', description: 'eskfdvbsfkdvjlbqsfvkbjq svddmkjsBMlSDNVmlSDJV', price: 2000, image: 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/04/wwf.jpg?auto=format&q=60&fit=max&w=930' },
    { id: '3', Categorie: 'Categorie 1', name: 'Plomberie', description: 'eskfdvbsfkdvjlbqsfvkbjq svddmkjsBMlSDNVmlSDJV', price: 1200, image: 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/04/wwf.jpg?auto=format&q=60&fit=max&w=930' },
    { id: '4', Categorie: 'Categorie 2', name: 'Plomberie', description: 'eskfdvbsfkdvjlbqsfvkbjq svddmkjsBMlSDNVmlSDJV', price: 1200, image: 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/04/wwf.jpg?auto=format&q=60&fit=max&w=930' }
    , { id: '5', Categorie: 'Categorie 2', name: 'hhhhhhh', description: 'eskfdvbsfkdvjlbqsfvkbjq svddmkjsBMlSDNVmlSDJV', price: 1200, image: 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/04/wwf.jpg?auto=format&q=60&fit=max&w=930' }
    , { id: '6', Categorie: 'Categorie 2', name: 'hhhhhhh', description: 'eskfdvbsfkdvjlbqsfvkbjq svddmkjsBMlSDNVmlSDJV', price: 1200, image: 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/04/wwf.jpg?auto=format&q=60&fit=max&w=930' }
    , { id: '7', Categorie: 'Categorie 2', name: 'hhhhhhh', description: 'eskfdvbsfkdvjlbqsfvkbjq svddmkjsBMlSDNVmlSDJV', price: 1200, image: 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/04/wwf.jpg?auto=format&q=60&fit=max&w=930' }
    , { id: '8', Categorie: 'Categorie 2', name: 'hhhhhhh', description: 'eskfdvbsfkdvjlbqsfvkbjq svddmkjsBMlSDNVmlSDJV', price: 1200, image: 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/04/wwf.jpg?auto=format&q=60&fit=max&w=930' }

    // Add more property data as needed
  ]);
  const categories = Array.from(new Set(data.map(item => item.Categorie)));


  const long = data.length;
  return (<View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Depenses</Text>

    </View>
    <View style={styles.header}>
      
      <TouchableOpacity onPress={() => setModalCategVisible(true)} style={styles.categoryButton}>
        <Ionicons name="add-circle-outline" size={30} color='white' />
        <Text style={styles.buttonText}>
          Categorie</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setModalDepVisible(true)}
      style={styles.expenseButton}>
  <Ionicons
    name="add-circle-outline"
    size={30}
    color="white"
    onPress={() => setModalDepVisible(false)}
     // Change 'true' to {true}
  />
  <Text style={styles.buttonText}> Depense</Text>
</TouchableOpacity>

      <CategoryPopUp isModalVisible={isModalCategVisible} toggleModal={toggleCategModal} />
<DepensePopUp isModalVisible={isModalDepVisible} toggleModal={toggleDepgModal} />

    </View>
    <KeyboardAvoidingView behavior='height'>
      <ScrollView style={[styles.FlatlistContainer]} showsVerticalScrollIndicator={false}>

        {categories.map(category => {
          const categoryItems = data.filter(item => item.Categorie === category);
          const sumPrices = categoryItems.reduce((sum, item) => sum + item.price, 0);

          return (
            <View key={category}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <FlatList
                data={categoryItems}
                renderItem={CardDepense}
                keyExtractor={(item) => item.id}
                style={styles.Flatlist}
              // contentContainerStyle={{ paddingBottom: 20 }}
              //ListFooterComponent={<View style={{ height: 0, marginBottom: 90 }}></View>}

              />
              <View style={styles.totalContainer}>
                <Text style={{ padding: 7, color: '#339df2' }}><Text style={{ color: 'black', fontWeight: 'bold' }}>Prix total:</Text>{`     ${sumPrices}$`}</Text>
              </View>
            </View>
          );
        })}
        <View style={{ height: 100,padding:90 }}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  </View>);
}


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
    padding: 20,
    //   position: 'absolute',
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent:'space-between',
    marginTop: 10, // Adjusted marginTop for header alignment
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  Flatlist: {
    flex: 1,
    position: 'relative',
    alignSelf: 'center',
    width: '100%',
    height: 'auto',
    marginTop: 20,
  },
  categoryTitle: {
    padding: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  totalContainer: {
    // position: 'absolute',
    backgroundColor: '#f0f0f0',
    right: 0,
    marginBottom: 15,
    // top: 0, // Adjust the top position as needed
    borderColor: '#ccc',
    borderWidth: 1,
    width: '60%',
    borderRadius: 10,
    elevation: 5, // For Android elevation shadow
    shadowColor: 'black', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    maxWidth: '100%', // Prevent container from exceeding parent's width
  },
  FlatlistContainer: {
    // flex:1,
    //  height: Dimensions.get('window').height,
    marginBottom: 20,
    //  height:'90%'
  },
  categoryButton: {
    backgroundColor: '#3CBA92',
   
  //  flex:1,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignContent:'center',
    flexDirection:'row',
    alignItems:'center'


  },
  expenseButton: {
    backgroundColor: '#BA563C',
    //opacity:0.9,
    padding: 10,
    borderRadius: 5,
    alignContent:'center',
    flexDirection:'row',
    alignItems:'center'

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center'
  },

});

