import NavigateBar from './components/NavigateBar';
import Footer from './components/Footer';
import {mockBrands} from './model/seeds';
import TodoItem from './components/TodoItem';
import React from 'react';
import EditModal from './components/EditModal';
import { Button, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';

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
    mockBrands.splice(index, 1);
    this.refreshFlatList(index);
  };

  addTodo = item => {
    mockBrands.push(item);
    this.refreshFlatList(item.id);
  };

  editedTodo = item => {
    this.refreshFlatList(item.id);
  };

  render() {
    console.log('render flatlist');
    return (
      <View style={styles.container}>
        <NavigateBar title={'Todos'} />
        <FlatList
          ref={'flatList'}
          data={mockBrands}
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
