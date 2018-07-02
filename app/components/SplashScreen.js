import React, { Component } from 'react';
import { View, Dimensions, InteractionManager, Animated, StyleSheet, Easing } from 'react-native';

const { height, width } = Dimensions.get('window');
const iconWidth = 256;
const iconTop = (height - iconWidth) * 0.618 / 1.618;

class SplashScreen extends Component {

    state = {
        spinValue: new Animated.Value(0)
    }

    animation = Animated.loop(
        Animated.timing(this.state.spinValue, {
            toValue: 360,
            duration: 2000,
            easing: Easing.linear
        })
    )

    timer = null;

    componentDidMount() {
        const { navigation } = this.props;
        this.animation.start();
        this.timer = setTimeout(function () {
            InteractionManager.runAfterInteractions(() => {
                navigation.navigate('dashboard');
            });
        }, 3000);
    }

    componentWillUnmount() {
        this.animation.stop();
    }

    render() {
        const iconStyle = {
            height: iconWidth,
            width: iconWidth,
            marginTop: iconTop,
            transform: [{
                rotate: this.state.spinValue.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg']
                })
            }]
        };
        return (
            <View style={sheet.container}>
                <Animated.Image style={iconStyle} source={require('../assets/119874_apps_512x512.png')} />
            </View>
        );
    }
}

const sheet = StyleSheet.create({
    container: {
        width: width,
        height: height,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});

export default SplashScreen;