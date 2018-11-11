import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { TranslateYAndOpacity } from 'react-native-motion';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FilterButton from './FilterButton';

class RouteScreen extends Component {
  state = {
    show: false,
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ show: true });
      setTimeout(this.props.onClose, 4000);
    }, 4000);
  };
  render() {
    const { setField, onClose } = this.props;
    const { show } = this.state;

    return show ? (
      <View style={styles.container}>
        <View style={styles.bg} onPress={onClose} />

        {show ? (
          <View
            style={{
              zIndex: 100,
              // width: '95%',
              position: 'absolute',
              bottom: 135,
              left: 10,
              right: 10,
              backgroundColor: '#ffffff',
              borderRadius: 4,
              padding: 10,
            }}
          >
            <Text>
              Теперь вы можете снимать наличные на кассах магазинов. Включи
              данный фильтр, чтобы узнать каких именно.
            </Text>
          </View>
        ) : null}

        {show ? (
          <View
            style={{
              zIndex: 101,
              width: 73,
              position: 'absolute',
              bottom: 50,
            }}
          >
            <FilterButton
              onPress={() => {
                setField && setField('shop', !shop);
                onClose();
              }}
            >
              <Icon name="shopping-cart" size={30} color="#e35205" />
            </FilterButton>
          </View>
        ) : null}
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    zIndex: 99,
  },
  bg: {
    position: 'absolute',
    backgroundColor: '#000000',
    opacity: 0.5,
    top: 0,
    height: '100%',
    width: '100%',
  },
});

export default RouteScreen;
