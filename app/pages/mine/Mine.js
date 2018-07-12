import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { navigationOptions } from 'react-navigation';

import { setRouteName } from '../../services/utils';

export default class Mine extends Component {

    static navigationOptions = {
        tabBarLabel: '我',
        tabBarIcon: <Icon name="person-outline" size={20} />,
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            setRouteName('mine');
            defaultHandler();
        }
    }

    render() {
        return (
            <View><Text>This is Mine page.</Text></View>
        );
    }
}