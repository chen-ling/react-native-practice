import Todos from '../model/Todos';
import React from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import PropTypes from 'prop-types';

var screen = Dimensions.get('window');

const styles = StyleSheet.create({
  modal: {
    height: screen.height / 2,
    width: screen.width - 60,
    justifyContent: 'center',
    borderRadius: 30,
    shadowRadius: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  inputText: {
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    fontSize: 18,
    margin: 40,
  },
  saveBotton: {
    fontSize: 18,
    color: 'black'
  },
  saveBottonContainer: {
    padding: 8,
    marginLeft: 70,
    marginRight: 70,
    height: 40,
    backgroundColor: 'yellow',
    borderRadius: 6,
  }
});

export default class EditModal extends React.Component {
  static propTypes = {
    editTodo: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      index: null,
    };
  }
  showEditModal = (todo, index) => {
    this.setState({
      index: index,
      name: todo.name,
    });
    this.refs.myEditModal.open();
  };
  render() {
    return (
      <Modal ref={'myEditModal'} style={styles.modal} position='center'>
        <Text style={styles.title}>Edit Todo</Text>
        <TextInput style={styles.inputText}
          onChangeText={(text) => this.setState({ name: text })}
          placeholder="Edit todo"
          value={this.state.name} />
        <Button style={styles.saveBotton}
          containerStyle={styles.saveBottonContainer}
          onPress={() => {
            if (this.state.name.length == 0) {
              Alert.alert('You must enter todo');
              return;
            }
            Todos[this.state.index].name = this.state.name;
            this.props.editTodo(Todos[this.state.index]);
            this.refs.myEditModal.close();
            this.setState({ name: '' });
          }}>Save</Button>
      </Modal>
    );
  }
}
