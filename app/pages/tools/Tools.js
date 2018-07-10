import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { setRouteName } from '../../services/utils';

export default class Tools extends Component {

    componentDidMount() {
        setRouteName('tools');
    }

    leftPress = () => {
        console.log('left press');
    }

    rightPress = () => {
        console.log('right press');
    }

    render() {
        return (
            <View><Text>This is Tools page.</Text></View>
        );
    }
}