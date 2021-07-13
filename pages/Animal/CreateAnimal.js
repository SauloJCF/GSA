import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Picker, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles';

import Section from '../../src/components/Section';

const formatedDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    return ("0" + day).slice(-2) + '/' + ("0" + month).slice(-2) + '/' + year;
}

const CreateAnimal = (props) => {
    const [idUser, setIdUser] = useState(props.route.params.idUser);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [species, setSpecies] = useState([]);

    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState(new Date(Date.now()));
    const [selectedSpecie, setSelectedSpecie] = useState("1");
    const [sex, setSex] = useState("0");

    const registerAnimal = () => {
        if (name === "") {
            alert("Por favor preencha todos os campos!");
            return;
        }
        let data = new FormData();
        data.append('name', name);
        data.append('birthDate', (birthDate.getFullYear() + '-' + birthDate.getMonth() + '-' + birthDate.getDate()));
        data.append('idSpecie', selectedSpecie);
        data.append('sex', sex);
        data.append('idUser', idUser);

        let options = {
            method: 'POST',
            body: data
        };

        fetch("https://trabalho-lp-saulo.000webhostapp.com/Animal/insert", options)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 'success') {
                    alert('Animal cadastrado com sucesso!');
                    props.navigation.push('ListAnimals', { idUser: idUser });
                } else {
                    alert('Erro ao cadastrar animal, tente novamente.');
                }
            }
            ).catch((error) => { 
                alert("Erro ao carregar dados, verifique sua conexão com a internet. " + error) 
            });
    }

    useEffect(() => {
        let options = {
            method: 'POST',
        };
        fetch('https://trabalho-lp-saulo.000webhostapp.com/Specie/list', options)
            .then((response) => response.json())
            .then((json) => {
                setSpecies(json);
            })
            .catch(() => { alert("Erro ao carregar dados, verifique sua conexão com a internet.") });
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Section title='ADICIONAR ANIMAL' />
            <View style={{ width: '80%', marginTop: '5%' }}>

                <Input
                    labelStyle={styles.label}
                    placeholder="Pirata"
                    label="Nome:*"
                    inputContainerStyle={styles.inputContainer}
                    value={name}
                    onChangeText={setName}
                />

                <TouchableOpacity onPress={() => setCalendarVisible(true)}>
                    <Input
                        labelStyle={styles.label}
                        editable={false}
                        label="Data de Nascimento:*"
                        inputContainerStyle={styles.inputContainer}
                        rightIcon={
                            <Icon
                                name='calendar'
                                size={24}
                                color='black'
                            />
                        }

                        value={formatedDate(birthDate)}
                    />
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={calendarVisible}
                    mode="date"
                    onCancel={() => {
                        setCalendarVisible(false);
                    }}
                    onConfirm={(date) => {
                        setBirthDate(date);
                        setCalendarVisible(false);
                    }}
                />
                <Text style={pageStyles.fakeLabel}>
                    Espécie:*
                </Text>
                <View style={pageStyles.fakeInput}>
                    <Picker
                        selectedValue={selectedSpecie}
                        onValueChange={(itemValue) => { setSelectedSpecie(itemValue); }}
                        style={{ height: 45, color: 'black', width: '100%' }}
                    >
                        {
                            species.map((specie) => (
                                <Picker.Item
                                    key={specie.id}
                                    label={specie.name}
                                    value={specie.id}
                                />
                            ))}
                    </Picker>
                </View>
                <Text style={pageStyles.fakeLabel}>
                    Sexo:*
                </Text>
                <View style={pageStyles.fakeInput}>
                    <Picker
                        selectedValue={sex}
                        onValueChange={(itemValue) => { setSex(itemValue); }}
                        style={{ height: 45, color: 'black', width: '100%' }}
                    >
                        <Picker.Item
                            label="Feminino"
                            value="0"
                        />
                        <Picker.Item
                            label="Masculino"
                            value="1"
                        />
                    </Picker>
                </View>
                <Button
                    title="CADASTRAR"
                    buttonStyle={styles.button}
                    onPress={registerAnimal}
                />
            </View>
        </ScrollView>
    );
};

const pageStyles = StyleSheet.create({
    fakeLabel: {
        color: '#00D1FF',
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: '3%',
        marginBottom: 6,
    },
    fakeInput: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: '93%',
        marginHorizontal: 'auto',
        alignSelf: 'center', marginBottom: 20
    }
});

export default CreateAnimal;