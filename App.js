import React from 'react';
import { MapView } from 'expo';
import { StyleSheet, Text, View  } from 'react-native';

// console.warn(NativeModules.RNGoogleFit)

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error:null,
    };
  }

  componentDidMount() {


    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>was 123</Text>
        {this.state.latitude?<MapView
          style={{ flex: 1,backgroundColor: 'black',width: 500, height:500 }}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />:null}
        {/*<Text>{`${this.state.latitude} ${this.state.longitude}`}</Text>*/}
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
