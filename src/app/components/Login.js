import React from "react";
import axios from "axios";
import Paper from "material-ui/Paper";
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import querystring from 'querystring';
import { WEBROUTE } from "../constants/ServicesRoute"

const LoginStyles = {
  loginForm: {
    marginLeft: "calc(50vw - (25em/2))",
    marginTop: "calc(50vh - (16em/2))"
  },
  paper: {
    height: 16+'em',
    width: 25+'em',
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'
  },
  loginButton: {
    margin: 12,
  },
  bg: {
    display: 'flex',
    backgroundImage: "url('http://www.calientefutgol.mx/res/landing/img/backgrounds/Fondo@2x.jpg')",
    backgroundColor: "#000000",
    height: 100+'vh',
    width: 100+'vw',
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

function setAdminKey(newState) {
  return {
    type: 'SET_ADMINKEY',
    newState
  }
}

function setLoggedIn(newState) {
  return {
    type: 'SET_LOGGEDIN',
    newState
  }
}

export default class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      adminKey: "",
      isLogged: false
    };
  }

  getChildContext() {
      return { muiTheme: getMuiTheme(muiTheme) };
  }
  
  handleLogin() 
  {
    var that = this;
    var route = WEBROUTE + 'matchpanel/login';
    var { store } = this.context;
    var { router } = this.context;
    var props = this.props;

    axios.post(route, querystring.stringify({
      data: JSON.stringify({
                timestamp: Math.round((new Date()).getTime() / 1000),
                userName: this.state.userName,
                password: this.state.password})}),
    {
      headers: {"Content-Type": "application/x-www-form-urlencoded"}
    }).then(function (response) 
    {
      if(response.responseStatus = "OK")
      {
        store.dispatch(setAdminKey(response.data.user.adminKey));
        store.dispatch(setLoggedIn(true));
        localStorage.setItem("isLogged", true);
        localStorage.setItem("key", response.data.user.adminKey);
        router.push('/matches');
      }

    }).catch(function (response) 
    {
      console.log(response);
    });

  }

  handleUserChange(event) {
    this.setState({userName: event.target.value});
  }

  handlepassChange(event) {
    this.setState({password: event.target.value});
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();

    return (
      <div style={LoginStyles.bg}>
        <div style={LoginStyles.loginForm}>
          <Paper style={LoginStyles.paper} zDepth={2}>
            <form>
              <TextField
                id="userField"
                hintText=""
                floatingLabelText="Nombre de Usuario"
                onChange={this.handleUserChange.bind(this)}
              /><br />
              <TextField
                id="passwordField"
                hintText=""
                floatingLabelText="Contraseña"
                type="password"
                onChange={this.handlepassChange.bind(this)}
              /><br />
              <RaisedButton label="Login" onClick={this.handleLogin.bind(this)} primary={true} style={LoginStyles.loginButton} />
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

Login.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

Login.contextTypes = {
    store: React.PropTypes.object,
    router: React.PropTypes.object.isRequired    
};

