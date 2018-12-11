import React, { Component } from 'react';

import './App.scss';

class App extends Component {
  state = {
    inputValue: '0',
    outputDisplay: '',
    equal: false
  }

  equalClickedHandler = () => {
    this.inputValueHandler('='); // updates the display with = sign

    const opsRegex = /\+|-|\*|\//gm; // Operators regex

    const ops = { // functions applying the operators
      '+': (a, b) => a + b, 
      '-': (a, b) => a - b, 
      '*': (a, b) => a * b, 
      '/': (a, b) => a / b, 
    };

    const checkEqual = this.state.equal; 

    const outputDisplay = this.state.outputDisplay.slice(); 

    const operatorExistArray = outputDisplay.match(opsRegex);

    let positionOperator = outputDisplay.search(opsRegex); 

    let currentOperator = outputDisplay[positionOperator]; 

    let firstNum = parseFloat(outputDisplay.substring(0,positionOperator));

    let secondNum = parseFloat(outputDisplay.substring(positionOperator+1));

    let result;
    if (currentOperator === '+'){
      result = (ops['+'](firstNum,secondNum));
    }
    else if (currentOperator === '-'){
      result = (ops['-'](firstNum,secondNum));
    }
    else if (currentOperator === '*'){
      result = (ops['*'](firstNum,secondNum));
    }
    else if (currentOperator === '/'){
      result = (ops['/'](firstNum,secondNum));
    }

    this.setState({ 
      equal: !checkEqual,
      inputValue: result, 
      outputDisplay: outputDisplay + '=' + result 
    })
  }

  inputValueHandler = (e) => {
    const outputDisplay = this.state.outputDisplay.slice();

    if (!this.state.equal){
      if (outputDisplay[0] === '0'){
        outputDisplay.slice(1);
      }
      this.setState({ 
        outputDisplay: outputDisplay + e,
        inputValue: e
      })
    } else {
      this.setState({ 
        outputDisplay: e,
        inputValue: e,
        equal: false
      })
    }
  }

  negativePositiveHandler = (num) => {
    this.setState({ inputValue: -num })
    console.log('you clicked +/-: ' + num)
  }

  resetHandler = () => this.setState({ outputDisplay: [] , inputValue: 0});

  render() {
    return (
      <div className="App">
        <div id="calculator">
          <div id="display-flex">
            <span id="output">{this.state.outputDisplay}</span>
            <span id="display">{this.state.inputValue}</span>
          </div>
            
          <div id="pad">
            <button id="clear" className="dark" onClick={this.resetHandler}>AC</button>
            <button id="plus-negative" className="dark" onClick={() => this.negativePositiveHandler(this.state.inputValue)}>+/-</button>
            <button id="percentage" className="dark">%</button>
            <button id="divide" onClick={ () => this.inputValueHandler('/')}>/</button>
            <button id="seven" className="number" onClick={ () => this.inputValueHandler('7')}>7</button>
            <button id="eight" className="number" onClick={ () => this.inputValueHandler('8')}>8</button>
            <button id="nine" className="number" onClick={ () => this.inputValueHandler('9')}>9</button>
            <button id="multiply" onClick={ () => this.inputValueHandler('*')}>X</button>
            <button id="four" className="number" onClick={ () => this.inputValueHandler('4')}>4</button> 
            <button id="five" className="number" onClick={ () => this.inputValueHandler('5')}>5</button>
            <button id="six" className="number" onClick={ () => this.inputValueHandler('6')}>6</button>
            <button id="subtract" onClick={ () => this.inputValueHandler('-')}>-</button>
            <button id="one" className="number" onClick={ () => this.inputValueHandler('1')}>1</button>
            <button id="two" className="number" onClick={ () => this.inputValueHandler('2')}>2</button>
            <button id="three" className="number" onClick={ () => this.inputValueHandler('3')}>3</button>
            <button id="add" onClick={ () => this.inputValueHandler('+')}>+</button>
            <button id="zero" className="number" onClick={ () => this.inputValueHandler('0')}>0</button>
            <button id="decimal" className="number" onClick={ () => this.inputValueHandler('.')}>.</button>
            <button id="equals" onClick={this.equalClickedHandler}>=</button>
          </div>

        </div>
        <span id="author">Designed and Coded by <a href="https://alexdisdier.fr" target="_blank" rel="noopener noreferrer">Alex Disdier</a></span>
      </div>
    );
  }
}

export default App;
