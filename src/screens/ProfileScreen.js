/**
 * Created by lcom71 on 22/8/17.
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    AsyncStorage,
    Image,
    ScrollView,
    Modal,
} from 'react-native';
import {
    Icon,
    Avatar,
} from 'react-native-elements';
import { connect } from 'react-redux';
import {
    getProfilePictureLink,
    getUserName,
    editProfilePicture,
} from '../actions';
import {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    VERTICAL,
    THEME_COLOR,
    FONT,
    isIOS,
} from '../constants';

class ProfileScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            profile_image_url: '../Images/user-image.jpg',
            user_name: '',
            show_profile_modal: false,
        }
    }
    static navigationOptions = {
        title: 'Profile',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="user-circle-o" color={tintColor} type='font-awesome'/>
        ),
    };

    async componentWillMount(){
        this.props.getUserName();
        this.props.getProfilePictureLink();
    }

    async componentWillReceiveProps(nextProps){
        await this.setState({ profile_image_url: nextProps.profile_url.toString(), user_name: nextProps.user_name });
    }

    _pickImage = async (options) => {
        this.setState({ show_profile_modal: false});
        this.props.editProfilePicture(options);
    };

    render(){
        return(
            <ScrollView style={ styles.rootContainer }>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.show_profile_modal}
                    onRequestClose={() => this.setState({ show_profile_modal: false })}
                >
                    <View style={styles.modalContainer}>
                        <Image style={{
                                height: VERTICAL ? SCREEN_WIDTH/1.1 : SCREEN_HEIGHT/1.3,
                                width: VERTICAL ? SCREEN_WIDTH/1.1 : SCREEN_HEIGHT/1.3,
                            }}
                               source={{ uri: this.props.profile_url }} />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingTop: VERTICAL ? SCREEN_HEIGHT/20 : 0,
                        }}>
                            <Icon name='photo-camera'
                                  raised
                                  reverse
                                  color='#606060'
                                  onPress={() => this._pickImage('fromCamera')}
                            />
                            <Icon name='close'
                                  raised
                                  reverse
                                  color='grey'
                                  onPress={() => this.setState({ show_profile_modal: false})}
                            />
                            <Icon name='photo-library'
                                  raised
                                  reverse
                                  color='#606060'
                                  onPress={() => this._pickImage('fromAlbum')}
                            />
                        </View>
                    </View>
                </Modal>
                <View style={styles.imageContainer}>
                    <Avatar
                        rounded
                        height={SCREEN_WIDTH*120/375}
                        width={SCREEN_WIDTH*120/375}
                        source={{uri: this.props.profile_url}}
                        activeOpacity={0}
                    />
                    <Avatar
                        small
                        rounded
                        icon={{name: 'edit'}}
                        overlayContainerStyle={{backgroundColor: THEME_COLOR}}
                        onPress={() => this.setState({ show_profile_modal: true }) }
                        activeOpacity={0.7}
                        containerStyle={{
                            position: 'relative',
                            top: -35,
                            left: 35,
                        }}
                    />
                    <Text style={ styles.userNameStyle }>{this.state.user_name}</Text>
                </View>
                <View style={styles.dataContainer}>
                    <View style={styles.textContainerStyle}>
                        <Text style={[FONT.TITLE_FONT,styles.textStyle, {color: '#333', fontWeight:'500'}]}>{this.props.total_posts}</Text>
                        <Text style={[FONT.MEDIUM_FONT,styles.textStyle]}>Posts</Text>
                    </View>
                    <View style={styles.textContainerStyle}>
                        <Text style={[FONT.TITLE_FONT,styles.textStyle, {color: '#333', fontWeight:'500'}]}>{this.props.total_donation} Rs.</Text>
                        <Text style={[FONT.MEDIUM_FONT,styles.textStyle]}>Donation</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    rootContainer: {
        flex:1,
    },
    imageContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: VERTICAL ? SCREEN_HEIGHT/25 : SCREEN_WIDTH/25,
    },
    dataContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    userNameStyle: {
        fontSize:25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 0,
        marginBottom: SCREEN_HEIGHT/25,
        color: '#333',
    },
    textContainerStyle: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderRadius: 3,
        backgroundColor: '#F4F6F6',
        borderColor: 'grey',
        margin:VERTICAL ? SCREEN_WIDTH/55 : SCREEN_HEIGHT/55,
        elevation:2,
        shadowColor:'grey',
        shadowRadius:3,
        paddingTop: VERTICAL ? SCREEN_WIDTH/50 : SCREEN_HEIGHT/50,
        paddingBottom: VERTICAL ? SCREEN_WIDTH/50 : SCREEN_HEIGHT/50,
    },
    textStyle: {
        fontWeight: '400',
        color: THEME_COLOR,
    },
    modalContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.30)',
    }
};

const mapStateToProps = (state) => {
    const { profile_url, user_name, total_posts, total_donation } = state.profile_data;
    return { profile_url, user_name, total_posts, total_donation };
};

export default connect(mapStateToProps, {
    getProfilePictureLink,
    getUserName,
    editProfilePicture,
})(ProfileScreen);