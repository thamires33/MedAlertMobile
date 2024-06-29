import { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView, Keyboard, FlatList, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles";
import axios from "axios";

const HomeScreen = () => {
    const navigation = useNavigation();
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const [alarmes, setAlarmes] = useState([]);

    const fetchAllAlarmes = async () => {
        try {
            const response = await axios.get('http://localhost:8081/alarme');
            setAlarmes(response.data);
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
                    <Text style={styles.cardTitle}>{data.medicamento} {data.dosagem}mg</Text>
                    <TouchableOpacity>
                        <Icon name='edit' style={styles.cardIcon}>Editar</Icon>
                    </TouchableOpacity>
                </View>
                <Text style={styles.cardSubtitle}>Frequência: A cada {data.frequencia} horas</Text>
                {/* Adicione mais campos conforme necessário */}
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
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuIconContainer}>
                        <Icon name="menu" size={24} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTextRegular}>MedAlert</Text>
                    </View>
                    <TouchableOpacity style={styles.profileIconContainer}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/150' }}
                            style={styles.profileIcon}
                        />
                    </TouchableOpacity>
                </View>

                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={alarmes}
                    renderItem={({ item }) => <Listagem data={item} />}
                    contentContainerStyle={styles.flatListContentContainer}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('Alarm')}
                    >
                        <Text style={styles.txtAddButton}>Adicionar Remédio</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>

        </View>
    );
}
export default HomeScreen;