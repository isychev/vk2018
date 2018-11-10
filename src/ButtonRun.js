import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FilterButton from './FilterButton';

import { TranslateYAndOpacity } from 'react-native-motion';

const buttonStyle = {
  paddingTop: 20,
  paddingRight: 23,
  paddingBottom: 20,
  paddingLeft: 23,
  backgroundColor: '#e35205',
  borderColor: '#e35205',
  borderRadius: 53,
  borderWidth: 1,
};

const openButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#e35205',
  borderColor: '#fff',
  paddingTop: 31,
  paddingBottom: 31,
  paddingRight: 34,
  paddingLeft: 34,
  // marginTop: -20,
  // marginBottom: -20,
  // marginLeft: -20,
  // marginRight: -20,
};

const smallButtonsStyle = {
  paddingTop: 15,
  paddingBottom: 15,
  paddingRight: 16,
  paddingLeft: 16,
};

const deviceWidth = Dimensions.get('window').width;

export default class ButtonRun extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  handleChange = value => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    this.handleClick();
  };
  getIcon = () => {
    const { value } = this.props;
    if (value === 'walking') {
      return 'run';
    }
    if (value === 'bicycling') {
      return 'bike';
    }
    if (value === 'driving') {
      return 'car';
    }
    return 'run';
  };
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: 50,
          left: deviceWidth / 2 - (this.state.isOpen ? 50 : 30),
          // width: deviceWidth,
          // backgroundColor: 'red',
        }}
      >
        <TranslateYAndOpacity startOnDidMount duration={100} translateYMin={50}>
          <View
            style={{
              zIndex: 5,
              padding: this.state.isOpen ? 100 : 0,
              margin: this.state.isOpen ? -100 : 0,
              // backgroundColor: '#fff',
            }}
          >
            {this.state.isOpen ? (
              <TranslateYAndOpacity startOnDidMount translateYMin={50}>
                <View
                  style={{
                    position: 'absolute',
                    top: -100,
                    left: -38,
                    width: 190,
                    zIndex: 6,
                    height: 100,
                    // backgroundColor: '#000',
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      zIndex: 6,
                    }}
                  >
                    <View
                      style={{
                        position: 'relative',
                        top: 28,
                        zIndex: 5,
                      }}
                    >
                      <FilterButton
                        activeStyle={smallButtonsStyle}
                        isActive
                        onPress={() => {
                          this.handleChange('driving');
                        }}
                      >
                        <Icon name="car" size={24} color="#fff" />
                      </FilterButton>
                    </View>
                    <View style={{ zIndex: 5 }}>
                      <FilterButton
                        activeStyle={smallButtonsStyle}
                        isActive
                        onPress={() => {
                          this.handleChange('walking');
                        }}
                      >
                        <Icon name="run" size={24} color="#fff" />
                      </FilterButton>
                    </View>
                    <View
                      style={{
                        position: 'relative',
                        top: 28,
                        zIndex: 5,
                      }}
                    >
                      <FilterButton
                        activeStyle={smallButtonsStyle}
                        isActive
                        onPress={() => {
                          this.handleChange('bicycling');
                        }}
                      >
                        <Icon name="bike" size={24} color="#fff" />
                      </FilterButton>
                    </View>
                  </View>
                </View>
              </TranslateYAndOpacity>
            ) : null}
            <TouchableOpacity
              style={this.state.isOpen ? openButtonStyle : buttonStyle}
              activeOpacity={0.7}
              onPress={this.handleClick}
            >
              <Icon
                name={this.getIcon()}
                size={this.state.isOpen ? 40 : 29}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </TranslateYAndOpacity>
      </View>
    );
  }
}
