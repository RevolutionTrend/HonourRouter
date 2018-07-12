import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { navigationOptions } from 'react-navigation';

import { setRouteName } from '../../services/utils';

export default class Tools extends Component {

    static navigationOptions = {
        tabBarLabel: '工具',
        tabBarIcon: <Icon name="business-center" size={20} />,
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            setRouteName('tools');
            defaultHandler();
        }
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