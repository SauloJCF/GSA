import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#272626',
        alignItems: 'center',
    },
    containerVerticallyCentered: {
        justifyContent: 'center',
    },
    h1: {
        color: '#00D1FF',
        fontSize: 42,
        textAlign: 'center',
        fontFamily: 'Inter_900Black',
    },
    h2: {
        color: 'white',
        fontSize: 20
    },
    card: {
        width: '100%',
        backgroundColor: '#272626',
        borderWidth: 0
    },
    button: {
        marginTop: 30,
        backgroundColor: '#106ABD',
        textAlign: 'center',
        width: '100%',
    },
    input: {
        color: 'white',
    },
    p: {
        color: '#00D1FF',
        textAlign: 'left',
        marginTop: 30,
    },
    label: {
        color: '#00D1FF'
    },
    inputContainer: {
        paddingHorizontal: 5,
        borderStyle: 'solid', 
        borderColor: 'white', 
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 5,
        color: 'black'
    },
});

export default styles;
