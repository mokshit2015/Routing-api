import React from 'react';
import {BrowserRouter,Link,Route,Switch,Redirect} from 'react-router-dom';
import ListData from './ListData';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    
  }
  
  render(){
    
    return(
      <div>
        <Redirect to='/list'/>
      </div>
    );
  }
}

export default App;
