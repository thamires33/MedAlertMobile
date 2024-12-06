import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';


const TomarScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { receitaId } = route.params;  // Recebendo o ID da receita

    const [tomado, setTomado] = useState(false);

    const handleTomarMedicamento = async () => {
        try {
            // Salvar no AsyncStorage que o medicamento foi tomado
            await AsyncStorage.setItem(`medicamentoTomado_${receitaId}`, 'true');
            setTomado(true);
        } catch (error) {
            console.error("Erro ao salvar no AsyncStorage", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Confirmar se tomou o medicamento:</Text>
            <Text>Receita ID: {receitaId}</Text>
            
            {!tomado ? (
                <TouchableOpacity 
                    style={styles.button}
                    onPress={handleTomarMedicamento}>
                    <Text style={styles.buttonText}>Marcar como Tomado</Text>
                </TouchableOpacity>
            ) : (
                <Text>Medicamento marcado como tomado!</Text>
            )}
        </View>
    );
};

export default TomarScreen;
