import React, { Component } from 'react';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="calculator">
          <div id="display">
            <span id="statement">6-3=3</span>
            <span id="inputElement">3</span>
          </div>
            
          <div id="pad">
            <button id="clear" className="dark">AC</button>
            <button id="plus-negative" className="dark">+/-</button>
            <button id="percentage" className="dark">%</button>
            <button id="divide">/</button>
            <button id="seven" className="number">7</button>
            <button id="eight" className="number">8</button>
            <button id="nine" className="number">9</button>
            <button id="multiply">X</button>
            <button id="four" className="number">4</button> 
            <button id="five" className="number">5</button>
            <button id="six" className="number">6</button>
            <button id="subtract">-</button>
            <button id="one" className="number">1</button>
            <button id="two" className="number">2</button>
            <button id="three" className="number">3</button>
            <button id="add">+</button>
            <button id="zero" className="number">0</button>
            <button id="decimal" className="number">.</button>
            <button id="equals">=</button>
          </div>

        </div>
        <span id="author">Designed and Coded by <a href="https://alexdisdier.fr" target="_blank">Alex Disdier</a></span>
      </div>
    );
  }
}

export default App;
