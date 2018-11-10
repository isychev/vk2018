import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Easing,
  Animated,
} from 'react-native';
// import Compass from './compass';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker } from 'react-native-maps';
import { Permissions } from 'expo';
import { GOOGLE_API_KEY } from '../../appConstants';

// console.warn(NativeModules.RNGoogleFit)

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
    this.state = {
      currentPosition: null,
    };
  }

  static navigationOptions = {
    title: 'Карта',
  };

  componentWillMount() {
    this._getLocationAsync();
  }

  // componentWillUpdate() {
  //   this.spin();
  // }

  componentDidMount() {
    navigator.geolocation.watchPosition(
      lastPosition => {
        this.setState({
          currentPosition: {
            latitude: lastPosition.coords.latitude,
            longitude: lastPosition.coords.longitude,
          },
        });
      },
      error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 },
    );
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    } else {
      Expo.Location.watchHeadingAsync(obj => {
        const heading = obj.magHeading;
        this.setState({ heading });
        this.spin();
      });
    }
  };

  spin() {
    const start = JSON.stringify(this.spinValue);
    const heading = Math.round(this.state.heading);

    let rot = +start;
    const rotM = rot % 360;

    if (rotM < 180 && heading > rotM + 180) rot -= 360;
    if (rotM >= 180 && heading <= rotM - 180) rot += 360;

    rot += heading - rotM;

    Animated.timing(this.spinValue, {
      toValue: rot,
      duration: 300,
      easing: Easing.easeInOut,
    }).start();
  }

  render() {
    const { width, height } = Dimensions.get('window');
    const spin = this.spinValue.interpolate({
      inputRange: [0, 360],
      outputRange: ['-0deg', '-360deg'],
    });
    return (
      <View style={styles.container}>
        <Text>{`spin ${Object.keys(spin).join(' ')}`}</Text>
        {this.state.currentPosition ? (
          <MapView
            style={{
              flex: 1,
              backgroundColor: 'black',
              width,
              height,
            }}
            initialRegion={{
              latitude: this.state.currentPosition.latitude,
              longitude: this.state.currentPosition.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            ref={c => (this.mapView = c)}
          >
            <Marker
              coordinate={this.state.currentPosition}
              title="marker.title"
              description="marker.description"
            >
              <View>
                <Animated.View
                  resizeMode="contain"
                  style={{
                    transform: [{ rotate: spin }],
                  }}
                >
                  <Icon name="rocket" size={30} color="#900" />
                </Animated.View>
              </View>
            </Marker>
            <MapViewDirections
              origin={this.state.currentPosition}
              destination={{
                latitude: this.state.currentPosition.latitude,
                longitude: this.state.currentPosition.longitude - 0.8,
              }}
              strokeWidth={3}
              strokeColor="black"
              apikey={GOOGLE_API_KEY}
            />
          </MapView>
        ) : null}
        {this.state.currentPosition ? (
          <View>
            <Animated.View
              resizeMode="contain"
              style={{
                transform: [{ rotate: spin }],
              }}
            >
              <Icon name="rocket" size={30} color="#900" />
            </Animated.View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapScreen;
