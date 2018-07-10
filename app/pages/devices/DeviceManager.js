import React, { Component } from 'react';
import { View, Text } from 'react-native';

import MainPage from '../../components/main';

export default class DeviceManager extends Component {

    leftPress = () => {
        console.log('left press');
    }

    rightPress = () => {
        console.log('right press');
    }

    render() {
        return (
            <MainPage leftType="取消" title="编辑设备" rightType="保存" leftPress={this.leftPress} rightPress={this.rightPress}>
                <View><Text>This is Device Manager page.</Text></View>
            </MainPage>
        );
    }
}