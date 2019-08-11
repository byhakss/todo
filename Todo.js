import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

export default class Todo extends Component {
  state = {
    isEditing: false,
    isCompleted: false,
    toDoValue: '',
  };

  /*
  static propTypes = {
    toDoValue: PropTypes.string.isRequired,
  };*/

  render() {
    const { isCompleted, isEditing, toDoValue } = this.state;
    const { text } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle,
              ]}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={toDoValue}
              multiline={true}
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText,
              ]}
            >
              {text}
            </Text>
          )}
        </View>
        <View style={styles.column}>
          {isEditing ? (
            <View style={styles.actions}>
              <TouchableOpacity onPressOut={this._finishEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>✔</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.actions}>
              <TouchableOpacity onPressOut={this._startEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>🖊️</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._toggleComplete}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>❌</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }

  _toggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted,
      };
    });
  };

  _startEditing = () => {
    const text = this.props;

    this.setState({
      isEditing: true,
      toDoValue: text,
    });
  };

  _finishEditing = () => {
    this.setState({
      isEditing: false,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20,
  },
  completedCircle: {
    borderColor: '#bbb',
  },
  uncompletedCircle: {
    borderColor: '#F23657',
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 20,
  },
  completedText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  uncompletedText: {
    color: '#353839',
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2,
  },
  actions: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    width: width / 2,
    marginVertical: 15,
    paddingBottom: 5,
  },
});