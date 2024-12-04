import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'; // Para formatação da hora

const TimeInput = ({ onTimeChange }) => {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(false);
    setTime(currentTime);
    if (onTimeChange) {
      onTimeChange(currentTime); // Envia a hora selecionada para o componente pai
    }
  };

  return (
    <View>
      <Button title="Selecionar Hora" onPress={() => setShow(true)} />
      {show && (
        <DateTimePicker
          testID="timePicker"
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Text>Hora selecionada: {format(time, 'HH:mm')}</Text> {/* Formata a hora */}
    </View>
  );
};

export default TimeInput;
