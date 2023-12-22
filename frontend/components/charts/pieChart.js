import React from "react";
import { PieChart } from "react-native-chart-kit";
import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

export const PieChartComponent = () => {
    const data = [
        {
            name: "Seoul",
            population: 21500000,
            color: "#3498db", // Blue
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        },
        {
            name: "Toronto",
            population: 2800000,
            color: "#e74c3c", // Red
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        },
        {
            name: "Beijing",
            population: 527612,
            color: "#27ae60", // Green
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        },
        {
            name: "New York",
            population: 8538000,
            color: "#f39c12", // Yellow
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        },
        {
            name: "Moscow",
            population: 11920000,
            color: "#8e44ad", // Purple
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        },
    ];

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
                absolute={true}
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
