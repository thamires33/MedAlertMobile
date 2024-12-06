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
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 1,
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
        borderRadius: 20,
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
    actionButton: {
        backgroundColor: '#FF9800',  // Cor padronizada para todos os botões
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        marginHorizontal: 10,  // Espaçamento entre os botões
        marginTop: 10,  // Margem superior para os botões não ficarem colados nos textos
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',  // Centraliza os botões horizontalmente
        alignItems: 'center',  // Alinha verticalmente no centro
        marginTop: 10,
    },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    actionButton: { backgroundColor: '#3498db', padding: 10, borderRadius: 5 },
    actionButtonText: { color: '#fff', fontSize: 16 },
    modal: { justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: 300 },
    modalText: { fontSize: 18, marginBottom: 15 },
    button: { backgroundColor: '#2ecc71', padding: 10, margin: 5, borderRadius: 5 },
    buttonText: { color: '#fff' },

    
    
});

export default styles;