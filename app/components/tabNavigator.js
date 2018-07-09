import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Devices from '../pages/devices/Devices';
import StoragePage from '../pages/storage/Storage';

const routeStack = createStackNavigator({
    devices: Devices
}, {
        initialRouteName: 'devices',
        headerMode: 'none'
    });
const memoryStack = createStackNavigator({
    storage: StoragePage
}, {
        initialRouteName: 'storage',
        headerMode: 'none'
    });

const TabNav = createBottomTabNavigator({
    route: {
        screen: routeStack,
        navigationOptions: () => ({
            tabBarLabel: '路由器',
            tabBarIcon: <Icon name="router" />
        })
    },
    memory: {
        screen: memoryStack,
        navigationOptions: () => ({
            tabBarLabel: '存储',
            tabBarIcon: <Icon name="folder-open" />
        })
    }
}, {
        initialRouteName: 'route'
    });
// const TabNav = createBottomTabNavigator({
//     route: routeStack,
//     memory: memoryStack
// }, {
//         initialRouteName: 'route'
//     })
// const TabNav = createBottomTabNavigator({
//     devices: Devices,
//     storage: StoragePage
// });
export default TabNav;