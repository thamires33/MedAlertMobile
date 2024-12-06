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
    
});

export default styles;