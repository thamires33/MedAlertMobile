import { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView, Keyboard, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Home() {

    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const [remedios, setRemedios] = useState([]);

    // Função para deletar remédio, mas não será usada nos testes visuais
    const handleDelete = async (id) => {
        try {
            // Lógica de deleção aqui, mas será omitida para testes visuais
            console.log(`Remédio com ID ${id} deletado`);
        } catch (err) {
            console.log(err);
        }
    };

    // Função para buscar todos os remédios, usando dados mockados
    const fetchAllRemedios = async () => {
        try {
            const mockRemedios = [
                { id: 1, nome: 'Paracetamol', dosagem: 500, intervalo: 8, proxHorario: '10:00' },
                { id: 2, nome: 'Ibuprofeno', dosagem: 400, intervalo: 6, proxHorario: '12:00' },
                { id: 3, nome: 'Amoxicilina', dosagem: 250, intervalo: 12, proxHorario: '14:00' },
            ];
            setRemedios(mockRemedios);
            Keyboard.dismiss();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAllRemedios();
    }, []);

    function Listagem({ data }) {
        return (
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{data.nome}  {data.dosagem}mg</Text>
                <Text style={styles.cardSubtitle}>A cada {data.intervalo} horas - Prox às {data.proxHorario}</Text>
                <TouchableOpacity style={styles.takeButton}>
                    <Text style={styles.takeButtonText}>Tomar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Image source={require('../../assets/menuIcon.png')} style={styles.headerIcon} />
                    <Text style={styles.textTitle}>MedAlert</Text>
                    <Image source={require('../../assets/profile.png')} />
                </View>

                <View style={styles.containerday}>
                    <View style={styles.blockContainer}>
                        {daysOfWeek.map((day, index) => (
                            <View key={index} style={styles.coloredBlock}>
                                <Text style={styles.blockText}>{day}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <FlatList
                    keyExtractor={item => item.id.toString()}
                    data={remedios}
                    renderItem={({ item }) => (<Listagem data={item} />)}
                />
            </SafeAreaView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.txtAddButton}>Adicionar Remédio</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
