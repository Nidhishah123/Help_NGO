/**
 * Created by lcom71 on 30/8/17.
 */
import React from 'react';
import {
    AsyncStorage,
} from 'react-native';
import {
    PROFILE_URL_GET_SUCCESS,
    PROFILE_URL_GET_FAIL,
    USERNAME_GET_SUCCESS,
    USERNAME_GET_FAIL,
} from './types';
// import {
//     FileSystem,
//     ImagePicker,
// } from 'expo';
const ImagePicker = require('react-native-image-picker');

export const getProfilePictureLink = () => async dispatch => {
    let image_url = await AsyncStorage.getItem('user_picture_url');
    console.log('action fired...', image_url);

    if (image_url) {
        dispatch({type: PROFILE_URL_GET_SUCCESS, payload: image_url});
    } else {
        dispatch({type: PROFILE_URL_GET_FAIL});
    }
};

export const getUserName = () => async dispatch => {
    let user_name = await AsyncStorage.getItem('user_name');
    if (user_name) {
        dispatch({type: USERNAME_GET_SUCCESS, payload: user_name});
    } else {
        dispatch({type: USERNAME_GET_FAIL})
    }
};

const receievePicture = (response, dispatch) => {
    console.log('Response = ', response);

    if (response.didCancel) {
        console.log('User cancelled image picker');
    }
    else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
    }
    else {
        AsyncStorage.setItem('user_picture_url', response.uri);
        dispatch({type: PROFILE_URL_GET_SUCCESS, payload: response.uri});
    }
};

export const editProfilePicture = (userChoice) => async dispatch => {
    let result;
    const options = {
        allowsEditing: true,
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };
    if (userChoice === 'fromAlbum') {
        ImagePicker.launchImageLibrary(options, (response) => {
            receievePicture(response, dispatch)
        });
    } else {
        ImagePicker.launchCamera(options, (response) => {
            receievePicture(response, dispatch)
        });
    }

    /* if (!result.didCancel) {
        // let previous_url = await AsyncStorage.getItem('user_picture_url');
        // FileSystem.deleteAsync(previous_url, {idempotent: true});
         AsyncStorage.setItem('user_picture_url', result.uri);
         alert(result.uri);
         dispatch({ type: PROFILE_URL_GET_SUCCESS, payload: result.uri });
     }
     else {
         dispatch({ type: PROFILE_URL_GET_FAIL });
     }*/
};