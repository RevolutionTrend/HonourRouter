import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { navigationOptions } from 'react-navigation';

import { setRouteName } from '../../services/utils';

export default class Shop extends Component {

    static navigationOptions = {
        tabBarLabel: '商城',
        tabBarIcon: <Icon name="local-mall" size={20} />,
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            setRouteName('shop');
            defaultHandler();
        }
    }

    render() {
        return (
            <View><Text>This is Shop page.</Text></View>
        );
    }
}