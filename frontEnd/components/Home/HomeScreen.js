import { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView, Keyboard, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Icon, ListItem } from "react-native-elements";
import styles from "./styles";
import axios from "axios";

export default function Home() {

    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    //Variável que recebe os dados da API
    const [alarmes, setAlarmes] = useState([]);

    // Função para deletar remédio, mas não será usada nos testes visuais
    const handleDelete = async (id) => {
        try {
            // Lógica de deleção aqui, mas será omitida para testes visuais
            console.log(`Remédio com ID ${id} deletado`);
        } catch (err) {
            console.log(err);
        }
    };

    // Função para buscar todos os alarmes --- Não funcional no momento, manter comentada até ser resolvida
    // const fetchAllAlarmes = async () => {
    //     try {
    //         const res=await axios.get("http://localhost:8081/alarme");           
    //         setAlarmes(res.data);
    //         Keyboard.dismiss();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    //Função que inicia a listagem ao abrir o App
    useEffect(() => {
        fetchAllAlarmes();
    }, []);

    // Função para buscar todos os alarmes, usando dados nockados para avaliação visual
    const fetchAllAlarmes = async () => {
        try {
            // Dados mockados
            const mockData = [
                { id: '1', nome: 'Cardil', dosagem: 20, intervalo: 8, proxHorario: '8:00am' },
                { id: '2', nome: 'Omeprazol', dosagem: 10, intervalo: 8, proxHorario: '8:00am' },
                { id: '3', nome: 'Frudilat', dosagem: 15, intervalo: 8, proxHorario: '8:00am' },
            ];
            setAlarmes(mockData);
            Keyboard.dismiss();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAllAlarmes();
    }, []);


    function Listagem({ data }) {
        return (

            <View style={styles.card}>
                <View style={styles.titleLine}>
                    <Text style={styles.cardTitle}>{data.nome}  {data.dosagem}mg</Text>
                    <TouchableOpacity>
                        <Icon name='edit' style={styles.cardIcon}>Teste</Icon>
                    </TouchableOpacity>
                </View>
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
                    keyExtractor={item => item.id}
                    data={alarmes}
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
