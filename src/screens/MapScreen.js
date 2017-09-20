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
    FONT,
} from '../constants';
import DisplayInfo from '../components/infoCard';

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
            showInfo: false,
            arrayNumber: 0,
            infoData: [],
        };
    }

    async componentWillMount() {

        if (!isDevice) {
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

    onRegionChange = async (region) => {
        await this.setState({region});
        this.setRestaurantData();
    };

    async setInfoData(i) {
        await this.setState({ infoData: this.state.restaurantData[i]});
        this.setState({ showInfo: true, arrayNumber: i })
    };

    showInfo() {
        if (this.state.showInfo) {
            const { navigate } = this.props.navigation;

            return (
                <View style={styles.containerStyle}>
                    <View style={styles.infoCardTopBar}>
                        <Icon name='close'
                              color={THEME_COLOR}
                              onPress={this.closeInfo}
                              containerStyle={{margin: 5,}}
                        />
                        <Text style={[FONT.STITLE_FONT, { color: THEME_COLOR, marginRight: 8,}]}
                              onPress={() => navigate('posts', { data: this.state.infoData})}
                        >Select</Text>
                    </View>
                    <DisplayInfo data={this.state.infoData} />
                </View>
            )
        }
    }

    closeInfo = () => {
        this.setState({showInfo: false});
    };

    render() {
         /*let text = 'Waiting..';
         if (this.state.errorMessage) {
             text = this.state.errorMessage;
         } else if (this.state.location) {
             text = JSON.stringify(this.state.location);
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
                            onPress={() => this.setInfoData(i)}
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
                </MapView>
                {this.showInfo()}
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
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
    containerStyle: {
        height: height / 3,
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        margin: 10,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: '#aaa',
        position: 'absolute',
    },
    infoCardTopBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width/1.065,
        backgroundColor: '#eee',
        borderTopLeftRadius:20,
        borderTopRightRadius: 20,
    },
};

export default MapScreen;