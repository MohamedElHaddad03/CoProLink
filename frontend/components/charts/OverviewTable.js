import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useFetchSecure from '../../hook/useFetchSecure';
import CalendarComponent from '../Calendar';

const OverviewTable = () => {
  const [properties, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2); // +1 car les mois commencent à 0

  // Date de début : premier jour du mois actuel
  const startDate = `${currentYear}-${currentMonth}-01`;

  // Date de fin : dernier jour du mois actuel
  const lastDayOfMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
  const endDate = `${currentYear}-${currentMonth}-${lastDayOfMonth}`;

  // Utilisez les valeurs initiales dans useState
  const [dateDepart, setDateDepart] = useState(startDate);
  const [dateFin, setDateFin] = useState(endDate);
  const [selectedDate, setSelectedDate] = useState(null);
  const [mois, setMois] = useState(new Date().toLocaleString('default', { month: 'long', locale: 'fr' }));


  const handleDateChange = (date) => {
    setSelectedDate(date);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Les mois sont 0-indexés
    const day = date.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    console.log('Formatted Date:', formattedDate);

    const firstDayOfMonth = `${year}-${month}-01`;
    const lastDayOfMonth = `${year}-${month}-${new Date(year, date.getMonth() + 1, 0).getDate()}`;
    setMois(date.toLocaleString('default', { month: 'long', locale: 'fr' }));
    setDateDepart(firstDayOfMonth);
    setDateFin(lastDayOfMonth);

  };


  //http://192.168.1.154:8001/api/interfaces/stats/paiementper/2023-01-01/2024-01-01
  const { data: fetchedData, isLoading: isLoadingData, error: fetchedError, refetch } = useFetchSecure('api/interfaces/stats/paiementper/' + `${dateDepart}/${dateFin}`);

  useEffect(() => {
    setError(fetchedError)
    setData(fetchedData);
    setIsLoading(isLoadingData);


  }, [fetchedData, isLoadingData]);

  useEffect(() => {
    refetch();
    console.error('api/interfaces/stats/paiementper/' + `${dateDepart}/${dateFin}`)
  }, [dateDepart, dateFin])
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

  const rowsOfSeven = chunkArray(properties, 3);

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

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {renderRow([{ num: mois }], true, 0)}
      <CalendarComponent onDateChange={handleDateChange} />
        
      </View>

      

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
    width:'90%',
    backgroundColor: '#3b67bb',
  },
  cell: {
    padding: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  propertyBox: {
    // wnumth: 30,
    width: 'auto',
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
    backgroundColor: '#F3BC50',
  },
});

export default OverviewTable;
