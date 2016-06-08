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
import LinearProgress from 'material-ui/LinearProgress';

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
  },
  progrssBar: {
    position: "absolute",
    height: "3px",
    display: "block",
    width: "100%",
    margin: "0px",
    overflow: "hidden",
    backgroundColor: "rgb(189, 189, 189)",
  },
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

export default class LinearProgressExampleDeterminate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(5), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }

  render() {
    return (
      <LinearProgress mode="determinate" style = {LoginStyles.progrssBar} value={this.state.completed} />
    );
  }
}


export default class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      adminKey: "",
      isLogged: false,
      progressBar: <div/>,
    };
  }

  getChildContext() {
      return { muiTheme: getMuiTheme(muiTheme) };
  }
  
  handleLogin() 
  {
    var a = document.getElementById("loginContainer");

    var that = this;
    that.setState({progressBar: <LinearProgressExampleDeterminate/>}) ;
    that.forceUpdate()
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
      if(response.data.responseStatus == "OK")
      {
        store.dispatch(setAdminKey(response.data.user.adminKey));
        store.dispatch(setLoggedIn(true));
        localStorage.setItem("isLogged", true);
        localStorage.setItem("key", response.data.user.adminKey);
        router.push('/matches');
      }
      else
      {
        localStorage.clear();
        router.push('/');
        that.setState({progressBar: <div/>}) ;
        that.forceUpdate()
      }

    }).catch(function (response) 
    {
      localStorage.clear();
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
      <div id= "loginContainer">
      {this.state.progressBar}
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

