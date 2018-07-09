import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';

import PageTop from './pageTop';
import TabNav from './tabNavigator';

const { width, height } = Dimensions.get('window');

export default class MainPage extends Component {
    render() {
        return (
            <View style={sheet.main}>
                <PageTop />
                <ScrollView style={sheet.content}>
                    <TabNav />
                </ScrollView>
            </View>
        );
    }
}

const sheet = StyleSheet.create({
    main: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: width,
        height: height,
        margin: 0,
        padding: 0
    },
    content: {
        flex: 1
    }
});