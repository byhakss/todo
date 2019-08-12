import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  AsyncStorage,
  Platform
} from "react-native";

import { AppLoading } from "expo";
import Todo from "./Todo";
import uuidv1 from "uuid/v1";

const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newTodo: "",
    loadedToDos: false,
    toDos: {}
  };

  componentDidMount = () => {
    this._loadTodos();
  };

  render() {
    const { newTodo, loadedToDos, toDos } = this.state;

    if (!loadedToDos) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>To Do List - Byhaks</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"할일"}
            placeholderTextColor={"#999"}
            value={newTodo}
            onChangeText={this._controllNewTodo}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addTodo}
            underlineColorAndroid={"transparent"}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos)
              .reverse()
              .map(toDo => (
                <Todo
                  key={toDo.id}
                  deleteTodo={this._deleteTodo}
                  uncompleteTodo={this._uncompleteTodo}
                  completeTodo={this._completeTodo}
                  updateTodo={this._updateTodo}
                  {...toDo}
                />
              ))}
          </ScrollView>
        </View>
      </View>
    );
  }

  _controllNewTodo = text => {
    this.setState({
      newTodo: text
    });
  };

  _loadTodos = async () => {
    try {
      const toDos = await AsyncStorage.getItem("toDos");
      const jsontoDos = JSON.parse(toDos);
      console.log(toDos);

      this.setState({
        loadedToDos: true,
        toDos: jsontoDos || {}
      });
    } catch (e) {
      console.log(e);
    }
  };

  _addTodo = () => {
    const { newTodo } = this.state;
    if (newTodo !== "") {
      this.setState({
        newTodo: ""
      });

      this.setState(prevState => {
        const ID = uuidv1();
        const newTodoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newTodo,
            createAt: Date.now()
          }
        };

        const newState = {
          ...prevState,
          newTodo: "",
          toDos: {
            ...prevState.toDos,
            ...newTodoObject
          }
        };
        this._saveTodo(newState.toDos);
        return { ...newState };
      });
    }
  };

  _deleteTodo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      this._saveTodo(newState.toDos);
      return { ...newState };
    });
  };

  _uncompleteTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      };
      this._saveTodo(newState.toDos);
      return { ...newState };
    });
  };

  _completeTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      };
      this._saveTodo(newState.toDos);
      return { ...newState };
    });
  };

  _updateTodo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: { ...prevState.toDos[id], text: text }
        }
      };
      this._saveTodo(newState.toDos);
      return { ...newState };
    });
  };

  _saveTodo = newTodos => {
    console.log(JSON.stringify(newTodos));
    const saveTodo = AsyncStorage.setItem("toDos", JSON.stringify(newTodos));
    if (saveTodo !== null) {
      // We have data!!
      console.log(saveTodo);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50",
    alignItems: "center"
    //justifyContent: 'center',
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 70,
    marginBottom: 50,
    fontWeight: "400"
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bdc3c7",
    borderBottomWidth: 0.5,
    fontSize: 20
  },
  toDos: {
    alignItems: "center"
  }
});
