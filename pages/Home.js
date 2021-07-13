import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Section from '../src/components/Section';
import styles from './styles';

const Home = ({ navigation, route }) => {
    const [idUser, setIdUser] = useState(route.params.idUser);

    return (
        <View style={[styles.container, styles.containerVerticallyCentered]}>
            <Section title="Menu"/>
            <View style={pageStyles.flexContainer}>
                <TouchableOpacity 
                    style={pageStyles.card} 
                    onPress={() => { navigation.navigate('ListAnimals', { idUser: idUser });}}
                >
                    <Icon
                        size={60}
                        name='dog'
                        color='white'
                    />
                    <Text style={pageStyles.text}>Animais</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={pageStyles.card} onPress={() => alert("Ainda em desenvolvimento")}>
                    <Icon
                        size={60}
                        name='syringe'
                        color='white'
                    />
                    <Text style={pageStyles.text}>Vacinas</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={pageStyles.card} onPress={() => {navigation.navigate('EditUser', { idUser: idUser });}}>
                    <Icon
                        size={60}
                        name='user'
                        color='white'
                    />
                    <Text style={pageStyles.text}>Meus Dados</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const pageStyles = StyleSheet.create({
    flexContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '75%'
    },
    card: {
        backgroundColor: '#106ABD',
        height: '25%',
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
        margin: 5,
        flex: 1
    },
    text: {
        color: 'white',
        marginTop: 10,
    },
});

export default Home;