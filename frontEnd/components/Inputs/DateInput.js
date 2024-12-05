import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'; // Para formatação de data

const DateInput = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    if (onDateChange) {
      onDateChange(currentDate); // Envia a data selecionada para o componente pai
    }
  };

  return (
    <View>
      <Button title="Selecionar Data" onPress={() => setShow(true)} />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Text>Data selecionada: {format(date, 'yyyy-MM-dd')}</Text> {/* Formata a data */}
    </View>
  );
};

export default DateInput;
