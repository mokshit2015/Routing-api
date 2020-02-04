import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ListData from './ListData';
import New from './New'; 
import * as serviceWorker from './serviceWorker';
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
    <BrowserRouter>
        <div>
            <h3> Demo  </h3>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/list">List</Link>
                </li>
                <li>
                    <Link to="/list/new">Add User</Link>
                </li>
            </ul>
            <Switch>
                <Route exact path="/" component={App}></Route>
                <Route  path="/list/:id" component={New}></Route>
                <Route  path="/list" component={ListData}></Route>
                
                {/* <Route  path="/contact" component={Contact}></Route> */}
            </Switch>
        </div>
    </BrowserRouter>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
