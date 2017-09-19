/**
 * Created by lcom71 on 18/8/17.
 */

import { combineReducers } from 'redux';
import auth from './auth_reducer';
import profile_data from './profile_reducer';

export default combineReducers({
    auth,
    profile_data,
});