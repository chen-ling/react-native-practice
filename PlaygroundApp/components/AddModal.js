import todos from '../model/todos';
import React from 'react';
import {Dimensions,StyleSheet,Text,View,TextInput,Alert} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import PropTypes from 'prop-types';

var screen = Dimensions.get('window');

const styles = StyleSheet.create({
  modal:{
    height: screen.height/2,
    width: screen.width -60,
    justifyContent: 'center',
    borderRadius: 30,
    shadowRadius: 10,
    backgroundColor: 'white',
  },
  title:{
    fontSize: 28,
    fontWeight:'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  inputText:{
    height:40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    fontSize: 18,
    margin: 40,
  },
  saveBotton:{
    fontSize: 18,
    color: 'black'
  },
  saveBottonContainer:{
    padding: 8,
    marginLeft: 70,
    marginRight: 70,
    height: 40,
    backgroundColor: 'yellow',
    borderRadius: 6,
  }
});

export default class Footer extends React.Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  };
  constructor(props){
    super(props);
    this.state = {
      newTodo: '',
    };
  }
  generateKey = (numberOfCharacters) => {
    return require('random-string')({length: numberOfCharacters});
  }
  showAddModal = () => {
    this.refs.myModal.open();
  };
  render() {
    return (
      <Modal ref={'myModal'} style={styles.modal} position='center'>
        <Text style={styles.title}>Add Todo</Text>
        <TextInput style={styles.inputText}
          onChangeText={(text) => this.setState({newTodo: text})}
          placeholder="Enter todo"
          value={this.state.newTodo}/>
          <Button style={styles.saveBotton}
            containerStyle={styles.saveBottonContainer}
            onPress={()=>{
              if(this.state.newTodo.length ==0){
                Alert.alert('You must enter todo');
                return;
              }
              const newTodo = {
                key: this.generateKey(6),
                name: this.state.newTodo
              }
              this.props.addTodo(newTodo);

              // todos.push(newTodo);
              // this.props.parentFlatList.refreshFlatList(newTodo.key);
              this.setState({newTodo: ''});
              this.refs.myModal.close();
            }}>Save</Button>
      </Modal>
    );
  }
}
