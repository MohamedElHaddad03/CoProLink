import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OverviewTable = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const properties = [
    { id:1 , number: '1', paid: true },
    { id:2 , number: '2', paid: false },
    { id:3 , number: '3', paid: true },
    { id:4 , number: '4', paid: false },
    { id:5 , number: '5', paid: false },
    { id:6 , number: '6', paid: false },
    { id:7 , number: '7', paid: true },
    { id:8 , number: '8', paid: false },
    { id:9 , number: '9', paid: true },
    { id:10 , number: '10', paid: true },
    { id:11 , number: '11', paid: false },
    { id:12 , number: '12', paid: true },
  ];

  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  const rowsOfSeven = chunkArray(properties, 7);

  const renderRow = (data, isCurrentMonth = false, index) => (
    <View key={isCurrentMonth ? `currentMonth-${index}` : `propertyNums-${index}`} style={[styles.tableRow, isCurrentMonth && styles.currentMonthRow]}>
      {data.map((item, idx) => (
        <View key={idx} style={[styles.cell, styles.propertyBox, item.paid ? styles.greenBox : (isCurrentMonth ? {} : styles.grayBox)]}>
          <Text style={styles.boxText}>{item.number}</Text>
        </View>
      ))}
    </View>
  );
  

  return (
    <View style={styles.container}>
      {renderRow([{ number: currentMonth }], true, 0)}
      {rowsOfSeven.map((row, index) => renderRow(row, false, index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
    width: '80%',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#3b67bb',
    paddingVertical: 5,
    borderRadius: 5,
  },
  currentMonthRow: {
    backgroundColor: '#3b67bb',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  propertyBox: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  boxText: {
    color: '#fff',
  },
  greenBox: {
    backgroundColor: 'green',
  },
  grayBox: {
    backgroundColor: '#dfdfdf',
  },
});

export default OverviewTable;
