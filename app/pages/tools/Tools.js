import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { navigationOptions } from 'react-navigation';

import { setRouteName } from '../../services/utils';

const { width } = Dimensions.get('window');

export default class Tools extends Component {

    static navigationOptions = {
        tabBarLabel: '工具',
        tabBarIcon: <Icon name="business-center" size={20} />,
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            setRouteName('tools');
            defaultHandler();
        }
    }

    render() {
        return (
            <View style={sheet.container}></View>
        );
    }
}

const gridWidth = width / 4;

const sheet = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    grid: {
        width: gridWidth,
        height: gridWidth,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});