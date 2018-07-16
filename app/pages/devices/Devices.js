import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { navigationOptions } from 'react-navigation';

import { fetchData, setRouteName, getRouteName } from '../../services/utils';

const { width } = Dimensions.get('window');

let speedTimer = null;
let devicesTimer = null;
const clearTimer = () => {
    if (speedTimer) {
        clearInterval(speedTimer);
        speedTimer = null;
    }
    if (devicesTimer) {
        clearInterval(devicesTimer);
        devicesTimer = null;
    }
}

let pageThis = null;

export default class Devices extends Component {

    static navigationOptions = {
        tabBarLabel: '设备',
        tabBarIcon: <Icon name="devices" size={20} />,
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            if (pageThis) {
                pageThis.initPage();
            }
            defaultHandler();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            up: 0,
            down: 0,
            deviceList: []
        };
        pageThis = this;
    }

    componentDidMount() {
        this.initPage();
    }

    initPage = () => {
        setRouteName('route');
        const that = this;
        clearTimer();
        speedTimer = setInterval(function () {
            const routeName = getRouteName();
            if (routeName !== 'route') {
                clearTimer();
                return;
            }
            fetchData('GET', 'speed_info', '').then(data => {
                console.log(data);
                that.setState({
                    up: data.up,
                    down: data.down
                });
            });
        }, 1000);
        this.getDeviceList();
    }

    getDeviceList = () => {
        fetchData('GET', 'device_list', '').then(list => {
            this.setState({
                deviceList: list
            });
        });
    }

    componentWillUnmount() {
        clearTimer();
    }

    getAccessTime = time => {
        const now = new Date();
        const pre = new Date(time);
        const delta = Math.ceil((now - pre) / 1000);
        if (delta < 60) {
            return `${delta}秒前`;
        } else if (delta < 3600) {
            const min = Math.ceil(delta / 60);
            return `${min}分钟前`;
        } else if (delta < 86400) {
            const hour = Math.floor(delta / 3600);
            const min2 = Math.ceil((delta % 3600) / 60);
            return `${hour}小时${min2}分钟前`;
        } else {
            const day = Math.floor(delta / 86400);
            return `${day}天前`;
        }
    }

    getListItem = item => {
        const { deviceName, interfaceType, isFamily, picture, accessTime, macAddress } = item;
        const poster = picture ? <Image style={sheet.itemPicture} source={{ uri: picture }} /> : <Image style={sheet.itemPicture} source={require('../../assets/default.png')} />;
        const itemTop = isFamily ? <Text style={sheet.itemTag}>家庭</Text> : null;
        const deviceMaxWidth = isFamily ? (width - 108) : (width - 75);
        const accessType = interfaceType === '5G' ? '5G接入' : (interfaceType === '2.4G' ? '2.4G接入' : '有线接入');
        return (
            <TouchableOpacity key={macAddress} onPress={() => this.gotoDevicePage(macAddress)}>
                <View style={sheet.item}>
                    <View style={sheet.itemPictureView}>
                        {poster}
                    </View>
                    <View style={sheet.itemBody}>
                        <View style={sheet.itemBodyTop}>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 20, width: 'auto', maxWidth: deviceMaxWidth }}>{deviceName}</Text>
                            {itemTop}
                        </View>
                        <View style={sheet.itemBodyTop}>
                            <Text>{this.getAccessTime(accessTime)}</Text>
                            <Text style={sheet.accessType}>{accessType}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    gotoDevicePage = macAddress => {
        this.props.navigation.navigate('device_manager', {
            macAddress
        });
    }

    render() {
        const { up, down, deviceList } = this.state;
        let itemList = [];
        deviceList.forEach(item => {
            itemList.push(this.getListItem(item));
        });
        return (
            <View style={sheet.main}>
                <View style={sheet.poster}>
                    <Image style={sheet.posterImage} source={require('../../assets/5684e82557203.jpg')} />
                </View>
                <View style={sheet.status}>
                    <View style={sheet.speedView}>
                        <Icon name="arrow-upward" size={24} />
                        <Text style={sheet.speedText}>{up}</Text>
                        <Text style={sheet.speedUnit}>KB/s</Text>
                    </View>
                    <Icon name="router" size={48} style={sheet.router} />
                    <View style={sheet.speedView}>
                        <Icon name="arrow-downward" size={24} />
                        <Text style={sheet.speedText}>{down}</Text>
                        <Text style={sheet.speedUnit}>KB/s</Text>
                    </View>
                </View>
                <ScrollView style={sheet.list}>
                    <SafeAreaView style={sheet.listArea}>{itemList}</SafeAreaView>
                </ScrollView>
            </View>
        );
    }
}

const sheet = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    poster: {
        width: '100%',
        height: width * 0.58
    },
    posterImage: {
        width: '100%',
        height: '100%'
    },
    status: {
        width: '100%',
        height: 73,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(128,128,128,0.75)',
        borderStyle: 'solid'
    },
    speedView: {
        width: width * 0.5 - 25,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    speedText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 5
    },
    speedUnit: {
        marginTop: 7
    },
    router: {
        color: '#ff9900'
    },
    list: {
        flex: 1,
        width: '100%'
    },
    listArea: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 20
    },
    item: {
        width: '100%',
        height: 61,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    itemPictureView: {
        height: 60,
        width: 60
    },
    itemPicture: {
        width: 40,
        height: 40,
        margin: 10
    },
    itemBody: {
        flex: 1,
        borderStyle: 'solid',
        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
        borderBottomWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    itemBodyTop: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: 24
    },
    itemBodyBottom: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: 24
    },
    itemTag: {
        fontSize: 12,
        color: '#33ccff',
        padding: 1,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'gray',
        marginRight: 15,
        marginLeft: 5,
        borderRadius: 3,
        textAlign: 'center'
    },
    accessType: {
        marginLeft: 10,
        marginRight: 15,
        color: 'rgba(128,128,128,0.5)'
    }
});