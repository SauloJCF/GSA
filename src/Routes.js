import 'react-native-gesture-handler';
import React from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

import storage from '../utils/storage';

import Login from '../pages/User/Login'
import CreateUser from '../pages/User/CreateUser'
import Home from '../pages/Home';
import ListAnimals from '../pages/Animal/ListAnimals';
import CreateAnimal from '../pages/Animal/CreateAnimal';
import EditAnimal from '../pages/Animal/EditAnimal';
import EditUser from '../pages/User/EditUser';

const Stack = createStackNavigator();

const endSession = () => {
    storage.remove({
        key: 'loggedUser'
      });
}

const Routes = ({navigation}) => {
    

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                headerMode="float"
                screenOptions={{
                    headerTintColor: '#00D1FF',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#106ABD',
                        borderBottomWidth: 0,
                    },
                    headerTitleStyle: {
                        fontSize: 42,
                        fontFamily: 'Inter_900Black',
                        fontWeight: '800',
                    }
                }}
            >
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ title: 'GSA', headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={({navigation}) => ({
                        title: 'GSA', headerLeft: () => null, headerRight: () => (
                            <TouchableOpacity
                                style={{marginRight: 30}}
                                onPress={() => {
                                    Alert.alert(
                                        'Confirmação',
                                        `Deseja realmente encerrar a sessão?`,
                                        [
                                            {
                                                text: "Não!!!",
                                                onPress: () => { return }
                                            },
                                            {
                                                text: "Sim",
                                                onPress: () => {
                                                    endSession();
                                                    navigation.navigate('Login');
                                                    
                                                }
                                            }
                                        ]
                                    );
                                }}
                                title="Info"
                                color="#fff"
                            >
                                <Icon
                                    name='sign-out'
                                    size={36}
                                    color='#00D1FF'
                                />
                            </TouchableOpacity>),
                    })}

                />
                <Stack.Screen
                    name="CreateUser"
                    component={CreateUser}
                    options={{ title: 'GSA' }}
                />
                <Stack.Screen
                    name="ListAnimals"
                    component={ListAnimals}
                    options={{ title: 'GSA' }}
                />
                <Stack.Screen
                    name="CreateAnimal"
                    component={CreateAnimal}
                    options={{ title: 'GSA' }}
                />
                <Stack.Screen
                    name="EditAnimal"
                    component={EditAnimal}
                    options={{ title: 'GSA' }}
                />
                <Stack.Screen
                    name="EditUser"
                    component={EditUser}
                    options={{ title: 'GSA' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;