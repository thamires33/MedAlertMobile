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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#f8f8f8',
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
        padding: 10,
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
});

export default styles;