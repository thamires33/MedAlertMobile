import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#f8f8f8',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    menuIconContainer: {
        padding: 8,
    },
    headerTextContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTextRegular: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileIconContainer: {
        padding: 8,
    },
    profileIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    scrollViewContentContainer: {
        paddingTop: 70,
        paddingBottom: 80,
    },
    card: {
        backgroundColor: '#FFF',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 1,
        overflow: 'hidden', // Garante que o botão siga o formato do card
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardSubtitle: {
        fontSize: 16,
        color: '#666',
        marginVertical: 5,
    },
    titleLine: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardIcon: {
        marginLeft: 'auto',
    },

    cardIcon: {
        // marginLeft: 'auto',
         fontSize: 20,
         color: '#007BFF',
     },

    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
    },

    takeButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    takeButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
  
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 20,
        width: 200,
        alignItems: 'center',
    },
    txtAddButton: {
        color: '#FFF',
        fontSize: 16,
    },
    takeButton: {
        backgroundColor: 'blue',
    },
    excludeButton: {
        backgroundColor: 'red',
    },
    cardButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    halfWidthButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 5, // Espaçamento entre os botões
        borderRadius: 5,
        color: 'white',
    },
    textButton: {
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    modalCancelButton: {
        backgroundColor: '#ccc'
    },
    modalConfirmDeleteButton: {
        backgroundColor: 'red',
    },
    modalButtonText: {
        color: 'black',
    },
    noAlarmText: {
        marginTop: 20,
        fontSize: 28,
        color: '#666',
    },
    cardContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    cardTextContainer: {
        flex: 1,
        paddingRight: 10, // Espaço entre texto e imagem
    },
    cardPlaceholderImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
    },
    cardPlaceholderText: {
        color: "#a0a0a0",
        fontSize: 12,
        textAlign: "center",
    },
    excludeButton: {
        backgroundColor: '#FF4C4C', // Vermelho elegante
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15, // Altura do botão
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    textButton: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    
    
});

export default styles;