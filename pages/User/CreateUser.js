import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Input, Card, Button } from 'react-native-elements';

import styles from '../styles';

const CreateUser = ({ navigation }) => {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const registerUser = () => {
        if (name === "" || username === "" || email === "" || password === "" || repeatPassword === "") {
            alert("Os campos 'Nome', 'Nome de Usuário', 'Email', 'Senha' e 'Repetir senha' são obrigatórios.");
            return;
        }
        if (password !== repeatPassword) {
            alert("As senhas não coicidem.");
            return;
        }
        let data = new FormData();
        data.append('name', name);
        data.append('username', username);
        data.append('email', email);
        data.append('password', password);

        const options = {
            method: 'POST',
            body: data
        };

        fetch("https://trabalho-lp-saulo.000webhostapp.com/User/insert", options)
            .then((response) => response.json())
            .then((json) => {
                alert(json.status)
                if (json.status == 'success') {
                    alert('Usuário cadastrado com sucesso!');
                    navigation.navigate('Login');
                } else {
                    alert('Erro ao cadastrar usuário, tente novamente.');
                }
            }
        ).catch(() => {alert("Erro ao carregar dados, verifique sua conexão com a internet.")});
    }

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.card}>
                <Card.Title>
                    <Text h1 h1Style={styles.h2}>
                        Cadastro
                    </Text>
                </Card.Title>
                <Input
                    labelStyle={styles.label}
                    placeholder="Predro João"
                    label="Nome Completo:*"
                    inputContainerStyle={styles.inputContainer}
                    value={name}
                    onChangeText={setName}
                />
                <Input
                    labelStyle={styles.label}
                    placeholder="pedro.joao"
                    label="Nome de Usuário:*"
                    inputContainerStyle={styles.inputContainer}
                    value={username}
                    onChangeText={setUsername}
                />
                <Input
                    labelStyle={styles.label}
                    placeholder="pedro@gmail.com"
                    label="E-mail:*"
                    inputContainerStyle={styles.inputContainer}
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    labelStyle={styles.label}
                    placeholder="*********"
                    secureTextEntry={true}
                    label="Senha:*"
                    inputContainerStyle={styles.inputContainer}
                    value={password}
                    onChangeText={setPassword}
                />
                <Input
                    labelStyle={styles.label}
                    placeholder="*********"
                    secureTextEntry={true}
                    label="Repita a Senha:*"
                    inputContainerStyle={styles.inputContainer}
                    value={repeatPassword}
                    onChangeText={setRepeatPassword}
                />
                <Button
                    title="CADASTRAR"
                    buttonStyle={styles.button}
                    onPress={registerUser}
                    
                />
            </Card>
        </View>
    );
}

export default CreateUser;
