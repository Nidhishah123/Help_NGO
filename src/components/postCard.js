/**
 * Created by lcom71 on 2/9/17.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';
import {
    Card,
    Avatar,
    Icon,
} from 'react-native-elements';
import {
    THEME_COLOR,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    VERTICAL,
    FONT,
} from '../constants';

export default class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
        }
    }

    renderLikeIcon(liked) {
        let icon_name;
        if (liked) {
            icon_name='md-heart';
        }
        else
            icon_name = 'md-heart-outline';

        return <Icon
            name={icon_name}
            type='ionicon'
            style={{left:0}}
            color={THEME_COLOR}
            onPress={() => {
                    this.props.like(this.props.PostData);
                    this.setState({render: true});
                }}/>
    }

    render() {
        const {
            user_profile_url,
            user_name,
            post_description,
            photo_url,
            likes,
            liked,
        } = this.props.PostData;
        return (
            <Card
                containerStyle={styles.cardContainerStyle}
                title={null}
            >
                <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 10}}>
                    <Avatar
                        height={VERTICAL ? SCREEN_HEIGHT/16 : SCREEN_WIDTH/16}
                        width={VERTICAL ? SCREEN_HEIGHT/16 : SCREEN_WIDTH/16}
                        source={{ uri: user_profile_url }}/>
                    <Text style={styles.postOwnerName}>{user_name}</Text>
                </View>

                {/*<View style={{height: 1, backgroundColor:'#bfbfbf', margin:1, marginTop:10, marginBottom:3}}/>*/}

                <Text style={styles.postDescriptionStyle}>{post_description}</Text>

                <Image
                    style={{height: SCREEN_HEIGHT/3, width:SCREEN_WIDTH/1.1}}
                    source={photo_url}
                />

                <View style={styles.cardBottomBarContainer}>
                    <View style={{ flexDirection:'row' }}>
                        {this.renderLikeIcon(liked)}
                        <Text style={{left:4}}>{likes}</Text>
                    </View>
                    <View style={{ flexDirection:'row', alignItems: 'center' }}>
                        <Text style={styles.shareAndCommentTextStyle}>Comment</Text>
                        <View style={styles.dotSeparatorStyle}/>
                        <Text style={styles.shareAndCommentTextStyle}>Share</Text>
                    </View>
                </View>
            </Card>
        )
    }
}

const styles = {
    cardContainerStyle: {
        padding: 10,
        marginTop:7,
        marginLeft:7,
        marginRight: 7,
    },
    dotSeparatorStyle: {
        backgroundColor: '#808080',
        height:4,
        width:4,
        borderRadius:5,
        margin:4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareAndCommentTextStyle: [FONT.LMEDIUM_FONT,{
        color: '#606060',
        textDecorationLine:'underline',
    }],
    cardBottomBarContainer: {
        flexDirection:'row',
        justifyContent: 'space-between',
        flex:1,
        marginTop:10,
    },
    postDescriptionStyle: [FONT.MEDIUM_FONT,{
        marginBottom:8,
        marginTop:4,
    }],
    postOwnerName: {
        marginLeft: 10,
        color: THEME_COLOR
    }
};
