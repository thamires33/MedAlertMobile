import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    //#region cabeçalho logo
    logo_login: {
        marginTop: 50,
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    login_title: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    //#endregion

    //#region formulario cadastro
    login__form: {
        marginTop: 50,
        width: "80%",
    },
    icon: {
        position: 'absolute',
        right: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    login__input: {
        backgroundColor: "#EEEEEE",
        fontSize: 19,
        padding: 10,
        alignSelf: 'center',
        borderRadius: 20,
        width: 300
    },
    login__button: {
        padding: 12,
        backgroundColor: "#216caf",
        alignSelf: "center",
        borderRadius: 20,
        padding: 10,
        width: 200,
        marginBottom: 10,
    },
    login__buttonB:{
        padding: 16,
        backgroundColor: "#216caf",
        alignSelf: "center",
        borderRadius: 20,
        padding: 10,
        width: 200
        
    },
    login__buttonText: {
        fontSize: 18,
        color: "white",
        alignSelf: 'center',
        fontFamily: 'Arial',
    },
    //#endregion

    //#region letras miudas
    miudosText1: {
        fontSize: 8,
        color:  '#216caf',
        fontFamily: 'Arial',
    },
    miudosText2: {
        fontSize: 8,
        color: "#707175",
        fontFamily: 'Arial',
    },
    miudosContainer: {
        width: 150,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },

    miudosContainer2: {
        width: 300,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15,
    },
    miudosText3: {
        fontSize: 12,
        color:  '#216caf',
        fontFamily: 'Arial',
    },
    miudosText4: {
        fontSize: 12,
        color: "#707175",
        fontFamily: 'Arial',
    },
    //#endregion

    //#region card de alerta
    alertContainer: {
        position: 'absolute',
        top: 50,
        left: '10%',
        right: '10%',
        padding: 15,
        backgroundColor: 'red',
        borderRadius: 5,
        alignItems: 'center',
    },
    alertText: {
        color: '#fff',
        fontSize: 16,
    },
    //#endregion

    //#region google
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    dividerText: {
        marginHorizontal: 10,
        fontSize: 14,
        color: '#888',
    },
    googleButton: {
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        padding: 12,
        borderRadius: 25,
        width: 200,
        marginTop: 20, // Aumenta o espaçamento entre os botões
        elevation: 4, // Adiciona uma sombra
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    googleIcon: {
        marginRight: 12,
        width: 20,
        height: 20,
    },
    googleButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    //#endregion
});

export default styles;
