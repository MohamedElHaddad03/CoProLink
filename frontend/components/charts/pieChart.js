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
    const { data: fetchedData, isLoading: isLoadingData, error: fetchedError, refetch } = useFetchSecure('api/interfaces/stats/paiement/PieChart/2023');

    useEffect(() => {
        setError(fetchedError)
        setData3(fetchedData);
        setIsLoading(isLoadingData);


    }, [fetchedData, isLoadingData]);

    useEffect(() => {
        refetch();
    }, [])

    const pieData = data3;
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
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                        }}>
                        {renderDot('#006DFF')}
                        <Text style={{ color: 'white' }}>Excellent: 47%</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#8F80F3')}
                        <Text style={{ color: 'white' }}>Okay: 16%</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                        }}>
                        {renderDot('#3BE9DE')}
                        <Text style={{ color: 'white' }}>Good: 40%</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#FF7F97')}
                        <Text style={{ color: 'white' }}>Poor: 3%</Text>
                    </View>
                </View>
            </>
        );
    };

    return (
        <View
            style={{
                paddingVertical: 100,
                //   backgroundColor: '#34448B',
                flex: 1,
            }}>
            <View
                style={{
                    margin: 20,
                    padding: 16,
                    borderRadius: 20,
                    backgroundColor: '#232B5D',
                }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                    Performance
                </Text>
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <PieChart
                        data={pieData}
                        donut
                        showGradient
                        sectionAutoFocus
                        radius={90}
                        innerRadius={60}
                        innerCircleColor={'#232B5D'}
                        centerLabelComponent={() => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text
                                        style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                                        47%
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'white' }}>Excellent</Text>
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