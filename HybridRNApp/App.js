/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, NativeModules, TouchableHighlight} from 'react-native';
import AndroidTextView from './AndroidTextView';

const androidNativeModule = NativeModules.AndroidNativeModule;


export default class App extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Title'
    };
  }

  componentDidMount() {
    console.log('componentDidMount!');
    androidNativeModule.passStringBackToRN(str => {
      this.setState({ title: str });
    });
  }

  passStringtoNative = () => {
      androidNativeModule.getStringFromReactNative('String from ReactNative');
      androidNativeModule.jumpToNativeView();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>{this.state.title}</Text>
        <AndroidTextView style={{ width: 60, height: 50 }} title="XDDDDD" />
        <TouchableHighlight onPress={() => {this.passStringtoNative()}}>
          <Text style={styles.instructions}>Pass string to Native</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
