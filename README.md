# date-ranges
A calendar selectoin view for your react project

## Installation
1. Install using npm or yarn (`npm i date-ranges`)
2. Import using `import Calendar from 'date-ranges'`

## Visuals
Using this package provides a calendar view which allows date ranges to be selected, with a start and end date. The start and end dates are marked with a specific color scheme, with all dates inbetween using a highlighted color scheme. The image below provides an example of possible color schemes with this datepicker.
<img src='images/date_pick.png' align='center' />

## Usage
The given code snippet demonstrates how to utilize the `Calendar` module in another component.

```jsx
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from 'date-ranges'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Calendar
          fontColor='#000'
          selectedFontColor='#F5BA26'
          selectedColor='#8C298C'
          highlightedColor='#D4BAD7'
        />
      </div>
    );
  }
}

export default App;
```

## API

### props
#### fontColor: string
The default font color the numbers on the calendar will have when highlighted or not selected

#### selectedFontColor: string
The font color the numbers on the calendar will have when selected

#### selectedColor: string
The background color of date selection when selected

#### highlightedColor: string
The background color of date when between start and end selection
