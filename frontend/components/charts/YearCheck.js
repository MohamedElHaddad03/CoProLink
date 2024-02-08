import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import useFetchSecure from '../../hook/useFetchSecure';

const YearCheck = () => {
  
  //paiementperso
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading , setIsLoading] = useState(true);
  const [properties , setProperties] = useState();
  const { data: fetchedData, isLoading: isLoadingData, error: fetchedError, refetch } = useFetchSecure('api/interfaces/paiementperso/'+selectedYear);

  useEffect(() => {
    setIsLoading(isLoadingData);
    if (!isLoadingData && fetchedData) {
        const defaultDataForYear = Array.from({ length: 12 }, (_, i) => {
            const existingMonth = fetchedData.find(item => {
                const month = new Date(item.date_creation).getMonth() + 1;
                return month === i + 1;
            });
            if (existingMonth) {
                return existingMonth;
            } else {
                return { date_creation: `2024-${i + 1}-10`, etat: false };
            }
        });
        setProperties(defaultDataForYear);
        setIsLoading(false);
    }
}, [fetchedData, isLoadingData]);
  useEffect(() => {
    refetch();


  }, [selectedYear]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    
    console.log(`Data for year ${selectedYear} fetched.`);
  }, [selectedYear]);

  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  // const properties = [
  //   { num: 1, etat: true },
  //   { num: 2, etat: false },
  //   { num: 3, etat: true },
  //   { num: 4, etat: false },
  //   { num: 5, etat: false },
  //   { num: 6, etat: false },
  //   { num: 7, etat: true },
  //   { num: 8, etat: false },
  //   { num: 9, etat: true },
  //   { num: 10, etat: true },
  //   { num: 11, etat: false },
  //   { num: 12, etat: true },
  // ];

  const rowsOfThree = properties ? chunkArray(properties, 3): rowsOfThree;

  const renderRow = (data, isCurrentMonth = false, index) => (
    <View key={isCurrentMonth ? `currentMonth-${index}` : `propertyNums-${index}`} style={[styles.tableRow, isCurrentMonth && styles.currentMonthRow]}>
      {isCurrentMonth && (
        <View style={styles.currentMonthContainer}>
          <TouchableOpacity onPress={() => handleYearChange(selectedYear - 1)} style={styles.leftArrowButton}>
            <Ionicons name="chevron-back" size={25} color="white" />
          </TouchableOpacity>
          <Text style={styles.yearText}>{selectedYear}</Text>
          <TouchableOpacity onPress={() => handleYearChange(selectedYear + 1)} style={styles.rightArrowButton}>
            <Ionicons name="chevron-forward" size={25} color="white" />
          </TouchableOpacity>
        </View>
      )}
      {data.map((item, numx) => (
        <View key={numx} style={[styles.cell, styles.propertyBox, item.etat ? styles.greenBox : (isCurrentMonth ? {} : styles.yellowBox)]}>
          {/* <Text style={styles.boxText}>{item.date_creation}</Text> */}
          <Text style={styles.boxText}>{new Date(item.date_creation).toLocaleString('default', { month: 'short' })}</Text>

        </View>
      ))}
    </View>
  );
  
  

  return (
    <>
      {isLoading && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      {!isLoading && (
        <View style={styles.container}>
          {renderRow([], true, 0)}
          {rowsOfThree.map((row, rowIndex) => renderRow(row, false, rowIndex))}
        </View>
      )}
    </>
  );
  
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,  
    paddingTop: 20,
    width: '90%',  
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#3b67bb',
    paddingVertical: 5,
    borderRadius: 5,
    width: '125%',  
  },
  currentMonthRow: {
    width: '125%',
    backgroundColor: '#3b67bb',
  },
  cell: {
    padding: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  propertyBox: {
    width: 'auto',
    height: 35,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  boxText: {
    color: '#fff',
  },
  greenBox: {
    backgroundColor: 'green',
  },
  yellowBox: {
    backgroundColor: '#F3BC50',
  },
  arrowButton: {
    backgroundColor: '#3b67bb',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftArrowButton: {
    backgroundColor: '#3b67bb',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  
  rightArrowButton: {
    backgroundColor: '#3b67bb',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  
  currentMonthContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  yearText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  
});

export default YearCheck;
