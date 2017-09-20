/**
 * Created by lcom71 on 18/8/17.
 */

import { Dimensions, Platform } from 'react-native';
export { FONT } from './fontsize';

export const isIOS = (Platform.OS === 'ios');
export const isAndroid = (Platform.OS === 'android');
export const isDevice = false;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const VERTICAL = SCREEN_WIDTH < SCREEN_HEIGHT;

export const FACEBOOK_APP_ID = '166249283947538';
export const WELCOME_SCREEN_THEME_COLOR = '#fff';
export const ACTIVITY_INDICATOR_COLOR = '#3B5998';

export const THEME_COLOR = '#e91e63';