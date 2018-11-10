import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Button from 'apsl-react-native-button'

class PromoScreen extends Component {
    static navigationOptions = {
        title: 'Главная',
      };

  render() {
    console.log(this.props.navigation);
    return (
      <View style={styles.container}>
        <View style={styles.promo}>
            <Image style={styles.logo} source={require('../logo.png')}></Image>
        </View>
        <View style={styles.actions}>
        <Button style={{ backgroundColor: '#e35205', borderColor: '#e35205' }} textStyle={{ color: '#ffffff' }} onPress={() => this.props.navigation.navigate('map')}>
            Снятие наличных
        </Button>
        <Button style={{ backgroundColor: '#e35205', borderColor: '#e35205' }} textStyle={{ color: '#ffffff' }} onPress={() => this.props.navigation.navigate('map')}>
            Пополнение счета
        </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#ffffff'
    },
    promo: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 315, height: 301,
        top: 70,
    },
    actions: {
        width: '90%',
        bottom: 120
    }
});

export default PromoScreen;
