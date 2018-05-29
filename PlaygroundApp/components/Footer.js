import React from 'react';
import {Dimensions,Image,StyleSheet,TouchableHighlight,View,Text,TextInput} from 'react-native';
import {AddModal} from './AddModal';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import todos from '../model/todos';

var screen = Dimensions.get('window');

const styles = StyleSheet.create({
  footer:{
    height: 60,
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon:{
    height: 30,
    width:30,
  },
  modal:{
    height: screen.height,
    width: screen.width -60,
    justifyContent: 'center',
    borderRadius: 30,
    shadowRadius: 10,
    backgroundColor: 'gold',
  },
  title:{
    fontSize: 18,
    fontWeight:'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  inputText:{
    height:40,
    borderBottomColor: 'gray',
    fontSize: 18,
    margin: 40,
  },
  saveBotton:{
    fontSize: 18,
    color: 'white'
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
  constructor(props) {
    super(props);
  }
  showAddModal = () => {
    // this.setState({
      // modalVisible: visible
    // });
    this.refs.myModal.open();
  };
  render() {
    return (
      <View>
        <TouchableHighlight style={styles.footer} onPress={this.showAddModal} underlayColor='burlywood'>
          <Image style={styles.icon} source={require('../assets/images/note_add.png')} />
        </TouchableHighlight>
    </View>
    );
  }
}
