// Statistics.js
// import React from "react";
import React from 'react';
import { Dimensions, View, StatusBar, StyleSheet, Text, SafeAreaView,ScrollView } from "react-native";
import { PieChartComponent } from "./charts/pieChart";
import DoubleLineChart from "./charts/DoubleLineChart";
import OverviewTable from "./charts/OverviewTable";

import { BarsChart, LinesChart } from "./charts/BarChart";
import DonutChart from './charts/pieChart';
import CardsChart from "./charts/CardsChart";

//import { View, Text, StyleSheet, Dimensions } from 'react-native';

const Statistics = () => {
//     const data = [
//         {
//             name: "Assainissement",
//             depense: 2150,
//             color: "#3498db", // Blue
//             legendFontColor: "#7F7F7F",
//             legendFontSize: 15,
//         },
//         {
//             name: "Maintenance",
//             depense: 2800,
//             color: "#e74c3c", // Red
//             legendFontColor: "#7F7F7F",
//             legendFontSize: 15,
//         },
//         {
//             name: "Matériel",
//             depense: 5272,
//             color: "#27ae60", // Green
//             legendFontColor: "#7F7F7F",
//             legendFontSize: 15,
//         },
//         {
//             name: "Gardiennage",
//             depense: 8538,
//             color: "#f39c12", // Yellow
//             legendFontColor: "#7F7F7F",
//             legendFontSize: 15,
//         },
//         {
//             name: "Autre",
//             depense: 1192,
//             color: "#8e44ad", // Purple
//             legendFontColor: "#7F7F7F",
//             legendFontSize: 15,
//         },
//     ];
//       const data2 = [
//     { id: 1, nom: 'Produit A', prix: 20 },
//     { id: 2, nom: 'Produit B', prix: 15 },
//     { id: 3, nom: 'Produit C', prix: 30 },
//     { id: 4, nom: 'Produit D', prix: -25 },
//     // ... Ajoutez d'autres produits ici
//   ];
    return (
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.title}>Statistics</Text>
            {/* <PieChartComponent data={data} />*/}
            {/* <DoubleLineChart /> */}
            <View style={styles.chart}>
        <OverviewTable />
      </View>

      <View style={styles.chart}>
        <BarsChart />
      </View>

      <View style={styles.chart}>
        <DoubleLineChart />
      </View>

      <View style={[styles.chart,{marginBottom:100}]}>
        <DonutChart />
      </View>
      </ScrollView>
            {/* <CardsChart data={data2} /> */}
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
    chart: {
        borderRadius:10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#3b67bb108',
        borderWidth:1 ,
        borderColor: "#3b67bb"
        // Shadow properties for iOS
    //     shadowColor: '#3b67bb',//3b67bb
    // shadowOpacity: 1,
    // shadowRadius: 10,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,

    // },
    // elevation: 2,
       },
       title: {
        alignItems:'center',
        alignSelf:"center",
        fontSize: 24,
        fontWeight: '300',
      },
});
export default Statistics;





// import React from "react";
// import { Dimensions, View, StatusBar, StyleSheet, Text } from "react-native";
// import { PieChartComponent } from "./charts/pieChart";
// import DoubleLineChart from "./charts/DoubleLineChart";
// import OverviewTable from "./charts/OverviewTable";

// import { BarsChart, LinesChart, DonutChart } from "./charts/BarChart";
// import CardsChart from "./charts/CardsChart";

//  const Statistics = () => {
//   const data2 = [
//     { id: 1, nom: 'Produit A', prix: 20 },
//     { id: 2, nom: 'Produit B', prix: 15 },
//     { id: 3, nom: 'Produit C', prix: 30 },
//     { id: 4, nom: 'Produit D', prix: -25 },
//     // ... Ajoutez d'autres produits ici
//   ];
//   const data = [
//     {
//       name: "Assainissement",
//       depense: 2150,
//       color: "#3498db", // Blue
//       legendFontColor: "#7F7F7F",
//       legendFontSize: 15,
//     },
//     {
//       name: "Maintenance",
//       depense: 2800,
//       color: "#e74c3c", // Red
//       legendFontColor: "#7F7F7F",
//       legendFontSize: 15,
//     },
//     {
//       name: "Matériel",
//       depense: 5272,
//       color: "#27ae60", // Green
//       legendFontColor: "#7F7F7F",
//       legendFontSize: 15,
//     },
//     {
//       name: "Gardiennage",
//       depense: 8538,
//       color: "#f39c12", // Yellow
//       legendFontColor: "#7F7F7F",
//       legendFontSize: 15,
//     },
//     {
//       name: "Autre",
//       depense: 1192,
//       color: "#8e44ad", // Purple
//       legendFontColor: "#7F7F7F",
//       legendFontSize: 15,
//     },
//   ];


//   return (
//     <View style={styles.container}>
//       <PieChartComponent data={data} />
//       <DoubleLineChart />
//       <OverviewTable />
//       <BarsChart />
//       <LinesChart />
//       <DonutChart />
//       <CardsChart data={data2} />
//       {/* Other components and their respective props */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: 'flex-start',
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
// });



// export default Statistics;