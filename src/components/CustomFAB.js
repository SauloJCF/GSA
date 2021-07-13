import React from 'react';
import { FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomFAB = (props) => {
    return (
        <FAB
            icon={
                <Icon
                    name="plus"
                    size={25}
                    color="white"
                />}
            title={props.title.toUpperCase()}
            containerStyle={{ width: '100%', borderRadius: 0, }}
            buttonStyle={{ backgroundColor: '#106ABD', borderRadius: 0 }}
            titleStyle={{ fontFamily: 'Inter_900Black', }}
            onPress={props.onPress}
        />
    );
};

export default CustomFAB;