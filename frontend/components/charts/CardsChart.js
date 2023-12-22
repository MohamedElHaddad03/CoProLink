import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CardsChart = ({ data }) => {
  const [sortedData, setSortedData] = useState([]);
  const [cardColors, setCardColors] = useState([]);
  const screenWidth = Dimensions.get("window").width;
  useEffect(() => {
    // Triez les données par prix avant de les définir dans l'état local
    const sortedByPrice = [...data].sort((a, b) => a.prix - b.prix);
    setSortedData(sortedByPrice);

    // Générez un tableau de couleurs en fonction du nombre de produits
    const colors = generateColors(data.length);
    setCardColors(colors);
  }, [data]);

  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      // Générez des couleurs aléatoires ou utilisez un tableau prédéfini
      // Ici, j'utilise une palette de couleurs prédéfinie
      const palette = ['#FFB6C1', '#AFEEEE', '#98FB98', '#FFD700', '#FFA07A'];
      const colorIndex = i % palette.length;
      colors.push(palette[colorIndex]);
    }
    return colors;
  };

  const renderItem = ({ item, index }) => (
    <ProductCard key={item.id} product={item} color={cardColors[index]} />
  );

  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>Liste des Produits Triée par Prix</Text>
      {sortedData.map((product, index) => (
  <ProductCard key={product.id} product={product} color={cardColors[index]} />
))}

    </View>
  );
};

const ProductCard = ({ product, color }) => {
    const isPositive = product.prix >= 0;
  
    return (
      <View style={[styles.card, { backgroundColor: color }]}>
        <Text style={styles.productName}>{product.nom}</Text>
        <Text>Prix: {product.prix} € {isPositive && <Ionicons name="arrow-up" size={18} color="green" />}
        {!isPositive && <Ionicons name="arrow-down" size={18} color="red" />}</Text>
        {/* Add other details of the product here */}
      </View>
    );
  };
const styles = StyleSheet.create({
  container: {
    width: '80%',
    position:'relative',
    flex: 1,
    alignSelf:'center',
    flexDirection:'row',
    flexWrap:'wrap',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    width:'40%',
    height:'fit-content',
    alignContent:'center',
    justifyContent:'center',
    textAlign:'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    paddingVertical:15,
    margin: 10,
  },
  productName: {
    
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CardsChart;

