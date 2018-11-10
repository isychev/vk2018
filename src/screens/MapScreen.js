import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Easing,
  Animated,
  Button,
} from 'react-native';
// import Compass from './compass';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconI from 'react-native-vector-icons/MaterialIcons';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { Permissions } from 'expo';
import { GOOGLE_API_KEY, MASTER_CARD_KEY } from '../../appConstants';
import ButtonRun from '../ButtonRun';
import Filters from '../Filters';
import { TranslateYAndOpacity } from 'react-native-motion';
// import MARKERS from '../fixtures';

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
    latitude: 59.931778,
    longitude: 30.299191,
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

  {
    latitude: 59.938578,
    longitude: 30.322943,
    type: 'atm',
    bank: 'Альфа-банк',
    timeWork: 'пн - вск 10:00-19:00',
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
    timeWork: 'пн - вск 10:00-21:00',
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
    timeWork: 'пн - вск 10:30-19:30',
    paypass: false,
    putMoney: true,
    takeMoney: true,
    currency: ['rub'],
  },
  {
    latitude: 59.940947,
    longitude: 30.312894,
    type: 'atm',
    bank: 'Промсвязьбанк',
    timeWork: 'пн - сб 10:00-18:00',
    paypass: true,
    putMoney: false,
    takeMoney: true,
    currency: ['rub'],
  },
  {
    latitude: 59.935687,
    longitude: 30.323556,
    type: 'atm',
    bank: 'Сбербанк',
    timeWork: 'Круглосуточно',
    paypass: false,
    putMoney: true,
    takeMoney: true,
    currency: ['rub'],
  },
  {
    latitude: 59.936014,
    longitude: 30.314696,
    type: 'atm',
    bank: 'Кредит Европа Банк',
    timeWork: 'пн - вск 10:00-22:00',
    paypass: true,
    putMoney: true,
    takeMoney: true,
    currency: ['rub', 'usd', 'eur'],
  },
  {
    latitude: 59.940781,
    longitude: 30.391887,
    type: 'atm',
    bank: 'Альфа-банк',
    timeWork: 'Круглосуточно',
    paypass: false,
    putMoney: false,
    takeMoney: true,
    currency: ['rub'],
  },
  {
    latitude: 59.941684,
    longitude: 30.370656,
    type: 'atm',
    bank: 'Россельхозбанк',
    timeWork: 'пн - вск 9:00-19:30',
    paypass: true,
    putMoney: true,
    takeMoney: true,
    currency: ['rub', 'usd', 'eur'],
  },
  {
    latitude: 59.93704,
    longitude: 30.360047,
    type: 'atm',
    bank: 'УРАЛСИБ',
    timeWork: 'пн - вск 9:00-18:00',
    paypass: true,
    putMoney: false,
    takeMoney: true,
    currency: ['rub', 'usd', 'eur'],
  },
  {
    latitude: 59.946691,
    longitude: 30.362345,
    type: 'shop',
    bank: 'Фасоль',
    timeWork: 'пн - вск 9:00-20:00',
    paypass: true,
    putMoney: false,
    takeMoney: true,
    currency: ['rub'],
  },
  {
    latitude: 59.935649,
    longitude: 30.372108,
    type: 'shop',
    bank: 'Фасоль',
    timeWork: 'Круглосуточно',
    paypass: true,
    putMoney: true,
    takeMoney: true,
    currency: ['rub', 'usd', 'eur'],
  },
  {
    latitude: 59.924624,
    longitude: 30.31964,
    type: 'atm',
    bank: 'Балтийский Банк',
    timeWork: 'Круглосуточно',
    paypass: true,
    putMoney: true,
    takeMoney: true,
    currency: ['rub', 'usd', 'eur'],
  },
  {
    latitude: 59.929535,
    longitude: 30.320732,
    type: 'shop',
    bank: 'Фасоль',
    timeWork: 'Круглосуточно',
    paypass: true,
    putMoney: true,
    takeMoney: true,
    currency: ['rub', 'usd', 'eur'],
  },
  {
    latitude: 59.927586,
    longitude: 30.326744,
    type: 'atm',
    bank: 'Газпромбанк',
    timeWork: 'пн - вск 10:00 - 22:00',
    paypass: true,
    putMoney: false,
    takeMoney: true,
    currency: ['rub', 'usd', 'eur'],
  },
  {
    latitude: 59.926877,
    longitude: 30.334091,
    type: 'shop',
    bank: 'Фасоль',
    timeWork: 'Круглосуточно',
    paypass: false,
    putMoney: true,
    takeMoney: true,
    currency: ['rub'],
  },
  {
    latitude: 59.926382,
    longitude: 30.350318,
    type: 'atm',
    bank: 'Банк Русский Стандарт',
    timeWork: 'Круглосуточно',
    paypass: true,
    putMoney: true,
    takeMoney: true,
    currency: ['rub', 'usd', 'eur'],
  },
  {
    latitude: 59.94532,
    longitude: 30.348516,
    type: 'atm',
    bank: 'РосЕвроБанк',
    timeWork: 'Круглосуточно',
    paypass: false,
    putMoney: false,
    takeMoney: true,
    currency: ['rub'],
  },
  {
    latitude: 59.942511,
    longitude: 30.359008,
    type: 'atm',
    bank: 'Сбербанк',
    timeWork: 'Круглосуточно',
    paypass: true,
    putMoney: true,
    takeMoney: true,
    currency: ['rub', 'usd', 'eur'],
  },
  {
    latitude: 59.941995,
    longitude: 30.370513,
    type: 'atm',
    bank: 'Россельхозбанк',
    timeWork: 'Круглосуточно',
    paypass: true,
    putMoney: true,
    takeMoney: true,
    currency: ['rub', 'usd', 'eur'],
  },
  {
    latitude: 59.938179,
    longitude: 30.369911,
    type: 'atm',
    bank: 'Сбербанк',
    timeWork: 'пн - пт 8:00-20:00',
    paypass: true,
    putMoney: false,
    takeMoney: true,
    currency: ['rub'],
  },
  {
    latitude: 59.923388,
    longitude: 30.341767,
    type: 'atm',
    bank: 'УРАЛСИБ',
    timeWork: 'Круглосуточно',
    paypass: true,
    putMoney: false,
    takeMoney: true,
    currency: ['rub', 'usd', 'eur'],
  },
  {
    latitude: 59.926232,
    longitude: 30.321124,
    type: 'atm',
    bank: 'Газпромбанк',
    timeWork: 'Круглосуточно',
    paypass: true,
    putMoney: false,
    takeMoney: true,
    currency: ['rub'],
  },
  {
    latitude: 59.92525,
    longitude: 30.319837,
    type: 'atm',
    bank: 'Банк ФК Открытие',
    timeWork: 'пн - вск 8:00-20:00',
    paypass: true,
    putMoney: true,
    takeMoney: true,
    currency: ['rub', 'usd', 'eur'],
  },
  {
    latitude: 59.923742,
    longitude: 30.31703,
    type: 'atm',
    bank: 'Сбербанк',
    timeWork: 'пн - вск 8:00-20:00',
    paypass: true,
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
      currentPosition: {
        latitude: 59.938962,
        longitude: 30.318497,
      },
      selectedMarker: null,
      filters: {
        shop: true,
        paypass: false,
        currency: 'rub',
        work: true,
        take: true,
      },
      filterMarkers: [],
      typePath: 'walking',
    };
  }

  static navigationOptions = {
    // title: 'Карта',
  };

  componentWillMount() {
    this._getLocationAsync();
    this.onChangeFilters({});
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    navigator.geolocation.watchPosition(
      lastPosition => {
        if (lastPosition.coords && lastPosition.coords.longitude > 28) {
          this.setState({
            currentPosition: {
              latitude: lastPosition.coords.latitude,
              longitude: lastPosition.coords.longitude,
            },
          });
        }
      },
      error => {},
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
  onMapReady = () => {
    setTimeout(() => {
      this.setState({
        mapReady: true,
      });
    }, 1000);
  };
  onChangeTypePath = typePath => {
    const oldSelectedMarker = this.state.selectedMarker;
    this.setState({
      typePath,
      // selectedMarker: null,
      repaintRun: true,
    });
    setTimeout(() => {
      this.setState({
        // selectedMarker: oldSelectedMarker,
        repaintRun: false,
      });
    }, 700);
  };
  onChangeFilters = filters => {
    this.setState({
      filters,
      filterMarkers: this.getFiltermarkers(filters),
    });
  };
  onSelectMarker = marker => {
    const oldMarkers = this.state.filterMarkers;
    this.setState({
      selectedMarker: marker,
      filterMarkers: [],
    });
    setTimeout(() => {
      this.setState({
        filterMarkers: oldMarkers,
      });
    }, 700);
  };
  getFiltermarkers = filters =>
    MARKERS.slice(-60).filter(marker => {
      const isBank = !filters.shop || (filters.shop && marker.type === 'shop');
      const isPaypass = !filters.paypass || (filters.paypass && marker.paypass);
      const isTake =
        !filters.take ||
        (filters.take && (marker.takeMoney && marker.putMoney));
      const isWork =
        !filters.work || (filters.work && marker.timeWork === 'Круглосуточно');
      return isBank && isPaypass && isTake && isWork;
    });
  renderMarkers = () =>
    this.state.filterMarkers.map((marker, index) => {
      const ref = null;
      return (
        <Marker
          key={`${marker.latitude}${marker.longitude}${index}`}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          calloutVisible={!this.state.selectedMarker}
        >
          <Callout
            onPress={() => {
              this.onSelectMarker(marker);
            }}
          >
            <View
              style={{
                padding: 5,
              }}
            >
              <Text>{`${
                marker.type === 'shop' ? 'Магазин' : 'Банк'
              }: ${marker.bank || marker.name}`}</Text>
              <Text>{`Время работы: ${marker.timeWork}`}</Text>
              <Text>Путь: 4 мин</Text>
              <Button
                title="Маршрут"
                onPress={() => {
                  this.onSelectMarker(marker);
                }}
              />
            </View>
          </Callout>
        </Marker>
      );
    });
  render() {
    const { width, height } = Dimensions.get('window');
    const spin = this.spinValue.interpolate({
      inputRange: [0, 360],
      outputRange: ['-0deg', '-360deg'],
    });
    const {
      mapReady,
      filters,
      selectedMarker,
      typePath,
      repaintRun,
    } = this.state;
    return (
      <View style={styles.container}>
        {mapReady && !selectedMarker && !repaintRun ? (
          <Filters onChange={this.onChangeFilters} filters={filters} />
        ) : null}
        {selectedMarker ? (
          <ButtonRun onChange={this.onChangeTypePath} value={typePath} />
        ) : null}

        <View
          style={{
            zIndex: 0,
          }}
        >
          {this.state.currentPosition ? (
            <MapView
              // zoomControlEnabled
              // followsUserLocation
              // showsMyLocationButton
              onMapReady={this.onMapReady}
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
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
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
                    <View style={{ width: 40, height: 40 }}>
                      <Icon name="location-arrow" size={40} color="#e35205" />
                    </View>
                  </Animated.View>
                </View>
              </Marker>
              {selectedMarker && !repaintRun ? (
                <MapViewDirections
                  mode={
                    this.state.typePath === 'bicycling'
                      ? 'walking'
                      : this.state.typePath
                  }
                  origin={this.state.currentPosition}
                  destination={{
                    latitude: selectedMarker.latitude,
                    longitude: selectedMarker.longitude,
                  }}
                  strokeWidth={6}
                  strokeColor="#736466"
                  apikey={GOOGLE_API_KEY}
                />
              ) : null}
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
