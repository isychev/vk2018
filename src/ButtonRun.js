import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Easing,
  Animated,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

const buttonStyle = {
  paddingTop: 20,
  paddingRight: 15,
  paddingBottom: 20,
  paddingLeft: 15,
  backgroundColor: '#eee',
  borderRadius: 50,
  borderWidth: 1,
  borderColor: '#eee',
};

const activeButtonStyle = {
  ...buttonStyle,
  // position: 'absolute',
  backgroundColor: '#0000ff',
  borderRadius: 70,
  paddingTop: 30,
  paddingRight: 23,
  paddingBottom: 30,
  paddingLeft: 23,
};

const textStyle = {
  color: '#000',
  textAlign: 'center',
};
const activeTextStyle = {
  color: '#fff',
  textAlign: 'center',
};
export default class ButtonRUn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }
  handleClick = () => {
    this.setState({
      isActive: !this.state.isActive,
    });
  };
  render() {
    const { isActive } = this.state;
    return (
      <TouchableOpacity
        style={isActive ? activeButtonStyle : buttonStyle}
        activeOpacity={0.5}
        onPress={this.handleClick}
      >
        <Text style={isActive ? activeTextStyle : textStyle}>SUB2</Text>
      </TouchableOpacity>
    );
  }
}
