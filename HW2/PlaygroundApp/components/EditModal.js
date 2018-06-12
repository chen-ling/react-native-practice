import {mockBrands} from '../model/seeds';
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
    textAlign: 'center',
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

export default class EditModal extends React.Component {
  static propTypes = {
    editTodo: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      index: null,
      todoDescription: '',
    };
  }
  showEditModal = (todo, index) => {
    this.setState({
      index: index,
      name: todo.name,
      todoDescription: todo.description,
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
        <TextInput style={styles.inputDescText}
          onChangeText={(text) => this.setState({ todoDescription: text })}
          placeholder="Description"
          value={this.state.todoDescription} />
        <Button style={styles.saveBotton}
          containerStyle={styles.saveBottonContainer}
          onPress={() => {
            if (this.state.name.length == 0 || this.state.todoDescription.length == 0) {
              Alert.alert('You must enter todo and description');
              return;
            }
            mockBrands[this.state.index].name = this.state.name;
            mockBrands[this.state.index].description = this.state.todoDescription;
            this.props.editTodo(mockBrands[this.state.index]);
            this.refs.myEditModal.close();
            this.setState({ name: '' });
          }}>Save</Button>
      </Modal>
    );
  }
}
