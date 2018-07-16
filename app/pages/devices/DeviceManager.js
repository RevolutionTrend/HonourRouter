import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Switch } from 'react-native';

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
            'isInBlackList': 0,
            "upLimit": 0,
            "downLimit": 0,
            'upLimitSpeed': 0,
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
        const { navigation } = this.props;
        fetchData('POST', 'edit_device', this.state.device).then(() => {
            navigation.navigate('main');
        });
        // this.props.navigation.navigate('main');
    }

    changeDeviceName = value => {
        this.setState({
            device: Object.assign({}, this.state.device, {
                deviceName: value
            })
        });
    }

    changeFamily = flag => {
        this.setState({
            device: Object.assign({}, this.state.device, {
                isFamily: flag ? 1 : 0
            })
        });
    }

    changeBlackList = flag => {
        this.setState({
            device: Object.assign({}, this.state.device, {
                isInBlackList: flag ? 1 : 0
            })
        });
    }

    changeUpLimit = flag => {
        this.setState({
            device: Object.assign({}, this.state.device, {
                upLimit: flag ? 1 : 0,
                upLimitSpeed: ''
            })
        });
    }

    changeUpLimitSpeed = value => {
        this.setState({
            device: Object.assign({}, this.state.device, {
                upLimitSpeed: value
            })
        });
    }

    changeDownLimit = flag => {
        this.setState({
            device: Object.assign({}, this.state.device, {
                downLimit: flag ? 1 : 0,
                downLimitSpeed: ''
            })
        });
    }

    changeDownloadLimitSpeed = value => {
        this.setState({
            device: Object.assign({}, this.state.device, {
                downLimitSpeed: value
            })
        });
    }

    getAccessTimeStr = time => {
        const now = new Date();
        const pre = new Date(time);
        const delta = (now - pre) / 1000;
        const hour = Math.floor(delta / 3600);
        const min = Math.floor((delta % 3600) / 60);
        const sec = Math.floor(delta % 60);
        return `${hour}小时${min}分钟${sec}秒`;
    }

    render() {

        const { deviceName, isFamily, isInBlackList, upLimit, downLimit, upLimitSpeed, downLimitSpeed, ipAddress, macAddress, accessTime } = this.state.device;
        const upLimitView = upLimit ? (
            <View style={sheet.limit}>
                <TextInput style={sheet.limitInput} value={upLimitSpeed + ''} onChangeText={this.changeUpLimitSpeed} keyboardType="numeric" />
                <Text style={sheet.limitUnit}>KB/s</Text>
            </View>
        ) : <Text style={sheet.showLabel}>未限制</Text>;
        const downLimitView = downLimit ? (
            <View style={sheet.limit}>
                <TextInput style={sheet.limitInput} value={downLimitSpeed + ''} onChangeText={this.changeDownloadLimitSpeed} keyboardType="numeric" />
                <Text style={sheet.limitUnit}>KB/s</Text>
            </View>
        ) : <Text style={sheet.showLabel}>未限制</Text>;
        const accessTimeStr = this.getAccessTimeStr(accessTime);
        return (
            <MainPage leftType='取消' title='编辑设备' rightType='保存' leftPress={this.leftPress} rightPress={this.rightPress}>
                <View style={sheet.session}>
                    <View style={sheet.rowTwo}>
                        <Text style={sheet.label}>设备名称</Text>
                        <TextInput value={deviceName} onChangeText={this.changeDeviceName} placeholder="设备名称" style={sheet.input} />
                    </View>
                    <View style={sheet.rowThree}>
                        <Text style={sheet.label}>标记为家庭设备</Text>
                        <Text style={sheet.showLabel}>方便识别 离线控制</Text>
                        <Switch value={!!isFamily} onValueChange={this.changeFamily} />
                    </View>
                    <View style={sheet.rowThree}>
                        <Text style={sheet.label}>加入黑名单</Text>
                        <Text style={sheet.showLabel}>禁止该设备联网</Text>
                        <Switch value={!!isInBlackList} onValueChange={this.changeBlackList} />
                    </View>
                    <View style={sheet.rowOne}>
                        <Text style={sheet.label}>带宽控制</Text>
                    </View>
                    <View style={sheet.rowThree}>
                        <Text style={sheet.label}>上传速度</Text>
                        {upLimitView}
                        <Switch value={!!upLimit} onValueChange={this.changeUpLimit} />
                    </View>
                    <View style={sheet.rowThree}>
                        <Text style={sheet.label}>下载速度</Text>
                        {downLimitView}
                        <Switch value={!!downLimit} onValueChange={this.changeDownLimit} />
                    </View>
                </View>
                <View style={sheet.session}>
                    <View style={sheet.rowTwo}>
                        <Text style={sheet.label}>IP地址</Text>
                        <Text style={sheet.showLabel}>{ipAddress}</Text>
                    </View>
                    <View style={sheet.rowTwo}>
                        <Text style={sheet.label}>MAC地址</Text>
                        <Text style={sheet.showLabel}>{macAddress}</Text>
                    </View>
                    <View style={sheet.rowTwo}>
                        <Text style={sheet.label}>已连接时长</Text>
                        <Text style={sheet.showLabel}>{accessTimeStr}</Text>
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
    rowOne: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: 15
    },
    rowTwo: {
        width: '100%',
        height: 61,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: 15,
        borderStyle: 'solid',
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
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
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 1
    },
    label: {
        width: '40%',
        color: '#000',
        fontSize: 18
    },
    input: {
        flex: 1,
        textDecorationLine: 'none',
        borderBottomWidth: 0,
        fontSize: 18,
        color: 'rgb(128,128,128)'
    },
    showLabel: {
        fontSize: 16,
        color: 'rgba(128,128,128,0.5)',
        flex: 1
    },
    limit: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    limitInput: {
        flex: 1,
        fontSize: 18
    },
    limitUnit: {
        fontSize: 16,
        color: 'rgba(128,128,128,0.3)'
    }
});