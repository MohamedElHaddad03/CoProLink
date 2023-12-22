import { Dimensions, View, StatusBar, StyleSheet } from "react-native";
import {  PieChartComponent } from "./charts/pieChart";
import CardsChart from "./charts/CardsChart";

export const Statistics = () => {
  const data2 = [
    { id: 1, nom: 'Produit A', prix: 20 },
    { id: 2, nom: 'Produit B', prix: 15 },
    { id: 3, nom: 'Produit C', prix: 30 },
    { id: 4, nom: 'Produit D', prix: -25 },
    // ... Ajoutez d'autres produits ici
  ];
  const data = [
    {
      name: "Assainissement",
      depense: 2150,
      color: "#3498db", // Blue
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Maintenance",
      depense: 2800,
      color: "#e74c3c", // Red
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Matériel",
      depense: 5272,
      color: "#27ae60", // Green
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Gardiennage",
      depense: 8538,
      color: "#f39c12", // Yellow
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Autre",
      depense: 1192,
      color: "#8e44ad", // Purple
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];


  return (
    <View style={[styles.container]}>
      <PieChartComponent data={data}/>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <CardsChart data={data2} />
    {/* </SafeAreaView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent:'flex-start',
    paddingTop: StatusBar.currentHeight +20 , 
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
