import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import useFetchSecure from '../../hook/useFetchSecure';

// ...

const BarsChart = () => {

const [data3,setData3]=useState([]);
const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
//http://192.168.1.154:8001/api/interfaces/stats/paiementper/2023-01-01/2024-01-01
const { data: fetchedData, isLoading: isLoadingData, error: fetchedError, refetch } = useFetchSecure('api/interfaces/stats/paiement/chart');

    useEffect(() => {
        setError(fetchedError)
        setData3(fetchedData);
        setIsLoading(isLoadingData);


    }, [fetchedData, isLoadingData]);

    useEffect(()=>{
        refetch();
    },[])
  // const data = [{value: 250, label: 'M'},
  // {value: 500, label: 'T', frontColor: '#177AD5'},
  // {value: 745, label: 'W', frontColor: '#177AD5'},
  // {value: 320, label: 'T'},
  // {value: 600, label: 'F', frontColor: '#177AD5'},
  // {value: 256, label: 'S'},
  // {value: 300, label: 'S'},]
  const data = data3.map(({ mois, montant_total }) => ({
    value: parseFloat(montant_total),
    label: getMonthLabel(mois), // Assuming you have a function to get the label for the month
    frontColor: mois%2===0 ? '#177AD590' : "#607D8B90",
  }));
  function getMonthLabel(month) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    return months[month - 1] || '';
  }
  return (<BarChart
    showFractionalValues
    showYAxisIndices
    noOfSections={4}
    maxValue={400}
    data={data}
    isAnimated
  />)
};
const LinesChart = () => {


  const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }]
  return (<LineChart data={data} />)
};
const DonutChart = () => {


  const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }]
  return (<PieChart data={data}
 
      showText
      textColor="black"
      radius={150}
      textSize={20}
      focusOnPress
      showValuesAsLabels
      showTextBackground
      textBackgroundRadius={26}
       />)
};

// <LineChart data = {data} />
// <PieChart data = {data} />

// // For Horizontal Bar chart, just add the prop horizontal to the <BarChart/> component

// <BarChart data = {data} horizontal />

// // For Area chart, just add the prop areaChart to the <LineChart/> component

// <LineChart data = {data} areaChart />

// // For Donut chart, just add the prop donut to the <PieChart/> component

// <PieChart data = {data} donut />


export { BarsChart, LinesChart, DonutChart };
