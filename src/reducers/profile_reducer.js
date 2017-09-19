/**
 * Created by lcom71 on 30/8/17.
 */
import {
    PROFILE_URL_GET_SUCCESS,
    PROFILE_URL_GET_FAIL,
    USERNAME_GET_SUCCESS,
    USERNAME_GET_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
    profile_url:'../Images/user-image.jpg',
    user_name: 'Anonymous',
    total_posts:100,
    total_donation:'500',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case PROFILE_URL_GET_SUCCESS:
            return {...state, profile_url: action.payload};

        case PROFILE_URL_GET_FAIL:
            return state;

        case USERNAME_GET_SUCCESS:
            return {...state, user_name: action.payload};

        case USERNAME_GET_FAIL:
            return state;

        default:
            return state;
    }
}