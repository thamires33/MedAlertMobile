import { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView, Keyboard, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import styles from "./styles";

export default function Home() {


    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const [remedios, setRemedios] = useState([]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/remedio/${id}`);

        } catch (err) {
            console.log(err);
        }
    };

    const fetchAllRemedios = async () => {
        try {
            const res = await axios.get("http://localhost:8081/remedio");
            setRemedios(res.data);
            Keyboard.dismiss();

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAllRemedios();
    }, []);

    function getActions(data) {
        return (
            <>
                <Button onPress={() => RemedioList.navigation.navigate('RemedioEdit', data)} type="clear"
                    icon={<Icon name="edit" size={25} color="orange" />} />

            </>
        );
    }

    function Listagem({ data }) {
        return (
            <ListItem bottonDivider>
                <ListItem.Content>
                    <ListItem.Title>{data.nome}</ListItem.Title>
                    <ListItem.Subtitle>{data.proxHorario}</ListItem.Subtitle>
                </ListItem.Content>
                {getActions(data)}
            </ListItem>
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








};