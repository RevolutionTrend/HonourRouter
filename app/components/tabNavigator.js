import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import Devices from '../pages/devices/Devices';
import Tools from '../pages/tools/Tools';
import Shop from '../pages/shop/Shop';
import Community from '../pages/community/Community';
import Mine from '../pages/mine/Mine';

const TabNav = createBottomTabNavigator({
    route: {
        screen: Devices
    },
    tool: {
        screen: Tools
    },
    shop: {
        screen: Shop
    },
    community: {
        screen: Community
    },
    mine: {
        screen: Mine
    }
}, {
        initialRouteName: 'route'
    });
export default TabNav;