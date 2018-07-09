import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SplashScreen from './SplashScreen';
import TabNav from './tabNavigator';

const Stack = createStackNavigator({
    splash: SplashScreen,
    main: TabNav
}, {
        initialRouteName: 'splash',
        headerMode: 'none'
    });

export default Stack;