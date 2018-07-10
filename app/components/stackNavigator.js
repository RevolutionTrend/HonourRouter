import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import SplashScreen from './SplashScreen';
import TabNav from './tabNavigator';

const Stack = createSwitchNavigator({
    splash: SplashScreen,
    main: TabNav
}, {
        initialRouteName: 'splash',
        headerMode: 'none'
    });

export default Stack;