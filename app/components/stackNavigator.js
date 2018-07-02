import React from 'react';
import { StackNavigator } from 'react-navigation';

import SplashScreen from './SplashScreen';

const Stack = StackNavigator({
    splash: {
        screen: SplashScreen
    }
}, {
        initialRouteName: 'splash',
        headerMode: 'none'
    });

export default Stack;