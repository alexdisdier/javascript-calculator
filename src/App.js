import React, { Component } from 'react';

import './App.scss';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentValue: '', 
      previousValue: '0',  
      currentSign: '',
      lastClicked: '',
      computingDisplay: '',
      currentDisplay: '0',
      hasSign: false,
      decimal: false
    }

    this.operatorsHandler = this.operatorsHandler.bind(this);
    this.numbersHandler = this.numbersHandler.bind(this);
    this.decimalHandler = this.decimalHandler.bind(this);
    this.percentageHandler = this.percentageHandler.bind(this);
    this.negativePositiveHandler = this.negativePositiveHandler.bind(this);
    this.computeHandler = this.computeHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
  }

  // My methods 
  // In case there are errors, I should display the message on calculator. 

  operatorsHandler = (event) => {
    if (this.state.lastClicked === ' = '){
      const temp = this.state.currentDisplay // result of computation
      this.setState({
        currentValue: temp,
        currentSign: event.target.value,
        lastClicked: event.target.value,
        currentDisplay: event.target.value,
        computingDisplay: temp + event.target.value,
        hasSign: true
      })
    } else {
      this.setState({
        currentSign: event.target.value,
        lastClicked: event.target.value,
        currentDisplay: event.target.value,
        computingDisplay: this.state.computingDisplay + event.target.value,
        hasSign: true
      })
    }
  }

  numbersHandler = (event) => {
    // const opsRegex = /\+|-|\*|\//gm; 
  
    this.setState ({
      hasSign: false
    })

    if (this.state.lastClicked === ' = '){ // end of computation
      this.setState({
        currentValue: event.target.value,
        currentSign: '',
        lastClicked: event.target.value,
        computingDisplay: event.target.value,
        currentDisplay: event.target.value
      })
    }
    else if (!this.state.hasSign){ // start of computation
      this.setState({
        currentValue: this.state.currentValue + event.target.value,
        lastClicked: event.target.value,
        currentDisplay: this.state.currentValue + event.target.value,
        computingDisplay: this.state.computingDisplay + event.target.value
      })
    }
    else if (this.state.hasSign){
      this.setState({
        previousValue: this.state.currentValue,
        currentValue: event.target.value,
        lastClicked: event.target.value,
        currentDisplay: event.target.value,
        computingDisplay: this.state.computingDisplay + event.target.value
      })
    } else {
      this.setState({
        previousValue: this.state.currentValue,
        currentValue: event.target.value,
        lastClicked: event.target.value,
        currentDisplay: event.target.value,
        computingDisplay: this.state.computingDisplay + event.target.value
      })
    }
  }

  decimalHandler = (event) => {
    // should add the decimal lastclicked if it is number, otherwise it creates automatically 0,
    const lastValue = this.state.currentValue;

    if (this.state.hasSign || this.state.computingDisplay === '') {
      this.setState({
        currentValue: '0' + event.target.value,
        previousValue: lastValue,
        currentDisplay: '0' + event.target.value,
        computingDisplay: this.state.computingDisplay + '0' + event.target.value,
        hasSign: false
      })
    } else {
      this.setState({
        currentValue: lastValue + event.target.value,
        currentDisplay: lastValue + event.target.value,
        computingDisplay: this.state.computingDisplay + event.target.value
      })
    }
  }

  percentageHandler = (event) => {
    // console.log(event.target.value);
    this.setState({
      currentValue: event.target.value,
      currentDisplay: event.target.value
    })
  }

  negativePositiveHandler = (event) => {
    // console.log(event.target.value);
    const negativePositive = -this.state.currentValue;

    const isNegative = Math.sign(parseFloat(this.state.currentValue)) === 1;

    if (this.state.currentSign === " + " && isNegative) {
      this.setState({
        currentValue: negativePositive,
        currentDisplay: negativePositive,
        currentSign: ' + ',
        computingDisplay: this.state.previousValue + ' - ' + this.state.currentValue
      })

    } else if (this.state.currentSign === " - " || !isNegative) {
      this.setState({
        currentValue: negativePositive,
        currentDisplay: negativePositive,
        computingDisplay: this.state.previousValue + ' + ' + Math.abs(parseFloat(this.state.currentValue))
      })

    } 
    
    else if (this.state.currentSign) {
      this.setState({
        currentValue: negativePositive,
        currentDisplay: negativePositive,
        computingDisplay: this.state.previousValue + this.state.currentSign + negativePositive
      })

    } 
    
    else if (this.state.lastClicked === ' = '){
      const currentValue = this.state.currentdisplay;
      // const negativePositive = -this.state.currentValue;
      console.log(currentValue);
      this.setState({
        currentValue: '-' + currentValue,
        currentDisplay: '-' + currentValue,
        computingDisplay: '-' + currentValue,
      })
    }
    
    else {
      this.setState({
        currentValue: negativePositive,
        currentDisplay: negativePositive,
        computingDisplay: negativePositive
      })
    }
  }

  computeHandler = (event) => {
    // Operators regex
    // const opsRegex = /\+|-|\*|\//gm; 
    //test
      // const computeArray = this.state.computingDisplay.split(' ');
      // console.log(computeArray);
    //end test

    let result;

    if (this.state.currentSign === ' + '){
      result = parseFloat(this.state.previousValue) + parseFloat(this.state.currentValue);

    } else if (this.state.currentSign === ' - '){
      result = parseFloat(this.state.previousValue) - parseFloat(this.state.currentValue);

    } else if (this.state.currentSign === ' * '){
      result = parseFloat(this.state.previousValue) * parseFloat(this.state.currentValue);

    } else if (this.state.currentSign === ' / '){
      result = parseFloat(this.state.previousValue) / parseFloat(this.state.currentValue);
    }

    this.setState({
      currentValue: '',
      currentDisplay: result,
      currentSign: '',
      previousValue: this.state.currentValue,
      lastClicked: event.target.value,
      computingDisplay: this.state.computingDisplay + ' = ' + result
    })
  }

  resetHandler = () => {
    this.setState({
      currentValue: '',
      previousValue: '0',
      currentSign: '',
      lastClicked: 'AC',
      computingDisplay: '',
      currentDisplay: '0'
    })
  }

  render() {
    return (
      <div className="App">
        <div id="calculator">
          <div id="display-flex">
            <span id="output">{this.state.computingDisplay}</span>
            <span id="display">{this.state.currentDisplay}</span>
          </div>
            
          <div id="pad">
            <button id="clear" className="dark" onClick={this.resetHandler}>AC</button>
            <button id="plus-negative" value="+/-" className="dark" onClick={this.negativePositiveHandler}>+/-</button>
            <button id="percentage" value="%" className="dark" onClick={this.percentageHandler}>%</button>
            <button id="divide" value=" / " onClick={this.operatorsHandler}>/</button>
            <button id="seven" value="7" className="number" onClick={this.numbersHandler}>7</button>
            <button id="eight" value="8" className="number" onClick={this.numbersHandler}>8</button>
            <button id="nine" value="9" className="number" onClick={this.numbersHandler}>9</button>
            <button id="multiply" value=" * " onClick={this.operatorsHandler}>x</button>
            <button id="four" value="4" className="number" onClick={this.numbersHandler}>4</button> 
            <button id="five" value="5" className="number" onClick={this.numbersHandler}>5</button>
            <button id="six" value="6" className="number" onClick={this.numbersHandler}>6</button>
            <button id="subtract" value=" - " onClick={this.operatorsHandler}>-</button>
            <button id="one" value="1" className="number" onClick={this.numbersHandler}>1</button>
            <button id="two" value="2" className="number" onClick={this.numbersHandler}>2</button>
            <button id="three" value="3" className="number" onClick={this.numbersHandler}>3</button>
            <button id="add" value=" + " onClick={this.operatorsHandler}>+</button>
            <button id="zero" value="0" className="number" onClick={this.numbersHandler}>0</button>
            <button id="decimal" value="." className="number" onClick={this.decimalHandler}>.</button>
            <button id="equals" value=" = " onClick={this.computeHandler}>=</button>
          </div>

        </div>
        {/* <span id="author">Designed and Coded by <a href="https://alexdisdier.fr" target="_blank" rel="noopener noreferrer">Alex Disdier</a></span> */}
      </div>
    );
  }
}

export default App;
