/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import { hashHistory, Router, Route, IndexRoute } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/*components*/
import { homeReducer }  from "./reducers/reducers"
import Login from "./components/Login"
import Matchview from "./components/Matchview"

/*services*/


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

var isLogged = false;
var key = false;

// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(homeReducer);


function checkAuth(nextState, replace) 
{
  if(localStorage.getItem("isLogged") === null)
  {
    isLogged = false;
  }
  else
  {
    isLogged = localStorage.getItem("isLogged");
  }

  if(localStorage.getItem("key") === null)
  {
    key = null;
  }
  else
  {
    key = localStorage.getItem("key");
  }
  
  if(isLogged === false && key === null)
  {
     replace('/');
  }

}

class Main extends React.Component 
{

  constructor() 
  {
    super();
  }

  render() 
  {
    return (
      <Provider store={store}>
        <Router  history={hashHistory}>
          <Route path="/" component={Login}></Route>
          <Route onEnter={checkAuth}>
            <Route path="/matches" component={Matchview}></Route>
          </Route>
        </Router>    
      </Provider>
    );
  }
}

export default Main;
