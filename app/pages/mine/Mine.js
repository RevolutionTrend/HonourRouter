import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Mine extends Component {

    leftPress = () => {
        console.log('left press');
    }

    rightPress = () => {
        console.log('right press');
    }

    render() {
        return (
            <View><Text>This is Mine page.</Text></View>
        );
    }
}