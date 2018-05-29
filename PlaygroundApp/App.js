import NavigateBar from './components/NavigateBar';
import Footer from './components/Footer';
import todos from './model/todos';
import TodoItem from './components/TodoItem';
import React from 'react';
import AddModal from './components/AddModal';
import {Button, Dimensions,  FlatList, StyleSheet,Text,View,Image} from 'react-native';

const {width} = Dimensions.get('window').width
const keyExtractor = (item, index) => index.toString();

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeKey: null
    };
    this.onPressItem = this.onPressItem.bind(this);
  }
  refreshFlatList = activeRowKey => {
    this.setState((prevState) => {
      return {
        activeKey: activeRowKey
      };
    });
  }
  onPressItem = index => {
    this.refs.addModal.showAddModal();
  };

  deleteItem = index => {
    todos.splice(index, 1);
    this.refreshFlatList(index);
  };

  addTodo = item => {
    todos.push(item);
    this.refreshFlatList(item.key);
    console.log(item.key);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
        style={styles.backgroundImage}
        source={require('./assets/images/list_bg.png')}/>
        <NavigateBar title={'Todos'} />
        <FlatList
          data={todos}
          keyExtractor={keyExtractor}
          renderItem={
            ({item, index}) => {
              return (
                <TodoItem item={item} index={index} onDeleteItem={this.deleteItem} onPressItem={this.onPressItem}></TodoItem>
              );
            }}
        />
        <Footer ref={'footer'}/>
        <AddModal ref={'addModal'} addTodo={this.addTodo} ></AddModal>
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
  backgroundImage:{
    flex: 1,
    resizeMode: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});
