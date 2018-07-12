import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { navigationOptions } from 'react-navigation';

import { setRouteName } from '../../services/utils';

export default class Community extends Component {

    static navigationOptions = {
        tabBarLabel: '社区',
        tabBarIcon: <Icon name="forum" size={20} />,
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            setRouteName('community');
            defaultHandler();
        }
    }

    render() {
        return (
            <View><Text>This is Community page.</Text></View>
        );
    }
}