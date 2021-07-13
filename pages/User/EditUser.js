import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Input, Card, Button } from 'react-native-elements';

import styles from '../styles';

const EditUser = (props) => {

    const [idUser, setIdUser] = useState(props.route.params.idUser);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        let data = new FormData();
        data.append('idUser', idUser);
        
        let options = {
            method: 'POST',
            body: data,
        };

        fetch('https://trabalho-lp-saulo.000webhostapp.com/User/show', options)
            .then((response) => response.json())
            .then((json) => {
                setName(json['name']);
                setUsername(json['username']);
                setEmail(json['email']);
            })
        .catch((err) => { alert("Erro ao carregar dados, verifique sua conexão com a internet. " + err) 
    });

    }, []);

    const editUser = () => {
        if (name === "" || username === "" || email === "") {
            alert("Os campos 'Nome', 'Nome de Usuário' e 'Email' são obrigatórios.");
            return;
        }
        let data = new FormData();
        data.append('idUser', idUser);
        data.append('name', name);
        data.append('username', username);
        data.append('email', email);

        const options = {
            method: 'POST',
            body: data
        };

        fetch("https://trabalho-lp-saulo.000webhostapp.com/User/edit", options)
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 'success') {
                    alert('Alterações salvas com sucesso!');
                    props.navigation.navigate('Home');
                } else {
                    alert(json.status)
                    alert('Erro ao efetuar mudanças, tente novamente.');
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
                <Button
                    title="SALVAR"
                    buttonStyle={styles.button}
                    onPress={editUser}
                />
            </Card>
        </View>
    );
};

export default EditUser;