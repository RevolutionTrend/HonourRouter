import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Shop extends Component {

    leftPress = () => {
        console.log('left press');
    }

    rightPress = () => {
        console.log('right press');
    }

    render() {
        return (
            <View><Text>This is Shop page.</Text></View>
        );
    }
}