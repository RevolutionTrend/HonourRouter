import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class PageTop extends Component {
    render() {
        return (
            <View style={sheet.container}></View>
        );
    }
}

const sheet = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 64,
        width: '100%',
        backgroundColor: '#3399ff',
    }
});