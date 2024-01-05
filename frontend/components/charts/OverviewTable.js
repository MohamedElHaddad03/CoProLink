import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useFetchSecure from '../../hook/useFetchSecure';

const OverviewTable = () => {
  const [properties, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //http://192.168.1.154:8001/api/interfaces/stats/paiementper/2023-01-01/2024-01-01
  const { data: fetchedData, isLoading: isLoadingData, error: fetchedError, refetch } = useFetchSecure('api/interfaces/stats/paiementmens');

  useEffect(() => {
    setError(fetchedError)
    setData(fetchedData);
    setIsLoading(isLoadingData);


  }, [fetchedData, isLoadingData]);

  useEffect(() => {
    refetch();
  }, [])
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  // const properties = [
  //   { num:1 , num: '1', etat: true },
  //   { num:2 , num: '2', etat: false },
  //   { num:3 , num: '3', etat: true },
  //   { num:4 , num: '4', etat: false },
  //   { num:5 , num: '5', etat: false },
  //   { num:6 , num: '6', etat: false },
  //   { num:7 , num: '7', etat: true },
  //   { num:8 , num: '8', etat: false },
  //   { num:9 , num: '9', etat: true },
  //   { num:10 , num: '10', etat: true },
  //   { num:11 , num: '11', etat: false },
  //   { num:12 , num: '12', etat: true },
  // ];

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
      {data.map((item, numx) => (
        <View key={numx} style={[styles.cell, styles.propertyBox, item.etat ? styles.greenBox : (isCurrentMonth ? {} : styles.grayBox)]}>
          <Text style={styles.boxText}>{item.num}</Text>
        </View>
      ))}
    </View>
  );


  return (
    <View style={styles.container}>
      {renderRow([{ num: currentMonth }], true, 0)}
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
    wnumth: '80%',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWnumth: 0,
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
    wnumth: 30,
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
