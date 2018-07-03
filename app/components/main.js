import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import PageTop from './pageTop';

const { width, height } = Dimensions.get('window');

export default class MainPage extends Component {
    render() {
        return (
            <View style={sheet.main}>
                <PageTop />
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
    }
});