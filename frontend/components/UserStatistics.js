import React from 'react';
import { Dimensions, View, StatusBar, StyleSheet, Text, SafeAreaView,ScrollView } from "react-native";
import DonutChart from './charts/pieChart';
import YearCheck from './charts/YearCheck';


const UserStatistics = () => {

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Statistiques</Text>
            {/* <PieChartComponent data={data} />*/}
            {/* <DoubleLineChart /> */}
      

      <View style={styles.chart1}>
      <Text style={{marginBottom:10, fontWeight:'500',fontSize:16,textAlign:'center'}}>Statut des paiements mensuels</Text>

        <YearCheck />
      </View>

      <View style={[styles.chart,{marginBottom:100}]}>
      <Text style={{marginBottom:10, fontWeight:'500',fontSize:16,textAlign:'center'}}>Dépenses Annuelles</Text>

        <DonutChart />
      </View>
      </ScrollView>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '80%',
        top: StatusBar.currentHeight,
        left: '5%',
        height: Dimensions.get('window').height,
    },
    chart: {
        borderRadius:10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#3b67bb108',
        borderWidth:1 ,
        borderColor: "#3b67bb"
        // Shadow properties for iOS
    //     shadowColor: '#3b67bb',//3b67bb
    // shadowOpacity: 1,
    // shadowRadius: 10,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,

    // },
    // elevation: 2,
       },
       title: {
        alignItems:'center',
        alignSelf:"center",
        fontSize: 24,
        fontWeight: '300',
      },

      chart1: {
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: "#3b67bb",
        alignItems: 'center', 
        justifyContent: 'center',
    },
});
export default UserStatistics;
