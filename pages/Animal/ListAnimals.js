import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import CustomFAB from '../../src/components/CustomFAB';
import Section from '../../src/components/Section';


import styles from '../styles';

function formatDate(stringDate) {
    let year = stringDate.substr(0, 4);
    let month = stringDate.substr(5, 2);
    let day = stringDate.substr(8, 2);
    let date = new Date(year, month - 1, day); // month is 0 based
    let formatedDate = ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + (date.getFullYear());
    return formatedDate;
}



const ListAnimals = (props) => {
    const [idUser, setIdUser] = useState(props.route.params.idUser);
    const [animals, setAnimals] = useState([]);

    function confirmDeletion(animal) {
        Alert.alert(
            'Confirmação',
            `Deseja realmente remover ${animal.name}?`,
            [
                {
                    text: "Não!!!",
                    onPress: () => { return }
                },
                {
                    text: "Sim",
                    onPress: () => deleteAnimal(animal)
                }
            ]
        );
    }

    function listAnimals() {
        let data = new FormData();
        data.append('idUser', idUser);
        let options = {
            method: 'POST',
            body: data,
        };
        fetch('https://trabalho-lp-saulo.000webhostapp.com/Animal/list', options)
            .then((response) => response.json())
            .then((json) => {
                setAnimals(json);
            })
            .catch(() => { alert("Erro ao carregar dados, verifique sua conexão com a internet.") });
    }

    function deleteAnimal(animal) {
        let data = new FormData();
        data.append('idUser', idUser);
        data.append('idAnimal', animal.id);

        let options = {
            method: 'POST',
            body: data,
        };

        fetch('https://trabalho-lp-saulo.000webhostapp.com/Animal/remove', options)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 'success') {
                    alert('Animal removido com sucesso!');
                    listAnimals();
                } else {
                    alert(json.status)
                    alert('Erro ao remover animal, tente novamente.');
                }
            })
            .catch((error) => { alert(`Erro ao carregar dados, verifique sua conexão com a internet. ${error}`) });
    }

    useEffect(() => {
        listAnimals();
    }, []);


    return (
        <>
            <ScrollView contentContainerStyle={{ backgroundColor: '#272626', alignItems: 'center', height: '100%' }}>
                <Section title="Animais" />
                {
                    animals.map((animal) => (
                        <TouchableOpacity
                            key={animal.id}
                            style={pageStyles.cardItem}
                            onPress={() => {
                                props.navigation.navigate('EditAnimal', { idUser: idUser, idAnimal: animal.id })
                            }}
                        >
                            <View style={{ flex: 5 }}>
                                <Text style={pageStyles.simpleText}>Nome: {animal.name}</Text>
                                <Text style={pageStyles.simpleText}>Especie: {animal.specieName}</Text>
                                <Text style={pageStyles.simpleText}>
                                    Nascimento: {formatDate(animal.birthDate)}
                                </Text>
                            </View>
                            <TouchableOpacity style={{ flex: 1 }}>
                                <Icon
                                    size={30}
                                    name='trash'
                                    color='white'
                                    onPress={() => confirmDeletion(animal)}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
            <CustomFAB title="Adicionar" onPress={() => { props.navigation.navigate('CreateAnimal', { idUser: idUser }) }} />
        </>
    );
}

const pageStyles = StyleSheet.create({
    cardItem: {
        backgroundColor: '#106ABD',
        width: '75%',
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    simpleText: {
        color: 'white'
    }
});

export default ListAnimals;