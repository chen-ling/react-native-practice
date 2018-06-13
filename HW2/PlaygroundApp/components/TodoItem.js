import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Image,ImageBackground } from 'react-native';
import Swipeout from 'react-native-swipeout';

const styles = StyleSheet.create({
  itemOuter:{
    marginTop: 25,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 5,
  },
  storeName: {
    paddingTop: 12,
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  backgroundImage: {
    height: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  avaliableTime: {
    paddingTop: 12,
    fontSize: 15,
    textAlign: 'right',
    position: 'absolute', 
    bottom: 5,
    right: 15,
    color:'white',
    shadowColor: '#000',
    shadowOffset: { width: 120, height: 30 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  avaliableTimeMask: {
    height: 50,
    flex:1,
    shadowColor: '#000',
    shadowOffset: { width: 120, height: 30 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  tags: {
    paddingTop: 5,
    fontSize: 15,
    color:'grey'
  },
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
    ];
    const tagsKey = this.props.item.tags.map(tag => 
        tag.key
    );
    console.log(tagsKey.join('.  '));
    
    return (
      // <Swipeout
      // style={styles.itemOuter}
      //   backgroundColor="transparent"
      //   right={swipeoutBtns}
      //   autoClose={true} >

<View style={styles.itemOuter}>
        <ImageBackground
          style={styles.backgroundImage}
          imageStyle={{resizeMode: 'cover'}}
          source={{uri: this.props.item.imageUrl}}
          borderRadius={5} >
          <View style={styles.avaliableTimeMask}>
          <Text style={styles.avaliableTime}>{this.props.item.estimatedDeliveryTime}</Text>
          </View>
          </ImageBackground>
          <Text style={styles.storeName}>{this.props.item.name}</Text>
          <Text style={styles.tags}>{tagsKey.join('. ')}</Text>
          </View>

    );
  }
}
