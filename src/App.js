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
      operator: null,
      firstValue: '',
      secondValue: '',
      hasNextValue: false
    }
    
    this.state = this.initalState;
  }

  onButtonPress(value) {
    const { displayValue, operator, hasNextValue, firstValue, secondValue } = this.state;

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
          displayValue: displayValue === '0' ? value : displayValue + value
        });

        if (hasNextValue) 
          this.setState({ secondValue: secondValue + value });
        else
          this.setState({ firstValue: firstValue + value });

        break;
      case '-':
      case '+':
      case '/':
      case 'x':
        if (hasNextValue) {
          let result = eval(firstValue + operator + secondValue);

          this.setState({
            displayValue: result.toString() + value,
            firstValue: result,
            secondValue: '',
            operator: value === 'x' ? '*' : value
          });
        }
        else {
          this.setState({
            operator: value === 'x' ? '*' : value,
            hasNextValue: true,
            displayValue: (operator !== null ? displayValue.substr(0, displayValue.length - 1) : displayValue) + value
          });
        }
        
        break;
      case '.':
        let dot = displayValue.slice(-1);

        this.setState({
          operator: null,
          displayValue: dot !== '.' ? displayValue + value : displayValue
        });

        if (hasNextValue) 
          this.setState({ secondValue: secondValue + value });
        else
          this.setState({ firstValue: firstValue + value });

        break;
      case 'CLEAR':
        this.setState(this.initalState);
        break;
      case 'DEL':
        let deleteString = displayValue.toString().substr(0, displayValue.length - 1);

        if (deleteString === '')
          deleteString = '0';

        this.setState({
            displayValue: deleteString
        });

        break;
      case '=':
        let result = eval(firstValue + operator + secondValue);

        this.setState({
          displayValue: result,
          firstValue: '',
          secondValue: '',
          hasNextValue: false,
          operator: null
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
