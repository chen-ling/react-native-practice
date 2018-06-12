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
    marginTop: 10,
  },
  inputText: {
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    fontSize: 18,
    margin: 20,
  },
  inputDescText: {
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    fontSize: 18,
    marginRight: 20,
    marginLeft: 20,
  },
  saveBotton: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  saveBottonContainer: {
    padding: 8,
    marginLeft: 60,
    marginRight: 60,
    height: 40,
    backgroundColor: 'gold',
    borderRadius: 6,
    marginTop: 30,
  }
});

export default class AddModal extends React.Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      todoDescription: '',
    };
  }
  generateKey = (numberOfCharacters) => {
    return require('random-string')({ length: numberOfCharacters });
  }
  showAddModal = () => {
    this.refs.myModal.open();
  };
  render() {
    return (
      <Modal ref={'myModal'} style={styles.modal} position='center'>
        <Text style={styles.title}>Add Todo</Text>
        <TextInput style={styles.inputText}
          onChangeText={(text) => this.setState({ newTodo: text })}
          placeholder="Todo"
          value={this.state.newTodo} />
        <TextInput style={styles.inputDescText}
          onChangeText={(text) => this.setState({ todoDescription: text })}
          placeholder="Description"
          value={this.state.todoDescription} />
        <Button style={styles.saveBotton}
          containerStyle={styles.saveBottonContainer}
          onPress={() => {
            if (this.state.newTodo.length == 0) {
              Alert.alert('You must enter todo');
              return;
            }
            const newTodo = {
              id: this.generateKey(6),
              name: this.state.newTodo,
              description: this.state.todoDescription,
            }
            this.refs.myModal.close();
            this.props.addTodo(newTodo);
            this.setState({ newTodo: '' });
          }}>Save</Button>
      </Modal>
    );
  }
}
