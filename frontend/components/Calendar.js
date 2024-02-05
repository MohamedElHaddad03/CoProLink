import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { View, Button, Platform, Touchable, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
const CalendarComponent = ({ onDateChange }) => {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        // Appel de la fonction de rappel pour transmettre la date sélectionnée
        onDateChange(currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    return (
        <View>
            <View>
                <TouchableOpacity onPress={showDatepicker}>
                    <Text style={{marginLeft:5}}><Ionicons
                   
            name="calendar"
            size={35}
            color="#3b67bb"
            
          // Change 'true' to {true}
          /></Text>
                </TouchableOpacity>
                
            </View>
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

export default CalendarComponent;
