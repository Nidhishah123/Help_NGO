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
import {
    THEME_COLOR,
    isAndroid
} from '../constants';
import PostCard from '../components/postCard';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {shareLinkContent: null};
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
        let image_url = await AsyncStorage.getItem('user_picture_url');

        const shareLinkContent = {
            contentType: 'link',
            contentUrl: "https://www.cafecoffeeday.com/",
            commonParameters:{
                placeId: "1811491829114040",
                hashtag: `#sharedWithHelpWithFun`
            },
            /*photos: [
                {
                    imageUrl: image_url,
                    userGenerated: true,
                    caption: "Demo share"
                },
                {
                    imageUrl: image_url,
                    userGenerated: true,
                    caption: "Demo share"
                }
            ],*/
        };
        this.setState({shareLinkContent: shareLinkContent});
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

    shareLinkWithShareDialog = () => {
        let postId;
        let tmp = this.state;
        ShareDialog.canShow(this.state.shareLinkContent).then(
            function (canShow) {
                if (canShow) {
                    return ShareDialog.show(tmp.shareLinkContent);
                }
            }
        ).then(
            function (result) {
                if (result.isCancelled) {
                    Alert.alert('Alert','Share cancelled',[
                        {text: 'OK'},
                    ],{ cancelable: false });
                } else {
                    postId = result.postId;
                    Alert.alert('Share success with postId: ', result.postId,[
                        {text: 'OK'},
                    ],{ cancelable: false });
                }
            },
            function (error) {
                Alert.alert('Failed', 'Share fail with error: ' + error);
            }
        );
    };

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
        const { params } = this.props.navigation.state;
        if(params){
            alert('data received '+params.data.name);
        }
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

/*
GraphRequest request = GraphRequest.newPostRequest(
  accessToken,
  "/1066213170181119/feed",
  new JSONObject("{\"message\":\"Application Testing.... :D\",\"privacy\":\"{value: 'ALL_FRIENDS'}\",\"place\":\"403245376440678\",\"link\":\"https://www.facebook.com/TheGrandBhagwatiSurat/\"}"),
  new GraphRequest.Callback() {
    @Override
    public void onCompleted(GraphResponse response) {
      // Insert your code here
    }
});
request.executeAsync();
 */

/*

FB.api(
  '/1066213170181119/photos',
  'POST',
  {"url":"http://d2dc8ug9yu03zt.cloudfront.net/images/735/grow.png","caption":"Testing demo 3","no_story":"true","privacy":"{ value: \"SELF\" }"},
  function(response) {
      // Insert your code here
  }
);

 */

/*
FB.api(
  '/1066213170181119/photos',
  'GET',
  {"type":"uploaded"},
  function(response) {
      // Insert your code here
  }
);
 */