import React from "react";
import Paper from "material-ui/Paper"
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const webroute = "http://localhost:120/";

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
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

export default class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      userName: "",
      password: ""
    };
  }

  getChildContext() {
      return { muiTheme: getMuiTheme(muiTheme) };
  }

  handleLogin(userName, password) 
  {
    $.post(webroute + 'matchpanel/login',
    {
        data: JSON.stringify({
            timestamp: Math.round((new Date()).getTime() / 1000),
            userName: this.state.userName,
            password: this.state.password
        })
    },
    function(response)
    {
        if(response.responseStatus = "OK")
        {
          console.log(response);
        }

    }, 'json')
    .fail(function(e)
    {
        console.log(e);
    });
 
  }

  handleLoginSuccess(data){
    if(data.responseStatus == "OK") {
      console.log(data);
    }
  }

  handleSubmitFailure(xhr, ajaxOptions, thrownError){
     console.log(xhr, ajaxOptions, thrownError);
  }

  handleUserChange(event) {
    this.setState({userName: event.target.value});
  }

  handlepassChange(event) {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div style={LoginStyles.loginForm}>
        <Paper style={LoginStyles.paper} zDepth={2}>
          <form>
            <TextField
              id="userField"
              hintText=""
              floatingLabelText="Usuario"
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
    );
  }
}

 Login.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

