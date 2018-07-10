import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Devices from '../pages/devices/Devices';
import Tools from '../pages/tools/Tools';
import Shop from '../pages/shop/Shop';
import Community from '../pages/community/Community';
import Mine from '../pages/mine/Mine';

const TabNav = createBottomTabNavigator({
    route: {
        screen: Devices,
        navigationOptions: () => ({
            tabBarLabel: '设备',
            tabBarIcon: <Icon name="devices" size={20} />
        })
    },
    tool: {
        screen: Tools,
        navigationOptions: () => ({
            tabBarLabel: '工具',
            tabBarIcon: <Icon name="business-center" size={20} />
        })
    },
    shop: {
        screen: Shop,
        navigationOptions: () => ({
            tabBarLabel: '商城',
            tabBarIcon: <Icon name="local-mall" size={20} />
        })
    },
    community: {
        screen: Community,
        navigationOptions: () => ({
            tabBarLabel: '社区',
            tabBarIcon: <Icon name="forum" size={20} />
        })
    },
    mine: {
        screen: Mine,
        navigationOptions: () => ({
            tabBarLabel: '我',
            tabBarIcon: <Icon name="person-outline" size={20} />
        })
    }
}, {
        initialRouteName: 'route'
    });
export default TabNav;