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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import {
  TranslateYAndOpacity,
  SharedElement,
  SharedElementRenderer,
  ScaleAndOpacity,
} from 'react-native-motion';

import ButtonRun from './ButtonRun';
import FilterButton from './FilterButton';
import FilterRuble from './FilterRuble';

const deviceWidth = Dimensions.get('window').width;

const buttonStyle = {
  padding: 20,
  backgroundColor: '#fff',
  borderRadius: 50,
  borderWidth: 1,
  borderColor: '#eee',
};
const buttonStyle2 = {
  paddingTop: 19,
  paddingRight: 22,
  paddingBottom: 19,
  paddingLeft: 22,
};

export default class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shop: true,
      paypass: false,
      currency: 'rub',
      work: true,
      take: true,
    };
  }

  setField = (fieldName, value) => {
    const newState =  {
      ...this.state,
      [fieldName]: value,
    };
    this.setState(newState,
      () => {
        if (this.props.onChange) {
          this.props.onChange(newState);
        }
      },
    );
  };
  render() {
    const { shop, paypass, currency, work, take } = this.state;
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: 50,
          left: 0,
          width: deviceWidth,
          // backgroundColor: 'red',
        }}
      >
        <TranslateYAndOpacity
          startOnDidMount
          duration={2000}
          translateYMin={50}
        >
          <View
            style={{
              flex: 1,
              width: deviceWidth,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <FilterButton
              isActive={shop}
              onPress={() => {
                this.setField('shop', !shop);
              }}
            >
              <Icon
                name="shopping-cart"
                size={30}
                color={shop ? '#fff' : '#e35205'}
              />
            </FilterButton>
            <FilterButton
              isActive={paypass}
              onPress={() => {
                this.setField('paypass', !paypass);
              }}
            >
              <Icon
                name="tap-and-play"
                size={30}
                color={paypass ? '#fff' : '#e35205'}
              />
            </FilterButton>
            <FilterRuble />
            <FilterButton
              isActive={work}
              onPress={() => {
                this.setField('work', !work);
              }}
            >
              <Icon name="update" size={30} color={work ? '#fff' : '#e35205'} />
            </FilterButton>
            <FilterButton
              isActive={take}
              onPress={() => {
                this.setField('take', !take);
              }}
            >
              <Icon
                name="import-export"
                size={30}
                color={take ? '#fff' : '#e35205'}
              />
            </FilterButton>
          </View>
        </TranslateYAndOpacity>
      </View>
    );
  }
}
