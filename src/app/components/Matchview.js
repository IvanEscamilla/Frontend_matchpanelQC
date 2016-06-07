import React from "react";

import {teal600, grey900, blue500, blue700, blue100, red500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

/*App Bar*/
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


import Match from "./Matchitem";
import MatchesStore from "../store/MatchesStores";
import * as MatchesActions from "../actions/MatchesActions";

const webroute = "http://localhost:120/";
/*const webroute = "http://www.calientefutgol.mx/";*/

const styles = {
  container: {
    textAlign: 'center',
    margin: 30,
    marginTop: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    primary2Color: blue700,
    primary3Color: blue100,
    accent1Color: red500
  },
  appBar:
  {
    height: 60,
  }
});

export default class Matchview extends React.Component {

  constructor(){
    super();
    this.state = {
      userAdmin: [],
      teamArr: [],
      matchesArr: MatchesStore.getAll(),
    };
  }

  getChildContext() {
      return { muiTheme: getMuiTheme(muiTheme) };
  }

  componentWillMount() {

    MatchesStore.on("changeMatchesArr", () => {
      this.setState({
        matchesArr: MatchesStore.getAll(),
      });
    });

    MatchesStore.on("changeTeamArr", () => {
      this.setState({
        teamArr: MatchesStore.getAllTeams(),
      });
    });
  }

  componentDidMount(){

    MatchesActions.getallMatches(localStorage.getItem("key"));
    MatchesActions.getallTeams(localStorage.getItem("key"));
  }


  getMatches() {
    console.log(this.state);
    MatchesActions.getallMatches(localStorage.getItem("key"));
  }

  singOut() {
    var { router } = this.context;
    localStorage.clear();
    router.push('/');
  }

  render() {
    window.state = this.state;
    const {matchesArr} = this.state;
    const {teamArr} = this.state;
    const matchesComponentes = matchesArr.map((match, i) => <Match key={i} match={match} teams = {teamArr}/>);
    const { store } = this.context;
    this.state.userAdmin = store.getState();
    
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div >
          <AppBar
            title=""
            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                
              >
                <MenuItem 
                  primaryText="Recargar Partidos" 
                  onTouchTap = {this.getMatches.bind(this)}
                  />
                <MenuItem 
                  primaryText="Sign out"
                  onTouchTap = {this.singOut.bind(this)}
                 />
              </IconMenu>
            }
          />

        <div style={styles.container}>
          {matchesComponentes}
        </div>

      </div>
      </MuiThemeProvider>      
    );
  }
}

 Matchview.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

Matchview.contextTypes = {
    store: React.PropTypes.object,
    router: React.PropTypes.object.isRequired  
};



