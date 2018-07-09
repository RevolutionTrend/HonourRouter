import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Devices from '../pages/devices/Devices';
import StoragePage from '../pages/storage/Storage';

const routeStack = createStackNavigator({
    devices: Devices
});
const memoryStack = createStackNavigator({
    storage: StoragePage
});

const TabNav = createBottomTabNavigator({
    route: {
        screen: routeStack,
        navigationOptions: () => ({
            tabBarLabel: '路由器',
            tabBarIcon: <Icon type="router" />
        })
    },
    memory: {
        screen: memoryStack,
        navigationOptions: () => ({
            tabBarLabel: '存储',
            tabBarIcon: <Icon type="folder_open" />
        })
    }
});
export default TabNav;