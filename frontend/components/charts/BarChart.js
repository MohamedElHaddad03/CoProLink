import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

// ...

const BarsChart = () => {


  const data = [{value: 250, label: 'M'},
  {value: 500, label: 'T', frontColor: '#177AD5'},
  {value: 745, label: 'W', frontColor: '#177AD5'},
  {value: 320, label: 'T'},
  {value: 600, label: 'F', frontColor: '#177AD5'},
  {value: 256, label: 'S'},
  {value: 300, label: 'S'},]
  return (<BarChart data={data}
    barWidth={22}
    noOfSections={3}
    barBorderRadius={4}
    frontColor="lightgray"

    yAxisThickness={0}
    xAxisThickness={0} />)
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
