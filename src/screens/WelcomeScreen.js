/**
 * Created by lcom71 on 18/8/17.
 */
import _ from 'lodash';
import React, {Component} from 'react';
import {
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from 'react-native';
import Swiper from '../../react-native-swiper-animated';
import {Button} from 'react-native-elements';
import {
    WELCOME_SCREEN_THEME_COLOR,
    SCREEN_HEIGHT,
    ACTIVITY_INDICATOR_COLOR,
} from '../constants';
import { connect } from 'react-redux';
import { facebookLogin } from '../actions';
import { THEME_COLOR } from '../constants';

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
        };
    }

    swiper = null;

    async componentWillMount() {
       // await AsyncStorage.removeItem('fb_token');
        let token = await AsyncStorage.getItem('fb_token');

        if (token) {
            this.setState({token});
            this.props.navigation.navigate('main');
        }
        else {
            this.setState({token: false});
        }
    }

    onLoginButtonPress = () => {
       // alert('hii');
        this.props.facebookLogin();
        this.onAuthComplete(this.props);
    };

    componentWillReceiveProps(nextProp){
        this.onAuthComplete(nextProp);
    }

    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('main');
        }
    }

    render() {
        if (_.isNull(this.state.token)) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size='large' color={ACTIVITY_INDICATOR_COLOR}/>
                </View>
            )
        } else {
            return (
                <View style={styles.rootContainer}>
                    <View style={{ flex: 5 }}>
                        <Swiper
                            ref={(swiper) => { this.swiper = swiper }}
                            style={styles.wrapper}
                            paginationStyle={{ container: { backgroundColor: 'transparent' } }}
                            paginationLeft={''}
                            paginationRight={''}
                            onRightSwipe={() => this.setState({pageIndex: this.state.pageIndex - 1 })}
                            onLeftSwipe={() => this.setState({pageIndex: this.state.pageIndex + 1 })}
                            paginationActiveDotColor={THEME_COLOR}
                        >
                            <View style={styles.slide1}>
                                <Text style={styles.text}>Search Restaurants related to the NGO</Text>
                                <Image
                                    style={styles.imageStyle}
                                    source={require('../Images/restaurant_icon.png')}
                                />
                            </View>
                            <View style={styles.slide1}>
                                <Text style={styles.text}>Check in and share post on Social Media</Text>
                                <Image
                                    style={styles.imageStyle}
                                    source={require('../Images/share_icon.png')}
                                />
                            </View>
                            <View style={styles.slide1}>
                                <Text style={styles.text}>The Restaurant will donate to the NGO</Text>
                                <Image
                                    style={styles.imageStyle}
                                    source={require('../Images/donate2.png')}
                                />
                            </View>
                        </Swiper>
                    </View>
                    <View style={ styles.buttonContainer }>
                        <Button title='LOG IN WITH FACEBOOK---'
                                buttonStyle={ styles.btn }
                                textStyle={ styles.btnText }
                                onPress={this.onLoginButtonPress }
                                icon={{ name: 'facebook-square', type: 'font-awesome', color: '#fff' }}
                        />
                        <Text
                            style={{ color: '#808080', textAlign: 'center', margin: 10, fontSize:12}}
                        >
                            By signing in, you agree with put terms of services and privacy settings
                        </Text>
                    </View>
                </View>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return { token: state.auth.token };
};

export default connect(mapStateToProps, { facebookLogin })(WelcomeScreen);

const styles = {
    rootContainer: {
        flex: 1,
        paddingTop: 0,
    },
    wrapper: {
        backgroundColor: WELCOME_SCREEN_THEME_COLOR,
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WELCOME_SCREEN_THEME_COLOR,
    },
    text: {
        color: '#808080',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: SCREEN_HEIGHT / 15,
        margin: 20,
    },
    buttonContainer: {
        flex: 1.8,
        justifyContent: 'space-between',
    },
    btn: {
        backgroundColor: '#3b5998',
        borderRadius: 40,
    },
    btnText: {
        fontSize:16,
        fontWeight:'400'
    },
    imageStyle: {
        width: SCREEN_HEIGHT / 5,
        height: SCREEN_HEIGHT / 5,
    }
};