import { PieChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import useFetchSecure from "../../hook/useFetchSecure";
const DonutChart = () => {
    //api/interfaces/stats/paiement/PieChart/2023
    const [data3, setData3] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    //http://192.168.1.154:8001/api/interfaces/stats/paiementper/2023-01-01/2024-01-01
    const currentYear = new Date().getFullYear();
    const apiEndpoint = `api/interfaces/stats/paiement/PieChart/${currentYear}`;
    
    const { data: fetchedData, isLoading: isLoadingData, error: fetchedError, refetch } = useFetchSecure(apiEndpoint);
    
    useEffect(() => {
        setError(fetchedError)
        setData3(fetchedData);
        setIsLoading(isLoadingData);


    }, [fetchedData, isLoadingData]);

    useEffect(() => {
        refetch();
    }, [])
    // Function to generate a random color
    
    const palette = ['#FFB6C1', '#AFEEEE', '#98FB98', '#FFD700', '#FFA07A'];

const pieData = Object.entries(fetchedData).map(([category, { montant_total }], i) => ({
    value: montant_total,
    label: category,
    color: palette[i % palette.length], // Use modulo operator to cycle through the palette
}));


    const maxValueData = pieData.reduce((max, current) => max.value > current.value ? max : current, { value: -Infinity });
    const maxLabel = maxValueData.label;





    // data3.map(({ mois, montant_total }) => ({
    //     value: parseFloat(montant_total),
    //     label: getMonthLabel(mois), // Assuming you have a function to get the label for the month
    //     frontColor: mois%2===0 ? '#177AD590' : "#607D8B90",
    //   }));;
    console.log(data3)
    // adb install c:/OMIN/desktop/test.apk
    const renderDot = color => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };

    const renderLegendComponent = () => {
        return (
            <View style={{ flexDirection: 'column', justifyContent: 'center', marginBottom: 10 }}>
                {pieData.map((dataPoint, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                        {renderDot(dataPoint.color)}
                        <Text style={{ color: 'black', marginLeft: 5 }}>
                            {dataPoint.label}: {dataPoint.value}
                        </Text>
                    </View>
                ))}
            </View>
        );
    };



    return (
        <View
            style={{
              // marginBottom: 100,
                   backgroundColor: '#fff',
                  
                flex: 1,
            }}>
            <View
                style={{
                    margin: 20,
                  // padding: 20,
                    borderRadius: 20,
                   // backgroundColor: '#34448B',
                }}>
                
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <PieChart
                        data={pieData}
                        donut
                        showGradient
                        sectionAutoFocus
                        radius={90}
                        innerRadius={60}
                        innerCircleColor={'#fff'}
                        centerLabelComponent={() => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>
                                        {maxValueData.value}
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'black' }}>{maxLabel}</Text>
                                </View>
                            );
                        }}
                    />

                </View>
                {renderLegendComponent()}
            </View>
        </View>);
}

export default DonutChart;