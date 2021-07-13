import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Section = (props) => {
    return (
        <View style={styles.head}>
            <Text style={styles.h2}>{props.title.toUpperCase()}</Text>
            <View style={{ borderBottomColor: '#00D1FF', borderBottomWidth: 2, borderColor: '#00D1FF' }} />
        </View>
    );
}

const styles = StyleSheet.create({
    head: {
        width: '75%',
        marginTop: '10%'
    },
    h2: {
        color: '#00D1FF',
        fontSize: 20,
        fontFamily: 'Inter_900Black',
        textAlign: 'center'
    },
});

export default Section;