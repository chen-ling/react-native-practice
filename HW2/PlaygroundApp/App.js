import NavigateBar from './components/NavigateBar';
import Footer from './components/Footer';
import Todos from './model/Todos';
import TodoItem from './components/TodoItem';
import React from 'react';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import { Button, Dimensions, FlatList, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

const { width } = Dimensions.get('window').width
const keyExtractor = (item, index) => index.toString();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: null,
    };
  }
  
  refreshFlatList = activeRowKey => {
    this.setState((prevState) => {
      return {
        activeKey: activeRowKey
      };
    });
  }

  onPressAdd = () => {
    this.refs.addModal.showAddModal();
    
  };

  onEditTodo = (item, index) => {
    this.refs.editModal.showEditModal(item, index);
  };

  deleteTodo = index => {
    Todos.splice(index, 1);
    this.refreshFlatList(index);
  };

  addTodo = item => {
    Todos.push(item);
    this.refreshFlatList(item.id);
  };

  editedTodo = item => {
    this.refreshFlatList(item.id);
  };

  render() {
    console.log('render flatlist');
    return (
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={require('./assets/images/list_bg.png')} />
        <NavigateBar title={'Todos'} />
        <FlatList
          ref={'flatList'}
          data={Todos}
          extraData={this.state}
          keyExtractor={keyExtractor}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          renderItem={
            ({ item, index }) => {
              return (
                <TodoItem item={item} index={index} onPressDelete={this.deleteTodo} onPressEdit={this.onEditTodo}></TodoItem>
              );
            }}
        />
        <View>
          <TouchableHighlight style={styles.footer} onPress={this.onPressAdd} underlayColor='burlywood'>
            <Image style={styles.icon} source={require('./assets/images/note_add.png')} />
          </TouchableHighlight>
        </View>
        <AddModal ref={'addModal'} addTodo={this.addTodo} ></AddModal>
        <EditModal ref={'editModal'} editTodo={this.editedTodo} ></EditModal>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
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
