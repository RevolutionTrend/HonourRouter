import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SplashScreen from './SplashScreen';
import MainPage from './main';

const Stack = createStackNavigator({
    splash: SplashScreen,
    main: MainPage
}, {
        initialRouteName: 'splash',
        headerMode: 'none'
    });

export default Stack;