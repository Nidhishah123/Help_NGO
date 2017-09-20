/**
 * Created by lcom71 on 22/8/17.
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    PermissionsAndroid,
    Alert,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import {
    Icon
} from 'react-native-elements';
import MapView from 'react-native-maps';
import {
    SCREEN_HEIGHT as height,
    SCREEN_WIDTH as width,
    THEME_COLOR,
    isAndroid,
    isDevice,
    isIOS,
} from '../constants';

import markerImage from '../Images/icon3.png';

const LATITUDE = 21.147179;
const LONGITUDE = 72.759790;

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapScreen extends Component {
    static navigationOptions = {
        title: 'Restaurant',
        tabBarIcon: ({tintColor}) => (<Icon name="restaurant-menu" color={tintColor}/>)
    };

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            errorMessage: null,
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            restaurantData: [],
            LocationButtonBottom: 0,
        };
        console.log('map scr...');
    }

    async componentWillMount() {

        if (!isDevice) {
            alert('fffffff');
            this.setState({
                errorMessage: 'Oops, this will not work in an Android emulator. Try it on your device!',
            });
        } else {
            const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted) {
                await this._findMe();
            }
            else {
                await this.requestLocationPermission();
            }
        }
        this.setRestaurantData();
        setTimeout(()=>this.setState({LocationButtonBottom: 1}),500);
    }

    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                await this._getLocationAsync();
            } else {
                this.setState({
                    errorMessage: 'Permission to access location was denied',
                });
                Alert.alert('Permission denied',
                    `This may cause a problem in app efficiency, grant permission from settings`
                );
            }
        } catch (err) {
            console.warn(err)
        }
    };

    setRestaurantData() {
        let {latitude, longitude, latitudeDelta, longitudeDelta} = this.state.region;

        let minLat = latitude - latitudeDelta / 2;
        let maxLat = latitude + latitudeDelta / 2;
        let minLong = longitude - longitudeDelta / 2;
        let maxLong = longitude + longitudeDelta / 2;
        let url = 'http://192.168.200.70:4000/v1/restaurants.json';

        fetch(`${url}?minLat=${minLat}&maxLat=${maxLat}&minLong=${minLong}&maxLong=${maxLong}`)
            .then(restaurantDataResponse => restaurantDataResponse.json())
            .then(restaurantDataJson => {
                //console.log('--> Total restaurant :- ',restaurantDataJson.total_restaurants);
                if (restaurantDataJson.total_restaurants > 0) {
                    this.setState({restaurantData: restaurantDataJson.restaurants});
                }
            })
            .catch(err => console.log('error retrieving data: ', err));
    }

    _findMe() {
        const success = (position) => {
            alert('data received success');
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
            });
        };

        const error = (err) => {
            console.warn('get current location error - ',err);
        };

        const options = {
            enableHighAccuracy: true,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    }
    setMarkerRef = (ref) => {
        this.marker = ref
    }
    onRegionChange = (region) => {
        this.setState({region});
        this.setRestaurantData();
    };

    render() {
         /*let text = 'Waiting..';
         if (this.state.errorMessage) {
             text = this.state.errorMessage;
         } else if (this.state.location) {
             text = JSON.stringify(this.state.location);this.onRegionChange
         }*/
        return (
            <View style={{flex: 1, paddingBottom: this.state.LocationButtonBottom}}>
                <MapView
                    mapType="standard"
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChange}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    showsBuildings
                    showsTraffic
                    loadingEnabled={true}
                    loadingIndicatorColor="#fff"
                    loadingBackgroundColor={THEME_COLOR}
                    style={{flex: 1, zIndex:-1}}

                >
                    {this.state.restaurantData.map((restaurant, i) => (

                        <MapView.Marker
                            key={i}
                            coordinate={restaurant}
                            pinColor='#e91e63'


                        >
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <View  style={{backgroundColor:THEME_COLOR,borderRadius:8,paddingLeft:5,paddingRight:5}}>
                                <Text style={{color:'#FFF'}}>{restaurant.name}</Text>
                                </View>
                                <Image
                                    style={{width:30,height:30}}
                                   source={require('../Images/icon3.png')}
                                />
                            </View>
                        </MapView.Marker>
                    ))}
                    {/*<MapView.Marker
                        coordinate={this.state.restaurantData[1]}
                    >
                        <MapView.Callout style={styles.plainView}>
                            <View>
                                <Text>This is a plain view</Text>
                            </View>
                        </MapView.Callout>
                    </MapView.Marker>
                    <MapView.Marker
                        coordinate={this.state.region}
                        calloutOffset={{ x: -8, y: 28 }}
                        calloutAnchor={{ x: 0.5, y: 0.4 }}
                    >
                        {/*<MapView.Callout tooltip style={styles.customView}>*/}
                            {/*<View style={[styles.container1]}>*/}
                                {/*<View style={styles.bubble}>*/}
                                    {/*<View style={styles.amount}>*/}
                                        {/*<Text>This is a custom callout bubble view</Text>*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                                {/*<View style={styles.arrowBorder} />*/}
                                {/*<View style={styles.arrow} />*/}
                            {/*</View>*/}
                        {/*</MapView.Callout>*/}
                    {/*</MapView.Marker>*!/*/}
                </MapView>
                {/*<View style={styles.container}>
                    <Text style={styles.paragraph}>{text}</Text>
                </View>*/}
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    plainView: {
        width: 60,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
    customView: {
        width: 140,
        height: 100,
    },
    container1: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    bubble: {
        width: 140,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 6,
        borderColor: '#007a87',
        borderWidth: 0.5,
    },
    amount: {
        flex: 1,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: '#4da2ab',
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        alignSelf: 'center',
        marginTop: -0.5,
    },
};

export default MapScreen;