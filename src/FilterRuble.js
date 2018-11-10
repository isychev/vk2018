import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
  paddingTop: 35,
  paddingRight: 40,
  paddingBottom: 35,
  paddingLeft: 40,
  marginTop: -20,
  marginBottom: -20,
  marginLeft: -20,
  marginRight: -20,
};

const smallButtonsStyle = {
  paddingTop: 19,
  paddingRight: 22,
  paddingBottom: 19,
  paddingLeft: 22,
};

export default class FilterRuble extends React.Component {
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
    if (value === 'rub') {
      return 'ruble';
    }
    if (value === 'usd') {
      return 'dollar';
    }
    if (value === 'eur') {
      return 'euro';
    }
    return 'ruble';
  };

  render() {
    return (
      <View
        style={{
          zIndex: 5,
          padding: this.state.isOpen ? 100 : 0,
          margin: this.state.isOpen ? -100 : 0,
          // backgroundColor: '#fff',
        }}
      >
        {this.state.isOpen ? (
          <TranslateYAndOpacity
            startOnDidMount
            translateYMin={50}
          >
          <View
            style={{
              position: 'absolute',
              top: -110,
              left: -56,
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
                    this.handleChange('usd');
                  }}
                >
                  <Icon name="dollar" size={18} color="#fff" />
                </FilterButton>
              </View>
              <View style={{ zIndex: 5 }}>
                <FilterButton
                  activeStyle={smallButtonsStyle}
                  isActive
                  onPress={() => {
                    this.handleChange('rub');
                  }}
                >
                  <Icon name="ruble" size={18} color="#fff" />
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
                    this.handleChange('eur');
                  }}
                >
                  <Icon name="euro" size={18} color="#fff" />
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
    );
  }
}
