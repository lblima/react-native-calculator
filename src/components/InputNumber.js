//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
class InputNumber extends Component {
    render() {
        const { value } = this.props;
        const { container, textStyle } = styles;

        return (
            <TouchableOpacity style={container}>
                <Text style={textStyle}>{value}</Text>        
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    textStyle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    }
});

//make this component available to the app
export default InputNumber;
