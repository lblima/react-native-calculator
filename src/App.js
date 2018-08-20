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
  constructor() {
    super();

    this.initalState = {
      displayValue: '0',
      operator: null
    }
    
    this.state = this.initalState;
  }

  onButtonPress(value) {
    const { displayValue, operator } = this.state;

    switch (value) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.setState({
          operator: null,
          displayValue: displayValue === '0' ? value : displayValue + value
        });
        break;
      case '-':
      case '+':
      case '/':
      case 'x':
        this.setState({
          operator: value,
          displayValue: (operator !== null ? displayValue.substr(0, displayValue.length - 1) : displayValue) + value
        });
        break;
      case '.':
        let dot = displayValue.slice(-1);

        this.setState({
          operator: null,
          displayValue: dot !== '.' ? displayValue + value : displayValue
        });
        break;
    }   
  }

  renderButtons() {
    let layouts = buttonsLayout.map((buttonRow, index) => {
      let rowItem = buttonRow.map((buttonItem, buttonIndex) => {
        return <InputNumber 
                    key={'btn-' + buttonIndex} 
                    value={buttonItem} 
                    onButtonPress={this.onButtonPress.bind(this, buttonItem)} 
                />
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
          <Text style={resultText}>{this.state.displayValue}</Text>
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
    fontSize: 65,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'right'
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row'
  }
});
