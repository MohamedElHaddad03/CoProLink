import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const sampleData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      title: 'Revenues',  
      data: [20, 40, 60, 40, 20, 40],
      color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Red color for expenses
      strokeWidth: 5,
    },
    {
      title: 'Expenses',
      data: [60, 40, 20, 40, 60, 40],
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Green color for revenues
      strokeWidth: 5,
    },
  ],
};

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const DoubleLineChart = () => {
  const generateDatasets = () => {
    return sampleData.datasets.map((set, index) => ({
      data: set.data,
      color: set.color,
      strokeWidth: set.strokeWidth,
    }));
  };

  const generateLabels = () => {
    return sampleData.labels;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Example Chart</Text>
      <LineChart
        data={{ datasets: generateDatasets(), labels: generateLabels() }}
        width={325}
        height={200}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
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

export default DoubleLineChart;
