import React, { Component } from 'react';
import { View, Text } from 'react-native';

import MainPage from '../../components/main';

export default class Devices extends Component {

    leftPress = () => {
        console.log('left press');
    }

    rightPress = () => {
        console.log('right press');
    }

    render() {
        return (
            <MainPage leftType="取消" title="设备" rightType="保存" leftPress={this.leftPress} rightPress={this.rightPress}>
                <View><Text>This is Devices page.</Text></View>
            </MainPage>
        );
    }
}