import { Dimensions, View, StatusBar, StyleSheet } from "react-native";
import {  PieChartComponent } from "./charts/pieChart";

export const Statistics = () => {
  const data = [
    {
      name: "Seoul",
      population: 21500000,
      color: "#3498db", // Blue
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#e74c3c", // Red
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "#27ae60", // Green
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 8538000,
      color: "#f39c12", // Yellow
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "#8e44ad", // Purple
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];


  return (
    <View style={[styles.container]}>
      <PieChartComponent/>
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
