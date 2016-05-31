/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import { hashHistory, Router, Route, IndexRoute } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/*components*/
import Login from "./components/Login"

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


var Home = React.createClass({
    render() 
    {
        return (<h1>Welcome to the Home Page</h1>);
    } 
});

var view2 = React.createClass({
  render() 
  {
    return (<h1>Welcome to the view2 Page</h1>);
  } 
});

class Main extends React.Component 
{

  constructor() 
  {
    super();
  }

  render() 
  {
    return (
      <Router  history={hashHistory}>
        <Route path="/" component={Login}>
        
        </Route>
      </Router>    
    );
  }
}

export default Main;
