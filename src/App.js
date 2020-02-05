import React from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Redirect to='/list' />
      </div>
    );
  }
}

export default App;
