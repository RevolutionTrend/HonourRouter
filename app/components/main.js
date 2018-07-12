import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class MainPage extends Component {

    getView = type => {
        let leftView = null;
        switch (type) {
            case 'menu':
                leftView = <Icon name="menu" style={sheet.headerIcon} />
                break;
            case 'back':
                leftView = <Icon name="keyboard-arrow-left" style={sheet.headerIcon} />
                break;
            default:
                leftView = <Text style={sheet.headerText}>{type}</Text>
        }
        return leftView;
    }

    render() {
        const { children, leftType, rightType, title, leftPress, rightPress } = this.props;
        const leftView = this.getView(leftType);
        const rightView = this.getView(rightType);
        return (
            <View style={sheet.main}>
                <View style={sheet.header}>
                    <View style={sheet.headerLeftView}>
                        <TouchableOpacity onPress={leftPress}>
                            {leftView}
                        </TouchableOpacity>
                    </View>
                    <Text style={sheet.headerTitle}>{title}</Text>
                    <View style={sheet.headerLeftView}>
                        <TouchableOpacity onPress={rightPress}>
                            {rightView}
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={sheet.content}>
                    <SafeAreaView style={sheet.safeArea}>
                        {children}
                    </SafeAreaView>
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
        alignItems: 'flex-start',
        margin: 0,
        padding: 0
    },
    header: {
        width: '100%',
        height: 64,
        backgroundColor: '#3399ff',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    headerLeftView: {
        width: 64,
        height: 64
    },
    headerIcon: {
        fontSize: 32,
        lineHeight: 64,
        textAlign: 'center'
    },
    headerText: {
        fontSize: 18,
        lineHeight: 80,
        textAlign: 'center'
    },
    headerTitle: {
        flex: 1,
        lineHeight: 64,
        fontSize: 32,
        overflow: 'hidden',
        textAlign: 'center'
    },
    content: {
        flex: 1,
        width: '100%',
        backgroundColor: '#f0f0f8'
    },
    safeArea: {
        width: '100%',
        height: 'auto',
        padding: 0,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
});