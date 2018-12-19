import React, { Component } from 'react';

import { numberIsDecimal } from './Utils/Utils';

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
      decimal: false,
      signOver: false,
      percentClicked: false
      // keyCode: [
      //   {
      //     id: 1,
      //     keyPushed: '0',
      //     keyCode: 48
      //   },
      //   {
      //     id: 2,
      //     keyPushed: '1',
      //     keyCode: 49
      //   },
      //   {
      //     id: 3,
      //     keyPushed: '2',
      //     keyCode: 50
      //   },
      //   {
      //     id: 4,
      //     keyPushed: '3',
      //     keyCode: 51
      //   },
      //   {
      //     id: 5,
      //     keyPushed: '4',
      //     keyCode: 52
      //   },
      //   {
      //     id: 6,
      //     keyPushed: '5',
      //     keyCode: 53
      //   },
      //   {
      //     id: 7,
      //     keyPushed: '6',
      //     keyCode: 54
      //   },
      //   {
      //     id: 8,
      //     keyPushed: '7',
      //     keyCode: 55
      //   },
      //   {
      //     id: 9,
      //     keyPushed: '8',
      //     keyCode: 56
      //   },
      //   {
      //     id: 10,
      //     keyPushed: '9',
      //     keyCode: 57
      //   },
      //   {
      //     id: 11,
      //     keyPushed: '+',
      //     keyCode: 187
      //   },
      //   {
      //     id: 12,
      //     keyPushed: '-',
      //     keyCode: 189
      //   },
      //   {
      //     id: 13,
      //     keyPushed: '*',
      //     keyCode: 56
      //   },
      //   {
      //     id: 14,
      //     keyPushed: '/',
      //     keyCode: 191
      //   },
      //   {
      //     id: 15,
      //     keyPushed: '=',
      //     keyCode: 187
      //   }
      // ]
    }

    this.operatorsHandler = this.operatorsHandler.bind(this);
    this.numbersHandler = this.numbersHandler.bind(this);
    this.decimalHandler = this.decimalHandler.bind(this);
    this.percentageHandler = this.percentageHandler.bind(this);
    this.negativePositiveHandler = this.negativePositiveHandler.bind(this);
    this.computeHandler = this.computeHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
    // this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  operatorsHandler = (event) => {
    const opsRegex = /\+|-|\*|\//gm; 
    if (this.state.lastClicked.match(opsRegex) !== null){
      this.setState({ signOver: true})
    };
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
    if (this.state.currentValue.length > 12 && this.state.currentSign === ''){
      return;
    }

    const currentValueCheckZero = this.state.currentValue + event.target.value !== '0' ? this.state.currentValue + event.target.value : '';

    const computingDisplayCheckZero = this.state.computingDisplay + event.target.value !== '0' ? this.state.computingDisplay + event.target.value : '';
  
    this.setState ({
      hasSign: false
    })

    if (this.state.lastClicked === ' = '){ // end of computation
      this.setState({
        currentValue: currentValueCheckZero,
        currentSign: '',
        lastClicked: event.target.value,
        computingDisplay: event.target.value !== '0' ? event.target.value : '',
        currentDisplay: this.state.currentValue + event.target.value
      })
    }
    else if (!this.state.hasSign){ // start of computation
      this.setState({
        currentValue: currentValueCheckZero,
        lastClicked: event.target.value !== '0' ? event.target.value : '',
        currentDisplay: this.state.currentValue + event.target.value,
        computingDisplay: computingDisplayCheckZero
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
    const lastValue = this.state.currentValue;
    if (this.state.currentValue.includes('.')){
      return;
    }

    else if (this.state.hasSign || this.state.computingDisplay === '') {
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
    if (this.state.currentSign === ''){
      this.setState({
        currentValue: parseFloat(this.state.currentValue / 100),
        currentDisplay: parseFloat(this.state.currentValue / 100),
        computingDisplay: parseFloat(this.state.currentValue / 100)
      })
    } else {
      this.setState({
        currentValue: parseFloat(this.state.currentValue / 100),
        currentDisplay: parseFloat(this.state.currentValue / 100),
        computingDisplay: this.state.previousValue + this.state.currentSign + this.state.previousValue + '*' + parseFloat(this.state.currentValue / 100)
      })
    }
  }

  negativePositiveHandler = (event) => {
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

  // componentDidMount() {
  //   document.addEventListener('keydown', this.handleKeyPress);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('keydown', this.handleKeyPress);
  // }

  // handleKeyPress(e) {
  //   if (e.keyCode === this.props.keyCode) {
  //     this.playSoundHandler();
  //   }
  // }

  computeHandler = (event) => {
    // const opsRegex = /\+|-|\*|\//gm; 
    let result = parseFloat(eval(this.state.computingDisplay));

    if (this.state.currentValue === ''){
      return;
    }

    if (numberIsDecimal(result)){
      result = parseFloat(result.toFixed(10)); // toFixed() allows us to round up at 10 digits. (number).toFixed(10)
    }

    if (this.state.signOver){
      this.setState({
        currentValue: '',
        currentDisplay: result,
        currentSign: '',
        previousValue: this.state.currentValue,
        lastClicked: event.target.value,
        computingDisplay: this.state.computingDisplay + ' = ' + result,
        signOver: false
      })
    } else {
      this.setState({
        currentValue: '',
        currentDisplay: result,
        currentSign: '',
        previousValue: this.state.currentValue,
        lastClicked: event.target.value,
        computingDisplay: this.state.computingDisplay + ' = ' + result,
        signOver: false
      })
    }
  }

  resetHandler = () => {
    this.setState({
      currentValue: '',
      previousValue: '0',
      currentSign: '',
      lastClicked: 'AC',
      computingDisplay: '',
      currentDisplay: '0',
      signOver: false
    })
  }

  render() {
    const styleOuput = {
      fontSize: ''
    };

    const styleDisplay = {
      fontSize: ''
    };

    if (this.state.computingDisplay.length >= 30 ){
      styleOuput.fontSize = '10px';
      styleDisplay.fontSize = '20px';
    }

    return (
      <div className="App">
        <div id="calculator">
          <div id="display-flex">
            <span id="output" style={styleOuput}>{this.state.computingDisplay}</span>
            <span id="display" style={styleDisplay}>{this.state.currentDisplay}</span>
          </div>
            
          <div id="pad">
            <button id="clear" className="dark" 
            onClick={this.resetHandler}>AC</button>
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
