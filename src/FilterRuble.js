import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FilterButton from './FilterButton';

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
      isOpen: true,
    };
  }
  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    return (
      <View>
        {this.state.isOpen ? (
          <View
            style={{
              position: 'absolute',
              top: -95,
              left: -60,
              width: 190,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  position: 'relative',
                  top: 28,
                }}
              >
                <FilterButton
                  activeStyle={smallButtonsStyle}
                  isActive
                  onPress={() => {
                    // this.setField('work', !work);
                  }}
                >
                  <Icon name="dollar" size={18} color="#fff" />
                </FilterButton>
              </View>
              <View>
                <FilterButton
                  activeStyle={smallButtonsStyle}
                  isActive
                  onPress={() => {
                    // this.setField('work', !work);
                  }}
                >
                  <Icon name="ruble" size={18} color="#fff" />
                </FilterButton>
              </View>
              <View
                style={{
                  position: 'relative',
                  top: 28,
                }}
              >
                <FilterButton
                  activeStyle={smallButtonsStyle}
                  isActive
                  onPress={() => {
                    // this.setField('work', !work);
                  }}
                >
                  <Icon name="euro" size={18} color="#fff" />
                </FilterButton>
              </View>
            </View>
          </View>
        ) : null}
        <TouchableOpacity
          style={this.state.isOpen ? openButtonStyle : buttonStyle}
          activeOpacity={0.7}
          onPress={this.handleClick}
        >
          <Icon name="ruble" size={this.state.isOpen ? 40 : 29} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}
