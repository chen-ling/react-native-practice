import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Image, StyleSheet, TouchableHighlight, View } from 'react-native';

var screen = Dimensions.get('window');

const styles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 30,
    width: 30,
  }
});

export default class Footer extends React.Component {
  static propTypes = {
    onPressAdd: PropTypes.func
  };

  onPressIcon = () => {
    this.props.onPressAdd();
  };
  render() {
    return (
      <View>
        <TouchableHighlight style={styles.footer} onPress={this.onPressIcon} underlayColor='burlywood'>
          <Image style={styles.icon} source={require('../assets/images/note_add.png')} />
        </TouchableHighlight>
      </View>
    );
  }
}
