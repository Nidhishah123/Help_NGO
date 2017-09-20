import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Linking,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {
    FONT,
} from '../constants';

export default class infoCard extends Component {
    constructor(props){
        super(props);
    }

    displayRating() {
        let { fb_star_rating } = this.props.data;
        if(fb_star_rating !== 'not-available') {
            fb_star_rating = parseFloat(fb_star_rating);
            return (
                <StarRating
                    disabled={true}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    starSize={20}
                    maxStars={5}
                    rating={fb_star_rating}
                    starColor={'orange'}
                />
            )
        }
        else {
            return <Text>Not Available</Text>;
        }
    }

    openWebsite = () => {
        let { website } = this.props.data;
        Linking.canOpenURL('https://'+website).then(supported => {
            if (!supported) {
                alert('Can\'t handle url: ' + website);
            } else {
                return Linking.openURL('https://'+website);
            }
        }).catch(err => alert(err));
    };

    render() {
        let { name, street, city, state, pincode, phone, website } = this.props.data;
        return(
            <ScrollView style={styles.containerStyle}>
                <Text style={styles.nameStyle}>{name}</Text>
                <View style={styles.showInLine}>{this.displayRating()}</View>
                <View style={[styles.showInLine, {marginTop: 15, alignItems: 'flex-start'}]}>
                    <Text>Address: </Text>
                    <Text style={{color:'#444', marginRight: 60,}}>{street}, {city}, {state} - {pincode}</Text>
                </View>
                <Text style={{ marginTop: 0 }}>Phone: {phone}</Text>
                <View style={styles.showInLine}>
                    <Text>Website: </Text>
                    <Text onPress={this.openWebsite} style={styles.wedsiteFont}>{website}</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    containerStyle: {
        marginLeft: 5,
        marginRight: 5,
        paddingBottom: 20,
    },
    showInLine: {
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    nameStyle:[FONT.TITLE_FONT,{
        color: '#333',
    }],
    ratingContainer: {
        marginTop: 10,
    },
    wedsiteFont: {
        textDecorationLine: 'underline',
        color: 'blue',
    },
};