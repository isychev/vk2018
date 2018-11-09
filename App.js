import React from 'react';
// import { MapView, Marker } from 'expo';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_API_KEY } from './appConstants';

// console.warn(NativeModules.RNGoogleFit)

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPosition: null,
    };
  }

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

  render() {
    const origin = { latitude: 37.3318456, longitude: -122.0296002 };
    const destination = { latitude: 37.771707, longitude: -122.4053769 };
    const { width, height } = Dimensions.get('window');
    console.log('was');
    return (
      <View style={styles.container}>
        <Text>was 123</Text>
        {this.state.currentPosition ? (
          <MapView
            style={{
              flex: 1,
              backgroundColor: 'black',
              width: 500,
              height: 500,
            }}
            initialRegion={{
              latitude: this.state.currentPosition.latitude,
              longitude: this.state.currentPosition.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            ref={c => this.mapView = c}
          >
            <Marker
              coordinate={this.state.currentPosition}
              title="marker.title"
              description="marker.description"
            />
            <MapViewDirections
              origin={this.state.currentPosition}
              destination={{
                latitude: this.state.currentPosition.latitude,
                longitude: this.state.currentPosition.longitude - 0.8,
              }}
              strokeWidth={3}
              strokeColor="black"
              apikey={GOOGLE_API_KEY}
              onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              }}
              onReady={(result) => {
                console.log('onREADY 123');
                console.log(result);
                // this.mapView.fitToCoordinates(result.coordinates, {
                //   edgePadding: {
                //     right: (width / 20),
                //     bottom: (height / 20),
                //     left: (width / 20),
                //     top: (height / 20),
                //   }
                // });
              }}
              onError={(errorMessage) => {
                console.log('GOT AN ERROR');
              }}
            />
          </MapView>
        ) : null}
        {this.state.currentPosition ? (
          <Text>{`${this.state.currentPosition.latitude} ${
            this.state.currentPosition.longitude
          }`}</Text>
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
