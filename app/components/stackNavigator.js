import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import SplashScreen from './SplashScreen';
import TabNav from './tabNavigator';
import DeviceManager from '../pages/devices/DeviceManager';

const Stack = createSwitchNavigator({
    splash: SplashScreen,
    main: TabNav,
    device_manager: DeviceManager
}, {
        initialRouteName: 'splash',
        headerMode: 'none'
    });

export default Stack;