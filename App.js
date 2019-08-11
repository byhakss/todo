import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import Todo from './Todo';

const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    newTodo: '',
    loadedToDos: false,
    toDos: {},
  };

  render() {
    const { newTodo, loadedToDos, toDos } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>To Do List - Byhaks</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={'할일'}
            placeholderTextColor={'#999'}
            value={newTodo}
            onChangeText={this._controllNewTodo}
            returnKeyType={'done'}
            autoCorrect={false}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <Todo text={'test items'} />
          </ScrollView>
        </View>
      </View>
    );
  }

  _controllNewTodo = text => {
    this.setState({
      newTodo: text,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 70,
    marginBottom: 50,
    fontWeight: '400',
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  input: {
    padding: 20,
    borderBottomColor: '#bdc3c7',
    borderBottomWidth: 0.5,
    fontSize: 20,
  },
  toDos: {
    alignItems: 'center',
  },
});
