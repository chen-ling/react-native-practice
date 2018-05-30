import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import Swipeout from 'react-native-swipeout';

const styles = StyleSheet.create({
  itemText: {
    padding: 12,
    fontSize: 20,
    height: 50,
  }
});


export default class TodoItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number,
    onPressDelete: PropTypes.func,
    onPressEdit: PropTypes.func
  };

  onEditTodo = () => {
    this.props.onPressEdit(this.props.item, this.props.index);
  };

  deleteTodo = () => {
    this.props.onPressDelete(this.props.index);
  };

  render() {
    var swipeoutBtns = [
      {
        text: 'Edit', type: 'primary',
        onPress: () => {
          this.onEditTodo();
        }
      },
      {
        text: 'Delete',
        backgroundColor: 'red',
        type: 'delete',
        onPress: () => {
          Alert.alert(
            'Alert',
            'Are you sure you want to delete?',
            [
              { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'Yes', onPress: () => { this.deleteTodo() } },
            ],
            { cancelable: true }
          );
        },
      }
    ]
    return (
      <Swipeout
        backgroundColor="transparent"
        right={swipeoutBtns}
        autoClose={true} >

        <TouchableOpacity
          style={{ flex: 1, backgroundColor: this.props.index % 2 == 0 ? 'transparent' : '#dddcdcdc' }}>
          <Text style={styles.itemText}>{this.props.item.name}</Text>
        </TouchableOpacity>
      </Swipeout>

    );
  }
}
