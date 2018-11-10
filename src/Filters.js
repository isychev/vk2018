import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Easing,
  Animated,
  Button,
  ScrollView,
} from 'react-native';

export default class MapScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: 20,
          left: 0,
          backgroundColor: 'red',
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Button
            style={{
              flex: 1,
              flexWrap: 'nowrap',
            }}
            title="Press"
            color="#841584"
            accessibilityLabel="Press"
            onPress={() => {
              console.warn('was');
            }}
          />
          <Button
            style={{
              flex: 1,
              flexWrap: 'nowrap',
            }}
            title="Press"
            color="#841584"
            accessibilityLabel="Press"
            onPress={() => {
              console.warn('was');
            }}
          />
          <Button
            style={{
              flex: 1,
              flexWrap: 'nowrap',
            }}
            title="Press"
            color="#841584"
            accessibilityLabel="Press"
            onPress={() => {
              console.warn('was');
            }}
          />
          <Button
            style={{
              flex: 1,
              flexWrap: 'nowrap',
            }}
            title="Press"
            color="#841584"
            accessibilityLabel="Press"
            onPress={() => {
              console.warn('was');
            }}
          />
          <Button
            style={{
              flex: 1,
              flexWrap: 'nowrap',
            }}
            title="Press"
            color="#841584"
            accessibilityLabel="Press"
            onPress={() => {
              console.warn('was');
            }}
          />
        </View>
      </View>
    );
  }
}
