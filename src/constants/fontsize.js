import React from 'react';
import {
    Dimensions,
    StyleSheet,
} from 'react-native';

const sc_width = Dimensions.get('window').width;
const sc_height = Dimensions.get('window').height;

const width = sc_width < sc_height ? sc_width : sc_height;

const XLARGE_FONT = (30*width)/375;

const LARGE_FONT = (25*width)/375;

const TITLE_FONT = (20*width)/375;

const MEDIUM_FONT = (16*width)/375;

const TEXTBOX_FONT = (15*width)/375;

const LMEDIUM_FONT = (13*width)/375;

const SMALL_FONT = (12*width)/375;

const XSMALL_FONT = (11*width)/375;

export const FONT = StyleSheet.create({
    XLARGE_FONT: { fontSize: XLARGE_FONT },
    LARGE_FONT: { fontSize: LARGE_FONT },
    TITLE_FONT: { fontSize: TITLE_FONT },
    MEDIUM_FONT: { fontSize: MEDIUM_FONT },
    TEXTBOX_FONT: { fontSize: TEXTBOX_FONT },
    SMALL_FONT: { fontSize: SMALL_FONT },
    XSMALL_FONT: { fontSize: XSMALL_FONT },
    LMEDIUM_FONT: { fontSize: LMEDIUM_FONT },
    width: {width:sc_width},
    height: {height:sc_height},
})