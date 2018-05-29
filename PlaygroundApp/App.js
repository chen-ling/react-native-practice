import NavigateBar from './components/NavigateBar';
import Footer from './components/Footer';
import todos from './model/todos';
import TodoItem from './components/TodoItem';
import React from 'react';
import AddModal from './components/AddModal';
import { Button, Dimensions, FlatList, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

const { width } = Dimensions.get('window').width
const keyExtractor = (item, index) => index.toString();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: null,
      refreshing: false
    };
  }
  refreshFlatList = activeRowKey => {
    this.setState((prevState) => {
      return {
        activeKey: activeRowKey
      };
    });
    console.log(activeRowKey);
  }
  onRefresh = () => {
    this.setState({ refreshing: true });
  }
  onStop = () => {
    this.setState({ refreshing: false });
  }

  onPressItem = index => {
    // this.onRefresh();
    // this.refs.addModal.showAddModal();
  };

  onPressAdd = () => {
    console.log('onPressAdd');
    // this.onRefresh();
    this.refs.addModal.showAddModal();
  };

  deleteTodo = index => {
    todos.splice(index, 1);
    this.refreshFlatList(index);
  };

  addTodo = item => {
    todos.push(item);
    this.refreshFlatList(item.key);
    // this.onStop();
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={require('./assets/images/list_bg.png')} />
        <NavigateBar title={'Todos'} />
        <FlatList
          ref={'flatList'}
          data={todos}
          extraData={this.state}
          keyExtractor={keyExtractor}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          renderItem={
            ({ item, index }) => {
              return (
                <TodoItem item={item} index={index} onDeleteTodo={this.deleteTodo} onPressItem={this.onPressItem}></TodoItem>
              );
            }}
        />
        <View>
          <TouchableHighlight style={styles.footer} onPress={this.onPressAdd} underlayColor='burlywood'>
            <Image style={styles.icon} source={require('./assets/images/note_add.png')} />
          </TouchableHighlight>
        </View>
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
