import React, { Component } from 'react';
import Stack from './app/components/stackNavigator';
// import { View, StatusBar } from 'react-native';

export default class App extends Component {
  render() {
    // return (
    //   <View style={{ flex: 1 }}>
    //     <StatusBar hidden={true} />
    //     <Stack />
    //   </View>
    // );
    return <Stack />
  }
}
