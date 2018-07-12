import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MainPage from '../../components/main';
import { fetchData } from '../../services/utils';

export default class DeviceManager extends Component {

    state = {
        device: {
            'deviceName': 'Unknown',
            'interfaceType': '',
            'ipAddress': '',
            'isFamily': 1,
            'macAddress': '',
            'picture': '',
            'accessTime': '',
            'isInBlackList': false,
            'uplimitSpeed': 0,
            'downLimitSpeed': 0
        }
    }

    componentDidMount() {
        const { macAddress } = this.props.navigation.state.params;
        fetchData('GET', 'get_single_device', {
            macAddress
        }).then(data => {
            this.setState({
                device: data
            });
        })
    }

    leftPress = () => {
        console.log('left press');
        this.props.navigation.navigate('main');
    }

    rightPress = () => {
        console.log('right press');
        this.props.navigation.navigate('main');
    }

    render() {
        return (
            <MainPage leftType='取消' title='编辑设备' rightType='保存' leftPress={this.leftPress} rightPress={this.rightPress}>
                <View style={sheet.session}>
                    <View style={sheet.rowTwo}>
                        <Text style={sheet.label}>设备名称</Text>
                    </View>
                </View>
            </MainPage>
        );
    }
}

const sheet = StyleSheet.create({
    session: {
        width: '100%',
        height: 'auto',
        marginTop: 10,
        paddingLeft: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    rowTwo: {
        width: '100%',
        height: 61,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: 15,
        borderStyle: 'solid',
        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
        borderBottomWidth: 1
    },
    rowThree: {
        width: '100%',
        height: 61,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 15,
        borderStyle: 'solid',
        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
        borderBottomWidth: 1
    },
    label: {
        width: '40%',
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold'
    }
});