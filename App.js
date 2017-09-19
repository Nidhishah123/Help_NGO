import React from 'react';
import {Provider} from 'react-redux';
import {
    TabNavigator,
} from 'react-navigation';

import store from './src/store';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MainScreen from './src/screens/MainScreen';

console.ignoredYellowBox = ['Warning: BackAndroid is deprecated'];
export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <RootScreen/>
            </Provider>
        );
    }
}

const RootScreen = TabNavigator({
        welcome: {screen: WelcomeScreen},
        main: {screen: MainScreen},
    },
    {
        lazy: true,
        navigationOptions: {
            tabBarVisible: false,
        },
        swipeEnabled: false,
    });
