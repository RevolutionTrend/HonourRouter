import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SplashScreen from './SplashScreen';

const Stack = createStackNavigator({
    splash: SplashScreen
}, {
        initialRouteName: 'splash',
        headerMode: 'none'
    });

export default Stack;