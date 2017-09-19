import axios from 'axios';
import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL,
} from './types';
import { AsyncStorage, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import {LoginManager, AccessToken,} from 'react-native-fbsdk';

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
   // let data = await AccessToken.getCurrentAccessToken();
    if( token ){
       // alert('token avail..');
      //  let token = data.accessToken.toString();
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        //LoginManager.logOut();
        doFacebooLogin(dispatch);
    }
};

const doFacebooLogin = async dispatch => {
    let { isCancelled } = await LoginManager.logInWithReadPermissions(['public_profile','user_posts']);
    if ( !isCancelled ) {
        let data = await AccessToken.getCurrentAccessToken();
        let token = data.accessToken.toString();
        await afterLoginComplete(dispatch, token);
    }
    else {
        dispatch({type: FACEBOOK_LOGIN_FAIL});
    }
};

const afterLoginComplete = async (dispatch, token) => {
    const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,first_name,last_name,gender,picture.height(350),cover&access_token=${token}`);
    let res = await response.json();

    axios.post(`http://192.168.200.70:4000/v1/addUser?fbId=${res.id}&name=${res.name}
&gender=${res.gender}&firstName=${res.first_name}&lastName=${res.last_name}
&profileUrl=${encodeURIComponent(res.picture.data.url)}&token=${encodeURIComponent(token)}`
    ).then( async response => {
        if(response.data === 'success'){
            Alert.alert(
                'Logged in',
                `Hi ${res.name}`,
            );

            await AsyncStorage.setItem('user_picture_url', res.picture.data.url);
            await AsyncStorage.setItem('user_name', res.name);
            await AsyncStorage.setItem('fb_token', token);
            await AsyncStorage.setItem('user_fb_id',res.id);
            console.log('path : ',RNFS.DocumentDirectoryPath+'/profile.jpg');
            const DownloadFileOptions = {
                fromUrl: res.picture.data.url,
                toFile: RNFS.DocumentDirectoryPath+'/profile.jpg',
            };
            /*let fileResult = await RNFS.downloadFile(DownloadFileOptions);
            console.log('result:- ',fileResult);
            if(fileResult.jobId) {
                await AsyncStorage.setItem('user_picture_url', RNFS.DocumentDirectoryPath+'/profile.jpg');
            }*/
            /*FileSystem.downloadAsync(
                res.picture.data.url,
                FileSystem.documentDirectory+'profile.jpg'
            ).then( async result => {
                await AsyncStorage.setItem('user_picture_url', result.uri);
            }).catch( err => console.log(err));*/
            dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token});
        }
        else if(response.data === 'successUpdate'){
            Alert.alert(
                'Logged in',
                `Hi ${res.name}`,
            );

            let response = await fetch(`http://192.168.200.70:4000/v1/getUser?fbId=${res.id}`);
            let json = await response.json();

            await AsyncStorage.setItem('user_picture_url', json.profile_url);
            await AsyncStorage.setItem('user_name', json.name);
            await AsyncStorage.setItem('fb_token', token);
            await AsyncStorage.setItem('user_fb_id',json.user_fb_id);
            console.log('complete-1');
            const DownloadFileOptions = {
                fromUrl: res.picture.data.url,
                toFile: RNFS.DocumentDirectoryPath+'/profile.jpg',
            };
            /*let fileResult = await RNFS.downloadFile(DownloadFileOptions);
            console.log('result:- ',fileResult.promise);
            if(fileResult.jobId) {
                await AsyncStorage.setItem('user_picture_url', RNFS.DocumentDirectoryPath+'/profile.jpg');
            }*/
            /*FileSystem.downloadAsync(
                json.profile_url,
                FileSystem.documentDirectory+'profile.jpg'
            ).then( async result => {
                await AsyncStorage.setItem('user_picture_url', result.uri);
            }).catch( err => console.log(err));*/
            console.log('complete-2');
            dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token});
        }
        else{
            dispatch({type: FACEBOOK_LOGIN_FAIL});
        }
    }).catch( err => dispatch({type: FACEBOOK_LOGIN_FAIL}));
};