import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Input, Button, CheckBox } from 'react-native-elements';

import storage from '../../utils/storage';

import styles from '../styles';

const Login = ({ navigation }) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [keepSession, setKeepSession] = useState(false);

    useEffect(() => {
        storage
            .load({
                key: 'loggedUser',
            })
            .then(ret => {
                let idUser = ret.idUser;
                navigation.navigate('Home', { idUser: idUser });
            })
            .catch(err => {
                return;
            });
    }, []);

    const checkCredentials = () => {
        if (login === "" || password === "") {
            alert("Por favor, preencha todos os campos!");
            return;
        }
        let data = new FormData();
        data.append('login', login);
        data.append('password', password);

        const options = {
            method: 'POST',
            body: data
        };

        fetch("https://trabalho-lp-saulo.000webhostapp.com/User/validateCredentials", options)
            .then((response) => response.json())
            .then((json) => {
                if (json && typeof (json) != 'string') {
                    let idUser = json['id'];
                    if (keepSession) {
                        let name = json['name'];
                        let username = json['username'];
                        let email = json['email'];
                        storage.save({
                            key: 'loggedUser',
                            data: {
                                idUser,
                                name,
                                username,
                                email
                            },
                            expires: null
                        });
                    }
                    navigation.navigate('Home', { idUser: idUser });
                } else {
                    alert('Usuário e/ou senha inválidos.');
                }
            }
            ).catch((error) => {
                alert("Erro ao carregar dados, verifique sua conexão com a internet. " + error)
            });
    }

    return (
        <View style={[styles.container, styles.containerVerticallyCentered]}>
            <Card containerStyle={styles.card}>
                <Text style={styles.h1}>GESTÃO SIMPLES DE ANIMAIS - GSA</Text>
            </Card>
            <Card containerStyle={styles.card}>
                <Input
                    placeholder='Usuário ou Email'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='white'
                        />
                    }
                    label="Usuário ou Email"
                    labelStyle={styles.label}
                    inputStyle={styles.input}
                    value={login}
                    onChangeText={setLogin}
                />
                <Input
                    placeholder='Senha'
                    leftIcon={
                        <Icon
                            name='key'
                            size={24}
                            color='white'
                        />
                    }
                    label="Senha"
                    labelStyle={styles.label}
                    secureTextEntry={true}
                    inputStyle={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />

                <CheckBox
                    title='Manter-me conectado.'
                    checked={keepSession}
                    containerStyle={{ color: 'white', backgroundColor: '#272626', borderWidth: 0 }}
                    onPress={() => setKeepSession(!keepSession)}
                />

                <Button
                    title="ENTRAR"
                    buttonStyle={styles.button}
                    onPress={checkCredentials}

                />

                <TouchableOpacity>
                    <Text
                        style={styles.p}
                        onPress={() => {
                            navigation.navigate("CreateUser");
                        }}
                    >
                        Não tem cadastro? Registre-se aqui!
                    </Text>
                </TouchableOpacity>

            </Card>
            <StatusBar style="auto" />
        </View>
    );
};

export default Login;
