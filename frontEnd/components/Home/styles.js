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
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
    },
    headerIcon: {
        height: 20,
        width: 20,
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    containerday: {
        justifyContent: "flex-start",
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingTop: 20,
    },
    blockContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
        paddingHorizontal: 20,
    },
    coloredBlock: {
        width: 39,
        height: 34,
        backgroundColor: 'blue',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    blockText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderWidth: 1, // Adicionando a borda
        borderColor: '#cccccc', // Cor da borda
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardSubtitle: {
        fontSize: 14,
        marginBottom: 10,
    },
    titleLine:{
       
        flexDirection:'row',
        justifyContent:'space-between'
    },
    cardIcon:{
        marginLeft:'auto',
    },
    takeButton: {
        backgroundColor: 'blue',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 5,
    },
    takeButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    addButton: {
        alignItems: "center",
        width: 358,
        height: 41,
        backgroundColor: 'blue',
        borderRadius: 15,
        justifyContent: "center",
    },
    txtAddButton: {
        color: 'white',
        fontFamily: "inter",
    },
});

export default styles;
