import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Header = ({ title, leftIcon, rightIcon, onLeftPress, onRightPress }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
                <Image source={leftIcon} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.title}>MedAlert</Text>
            <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
                <Image source={rightIcon} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    iconButton: {
        padding: 10,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});

export default Header;