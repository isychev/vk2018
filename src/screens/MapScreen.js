import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Easing,
  Animated,
  ScrollView,
  Button,
} from 'react-native';
// import Compass from './compass';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { Permissions } from 'expo';
import { GOOGLE_API_KEY, MASTER_CARD_KEY } from '../../appConstants';
import Filters from '../Filters';

const MAP_STYLES = [
  {
    featureType: 'administrative.country',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on',
      },
      {
        hue: '#ff0000',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'on',
      },
      {
        hue: '#ff0000',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
];

const MARKERS = [
  {
    latitude: 59.938578,
    longitude: 30.322943,
    type: 'atm',
    bank: 'Альфа-банк',
    timeWork: '10:00-19:00',
    paypass: true,
    putMoney: true,
    takeMoney: true,
    currency: ['rub', 'usd', 'eur'],
  },
  {
    latitude: 59.938741,
    longitude: 30.323916,
    type: 'atm',
    bank: 'Промсвязьбанк',
    timeWork: 'Круглосуточно',
    paypass: false,
    putMoney: true,
    takeMoney: true,
    currency: ['rub'],
  },
  {
    latitude: 59.938251,
    longitude: 30.322091,
    type: 'atm',
    bank: 'РайффайзенБанк',
    timeWork: '10:00-21:00',
    paypass: true,
    putMoney: true,
    takeMoney: true,
    currency: ['rub', 'usd', 'eur'],
  },
  {
    latitude: 59.939194,
    longitude: 30.323876,
    type: 'atm',
    bank: 'Авангард Банк',
    timeWork: '10:30-19:30',
    paypass: false,
    putMoney: true,
    takeMoney: true,
    currency: ['rub'],
  },
];

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

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
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

  renderMarkers = () =>
    MARKERS.map(marker => (
      <Marker
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
        }}
      >
        <Callout>
          <Text>{`Банк: ${marker.bank}`}</Text>
          <Text>{`Время работы: ${marker.timeWork}`}</Text>
        </Callout>
      </Marker>
    ));

  render() {
    const { width, height } = Dimensions.get('window');
    const spin = this.spinValue.interpolate({
      inputRange: [0, 360],
      outputRange: ['-0deg', '-360deg'],
    });
    return (
      <View style={styles.container}>
        <Text>{`spin ${Object.keys(spin).join(' ')}`}</Text>
        <Filters/>
        <View
          style={{
            zIndex: 0,
          }}
        >
          {this.state.currentPosition ? (
            <MapView
              mapType="standard"
              provider={PROVIDER_GOOGLE}
              customMapStyle={MAP_STYLES}
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
            >
              {this.renderMarkers()}
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
        </View>
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
