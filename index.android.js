/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    View,
} from 'react-native';
import App from './App';

export default class Help_NGO_Init extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <App/>
      </View>
    );
  }
}
/*

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import Sound from 'react-native-sound';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

    scrollContainer: {},
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 30,
        padding: 20,
        textAlign: 'center',
        backgroundColor: 'rgba(240,240,240,1)',
    },
    button: {
        fontSize: 20,
        backgroundColor: 'rgba(220,220,220,1)',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(80,80,80,0.5)',
        overflow: 'hidden',
        padding: 7,
    },
    header: {
        textAlign: 'left',
    },
    feature: {
        flexDirection: 'row',
        padding: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgb(180,180,180)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(230,230,230)',
    },
});
/!*const testInfo =
    {
        title: 'mp3 via require()',
        url:'https://s3.amazonaws.com/brainbuddyhostingapp/Escape/rainforest.mp3',
    };*!/
function setTestState(testInfo, component, status) {
    component.setState({tests: {...component.state.tests, [testInfo.title]: status}});
}

/!**
 * Generic play function for majority of tests
 *!/

export default class sound extends Component {

    constructor(props) {
        super(props);

        // Special case for stopping
        this.stopSoundLooped = () => {
            if (!this.state.loopingSound) {
                return;
            }
            this.state.loopingSound.stop().release();
            this.setState({loopingSound: null, tests: {...this.state.tests, ['mp3 in bundle (looped)']: 'win'}});
        };
        this.whoosh = null;
        this.state = {
            loopingSound: undefined,
            tests: {},
        };
    }
     componentWillMount() {
         this.whoosh = new Sound('https://s3.amazonaws.com/brainbuddyhostingapp/Escape/rainforest.mp3','', (error) => {
             if (error) {
                 alert('failed to load the sound', error);
                 return;
             }
             // loaded successfully
             alert('duration in seconds: ' + this.whoosh.getDuration() + 'number of channels: ' + this.whoosh.getNumberOfChannels());
         });
         Sound.setCategory('Playback', true); // true = mixWithOthers
     }

    onPlay(){
        debugger
        if(this.whoosh.isLoaded()){
           // alert('loadded......');
            this.whoosh.play((success) => {
                if (success) {
                    alert('successfully finished playing');
                } else {
                    alert('playback failed due to audio decoding errors');
                }
            });
        } else {
            alert('song Not loaded......');
        }

    }
    onPause(){
        debugger
        this.whoosh.pause( () => {
            alert('pause.........');
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Button title="play" style={styles.button} onPress={() => {
                    this.onPlay()
                }}>

                </Button>
                <Button title="pause" style={styles.button} onPress={() => {
                    this.onPause()
                }}>
                </Button>
            </View>
        );
    }
}
*/

AppRegistry.registerComponent('Help_NGO_Init', () => Help_NGO_Init);
