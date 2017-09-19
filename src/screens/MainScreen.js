/**
 * Created by lcom71 on 18/8/17.
 */

import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';
import {
    TabNavigator,
} from 'react-navigation';
import {
    THEME_COLOR,
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    FONT,
    isIOS,
} from '../constants';

import ProfileScreen from './ProfileScreen';
import RestaurantScreen from './MapScreen';
import PostScreen from './posts';

class MainScreen extends Component {

    render() {
        return (
            <View style={{flex: 1, paddingTop: isIOS ? 15 : 0}}>
                <MainTab/>
            </View>
        )
    }
}

const MainTab = TabNavigator({
        posts: {screen: PostScreen},
        restaurant: {screen: RestaurantScreen},
        profile: {screen: ProfileScreen},
    },
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        lazy: false,
        tabBarOptions: ({
            activeTintColor: THEME_COLOR,
            inactiveTintColor: 'grey',
            style: {
                borderBottomWidth: 0.5,
                borderBottomColor: '#bfbfbf',
                backgroundColor: '#fff',
                marginBottom: 0.5,
                height: SCREEN_WIDTH < SCREEN_HEIGHT ? SCREEN_HEIGHT / 10 : SCREEN_WIDTH / 10,
            },
            showIcon: true,
            showLabel: true,
            indicatorStyle: {
                height: 1,
                backgroundColor: THEME_COLOR,
            },
            labelStyle: [FONT.LMEDIUM_FONT, {
                top: -7,
                fontWeight: '400',
            }]
        })
    }
);

export default MainScreen;