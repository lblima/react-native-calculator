import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import InputNumber from './components/InputNumber';

const buttonsLayout = [
  ['CLEAR', 'DEL'],
  ['7', '8', '9', '/'],
  ['4', '5', '6', 'x'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+']
];

export default class App extends Component {
  renderButtons() {
    let layouts = buttonsLayout.map((buttonRow, index) => {
      let rowItem = buttonRow.map((buttonItem, buttonIndex) => {
        return <InputNumber key={'btn-' + buttonIndex} value={buttonItem} />
      });

      return <View style={styles.inputRow} key={'row-' + index}>{rowItem}</View>
    });

    return layouts;
  }

  render() {
    const { container, 
            resultContainer, 
            inputContainer, 
            resultText } = styles;

    return (
      <View style={container}>
        <View style={resultContainer}>
          <Text style={resultText}>{0}</Text>
        </View>

        <View style={inputContainer}>
          {this.renderButtons()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultContainer: {
    flex: 2,
    backgroundColor: '#1E1240',
    justifyContent: 'center'
  },
  inputContainer: {
    flex: 8,
    backgroundColor: '#3D0075'
  },
  resultText: {
    color: 'white',
    fontSize: 80,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'right'
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row'
  }
});
