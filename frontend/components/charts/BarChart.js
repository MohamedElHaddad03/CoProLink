import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const BarsChart = () => {
  

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
    datasets: [
      {
        data: [550, 700, 650, 800, 950, 500],
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Green color for cotisations
      },
    ],
  };
  
  const chartConfig1 = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(59, 103, 187, ${opacity})`,
  };


  return (
    <View style={styles.container}>

     <View>
        <Text style={styles.title}>Cotisations Total per Month</Text>
        <BarChart
        data={data}
        width={325}
        height={200}
        chartConfig={chartConfig1}
        style={styles.chart}
        />
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default BarsChart;
