/**
 * Created by lcom71 on 22/8/17.
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    Alert,
    AsyncStorage,
    Image,
    BackHandler,
} from 'react-native';
import {
    Icon,
} from 'react-native-elements';
import {ShareDialog} from 'react-native-fbsdk';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

import {
    THEME_COLOR,
    isAndroid
} from '../constants';
import PostCard from '../components/postCard';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareLinkContent: null,
        };
        this.PostData = [];
        this.url = null;
    }

    static navigationOptions = {
        title: 'Home',
        tabBarIcon: ({tintColor}) => (<Icon name="home" color={tintColor}/>)
    };

    async componentWillMount() {
        this.url = 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540nidhishah123%252Fmyapp/ImagePicker/79b22154-9243-4b35-b4e4-cd3d5144dc37.jpg';
        this.PostData = [{
            user_name: 'Nidhi Shah',
            user_profile_url: this.url,
            post_description: 'Having Manchurian....It is Delicious.',
            total_photos: 4,
            photo_url: require('../Images/food.jpg'),
            likes: 485,
            liked: true,
            comment_url: '',
            share_url: '',
        },
            {
                user_name: 'Nidhi Shah',
                user_profile_url: this.url,
                post_description: 'Having My lunch....It is Delicious.',
                total_photos: 4,
                photo_url: require('../Images/food2.jpg'),
                likes: 50,
                liked: false,
                comment_url: '',
                share_url: '',
            },
            {
                user_name: 'Nidhi Shah',
                user_profile_url: this.url,
                post_description: 'Having My lunch....It is Delicious.',
                total_photos: 4,
                photo_url: require('../Images/food.jpg'),
                likes: 15,
                liked: false,
                comment_url: '',
                share_url: '',
            }
        ];
    }

    componentDidMount() {
        if (isAndroid) {
            BackHandler.addEventListener("hardwareBackPress", () => {
                BackHandler.exitApp();
            })
        }
    }

    componentWillUnmount(){
        BackHandler.removeEventListener("hardwareBackPress");
    }

    setShareLinkContent() {
        const { fb_link, fb_location_id, restaurant_about } = this.props.navigation.state.params.data;
        const shareLinkContent = {
            contentType: 'link',
            contentUrl: fb_link,
            contentDescription: restaurant_about,
            commonParameters:{
                placeId: fb_location_id,
                hashtag: `#sharedWithHelpWithFun`
            },
        };
        this.setState({shareLinkContent: shareLinkContent});
    }

    shareLinkWithShareDialog = async () => {
        const { params } = this.props.navigation.state;
        console.log('params:---',params);
        if(params){
            await this.setShareLinkContent();
            let tmp = this.state;
            ShareDialog.canShow(this.state.shareLinkContent).then(
                function (canShow) {
                    if (canShow) {
                        return ShareDialog.show(tmp.shareLinkContent);
                    }
                }
            ).then( (result) => {
                    console.log('result:',result);
                    if (result.isCancelled === true) {
                        Alert.alert('Alert','Share cancelled',[
                            {text: 'OK'},
                        ],{ cancelable: false });
                    } else {
                        this.shareSuccessful(result);
                    }
                },
                function (error) {
                    Alert.alert('Failed', 'Share fail with error: ' + error);
                }
            );
        } else {
            Alert.alert('Warning', 'Select Restaurant to share from Map...');
        }
    };

    async shareSuccessful(result) {
        let Access_Token = await AsyncStorage.getItem('fb_token');
        let UserId = await AsyncStorage.getItem('user_fb_id');
        console.log('token',Access_Token,' --post id: ',result.postId);
        const { params } = this.props.navigation.state;
        let restaurantId = params.data._id;
        axios.post(`http://192.168.200.70:4000/v1/addPost?postId=${result.postId}&token=${Access_Token}&userId=${UserId}&restaurantId=${restaurantId}`)
            .then( response => {
                console.log('response : ',response);

                if(response.data.privacy === "SELF"){
                    Alert.alert(
                        'Share Warning',
                        'This post will not be considered because you have set privacy to "Only Me"',
                        [
                            {text: 'OK'},
                            {text: 'Share Again', onPress: () => this.shareLinkWithShareDialog()}
                        ],
                        { cancelable: false }
                    )
                }
                else if(response.data.error){
                    Alert.alert(
                        'Share Warning',
                        response.data.error,
                        [
                            {text: 'OK'},
                            {text: 'Share Again', onPress: () => this.shareLinkWithShareDialog()}
                        ],
                        { cancelable: false }
                    );
                }
                else {
                    Toast.show('Post Shared Successfully...', Toast.LONG);
                }
            })
            .catch( err => console.log('error: ',err));
    }

    pressLikeIcon(Data) {
        if (Data.liked) {
            console.log('mark un-like');
            Data.liked = false;
            Data.likes -= 1;
        }
        else {
            console.log('mark as liked');
            Data.liked = true;
            Data.likes += 1;
        }
    };

    renderPosts() {
        if (this.PostData.length === 0) {
            return (
                <Card title="No Posts">
                    <Text style={{marginBottom: 10, textAlign: 'justify', fontSize: 15}}>
                        There is no post, Be the first to share post on facebook from this application
                    </Text>
                </Card>
            )
        }
        else
            return this.PostData.map((data, i) => <PostCard PostData={data} key={i} like={this.pressLikeIcon}/>)

    }

    render() {
        return (
            <View style={styles.rootContainer}>
                <ScrollView style={{flex: 1}}>
                    {this.renderPosts()}
                </ScrollView>
                <View style={styles.shareIconContainer}>
                    <Icon
                        reverse
                        raised
                        name='share'
                        color={THEME_COLOR}
                        onPress={() => this.shareLinkWithShareDialog()}/>
                </View>
            </View>
        );
    }
}

const styles = {

    rootContainer: {
        flex: 1,
        backgroundColor: '#ddd',
    },
    shareIconContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
};

export default Posts;
