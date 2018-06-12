import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  barView: {
    height: 74,
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    color: '#fff',
    marginTop: 20,
    fontSize: 28.0,
    fontWeight: 'bold',
  },
});

export default class NavigateBar extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <View style={styles.barView}>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    );
  }
}
