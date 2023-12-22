import React from "react";
import { PieChart } from "react-native-chart-kit";
import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

export const PieChartComponent = ({data}) => {
    

    const chartConfig = {
        backgroundGradientFrom: "#1E2923", // Background gradient start color
        backgroundGradientFromOpacity: 0, // Opacity of the background gradient start
        backgroundGradientTo: "#08130D", // Background gradient end color
        backgroundGradientToOpacity: 0.5, // Opacity of the background gradient end
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // Color function for data elements
        strokeWidth: 2, // Width of the chart line
        barPercentage: 0.5, // Percentage of available width each bar should be
        useShadowColorFromDataset: false, // Use shadow color from the dataset
        propsForLabels: {
            fontSize: 14,
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
        },
        decimalPlaces: 2, // Number of decimal places for Y-axis values
        propsForVerticalLabels: {
            fontSize: 12,
        },
        propsForHorizontalLabels: {
            fontSize: 12,
        },
        propsForBackgroundLines: {
            strokeWidth: 0.5,
            stroke: "rgba(0, 0, 0, 0.2)",
        },
        propsForVerticalBaseLine: {
            strokeWidth: 1,
            stroke: "rgba(0, 0, 0, 0.2)",
        },
        style: {
            borderRadius: 16,
        },
    };



    const screenWidth = Dimensions.get("window").width;

    return (
        <SafeAreaView style={[styles.container, { height: screenWidth * 2 }]}>
            <Text style={styles.title}>City Population Distribution</Text>
            <PieChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={""}
                center={[50, 10]}
                absolute={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',
        paddingTop: StatusBar.currentHeight + 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
});
