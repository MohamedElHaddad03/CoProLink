import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import useFetchSecure from '../../hook/useFetchSecure';

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const DoubleLineChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data: fetchedData, isLoading: isLoadingData, error: fetchedError, refetch } = useFetchSecure('api/interfaces/stats/paiementper/2023-01-01/2024-01-01');

  useEffect(() => {
    setError(fetchedError);
    setIsLoading(isLoadingData);
    if (fetchedData) {
      organizeDataByMonth(fetchedData);
    }
  }, [fetchedData, isLoadingData, fetchedError]);

  useEffect(() => {
    refetch();
  }, []);

  const organizeDataByMonth = (data) => {
    const monthlyCounts = {};
    data.forEach((payment) => {
      const month = payment.date_creation.substring(0, 7); // Extract year and month
      if (!monthlyCounts[month]) {
        monthlyCounts[month] = { trueCount: 0, falseCount: 0 };
      }
      if (payment.etat === true) {
        monthlyCounts[month].trueCount++;
      } else {
        monthlyCounts[month].falseCount++;
      }
    });
    const formattedData = Object.entries(monthlyCounts).map(([month, counts]) => ({
      month,
      trueCount: counts.trueCount,
      falseCount: counts.falseCount,
    }));
    setMonthlyData(formattedData);
  };
  const sampledata = {
    labels: monthlyData.map((entry) => entry.month),
    datasets: [
      {
        data: monthlyData.map((entry) => entry.trueCount),
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Green color for true values
        strokeWidth: 2,
      },
      {
        data: monthlyData.map((entry) => entry.falseCount),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red color for false values
        strokeWidth: 2,
      },
    ],
  }

  if (isLoading) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Payment Status</Text>
      {monthlyData.length > 0 ? (<LineChart
        data={sampledata}
        width={250}
        height={200}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />) : (
        <Text>No data available</Text>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    left: 0,
    //  borderWidth: 1,
    // borderRadius: 8,
    padding: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chart: {
    marginVertical: 0,
    borderRadius: 16,
  },
});

export default DoubleLineChart;
