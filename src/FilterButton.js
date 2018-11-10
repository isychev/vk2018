import React from 'react';
import { TouchableOpacity } from 'react-native';

const buttonStyle = {
  padding: 20,
  backgroundColor: '#fff',
  borderRadius: 50,
  borderWidth: 1,
  borderColor: '#fff',
};

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#e35205',
  borderColor: '#e35205',
};

const FilterButton = ({
  children,
  isActive,
  onPress,
  activeStyle = {},
  style = {},
}) => (
  <TouchableOpacity
    style={
      isActive
        ? { ...activeButtonStyle, ...activeStyle }
        : { ...buttonStyle, ...style }
    }
    activeOpacity={0.7}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

export default FilterButton;
