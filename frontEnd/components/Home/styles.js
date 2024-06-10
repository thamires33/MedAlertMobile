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
        fontWeight:'bold',
        fontSize:20,
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