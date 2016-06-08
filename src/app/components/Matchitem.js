import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import querystring from 'querystring';
import { WEBROUTE } from "../constants/ServicesRoute"
import axios from "axios";
import Snackbar from 'material-ui/Snackbar';

const style = {
  margin: 12,
};

var cardContainer = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  body: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",

  },
  inputs: {

  },
}

const resultItems = [
  <MenuItem key={0} value={"0"} primaryText="Sin resultado" />,
  <MenuItem key={1} value={"1"} primaryText="Ganó local" />,
  <MenuItem key={2} value={"2"} primaryText="Empate" />,
  <MenuItem key={3} value={"3"} primaryText="Ganó Visita" />,
];

const statusItems = [
  <MenuItem key={0} value={"0"} primaryText="No iniciado" />,
  <MenuItem key={1} value={"1"} primaryText="En Vivo" />,
  <MenuItem key={2} value={"2"} primaryText="Término" />,
];

export default class extends React.Component {

   constructor(props) {
    super(props);
    this.state = {
      id: 0,
      matchday:0,
      date: null,
      time: null,
      homeID: 0,
      homeScore: 0,
      awayScore: 0,
      awayID: 0,
      result: 0,
      status: 0,
      currentState: "",

      autoHideDuration: 3000,
      message: 'Partido modificado satisfactoriamente!',
      open: false,
    };
  }

  handleHomeChange(event, index, value){
     this.setState({homeID:value});
  }

  handleAwayChange(event, index, value){
     this.setState({awayID:value});
  }

  handleResultChange(event, index, value){
     this.setState({result:value});
  }

  handleStatusChange(event, index, value){
     this.setState({status:value});
  }

  handleDateChange(event, date){
    this.setState({date: date});
  }

  handleTimeChange(event, value){

    var defDate = new Date(value);
     this.setState({time:defDate});
  }

  handleHomeScoreChange(event){
     this.setState({homeScore:event.target.value});
  }

  handleAwayScoreChange(event){
     this.setState({awayScore:event.target.value});
  }

  handleCurrentStateChange(event){
     this.setState({currentState:event.target.value});
  }

  handleActionTouchTap(){
    this.setState({
      open: false,
    });
  }

  handleRequestClose(){
    this.setState({
      open: false,
    });
  }

  handleSaveMatchChanges(event, index, value){
      var that = this; 
      console.log(this.state);
      var dateNew = new Date(this.state.date);
      dateNew = dateNew.getFullYear() +'/'+ ("0" + (dateNew.getMonth()+1)).slice(-2)+'/'+("0" + (dateNew.getDate())).slice(-2);
      var timeNew = new Date(this.state.time);
      timeNew = timeNew.getHours() +':'+ timeNew.getMinutes() +':00';
      
      var match = {
        id: this.state.id,
        matchday: this.state.matchday,
        date: dateNew,
        time: timeNew,
        homeID: this.state.homeID,
        homeScore: this.state.homeScore,
        awayScore: this.state.awayScore,
        awayID: this.state.awayID,
        currentState: this.state.currentState,
        result: this.state.result,
        status: this.state.status,
      };

      /*console.log(match);*/
      var route = WEBROUTE + 'matchpanel/edit/match';
      axios.post(route, querystring.stringify({
      data: JSON.stringify({
                timestamp: Math.round((new Date()).getTime() / 1000),
                adminKey: localStorage.getItem("key"),
                match: match})}),
      {
      headers: {"Content-Type": "application/x-www-form-urlencoded"}
      }).then(function (response) 
      {
        if(response.data.responseStatus == "OK")
        {
          that.setState({
            message: 'Partido modificado satisfactoriamente!',
          });
          that.setState({
            open: true,
          });
        }
        else
        {
          that.setState({
            open: true,
          });
          that.setState({
            message: response.data.responseStatus,
          });
        }
      }).catch(function (response) 
      {
      console.log(response);
          that.setState({
            open: true,
          });
          that.setState({
            message: response.data.responseStatus,
          });
      });

  }

  componentDidMount(){
    const {match} = this.props;
    const hour = match.time.split(":");
    const defDate = new Date(match.date);
    defDate.setHours(hour[0],hour[1],hour[2],0);

    this.setState({
      id: match.id,
      matchday: match.matchday,
      date: defDate,
      time: defDate,
      homeID: match.homeID,
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      awayID: match.awayID,
      currentState: match.currentState,
      result:match.result,
      status:match.status,
    });
  }

  render() {
    const {match} = this.props;
    const {teams} = this.props;
    const teamsomponentes = teams.map((teams, i) => <MenuItem key={i} value={teams.id} primaryText = {teams.name}/>);
    const teamHome = [];
    const teamAway = [];
    teamsomponentes.forEach(function(team,id)
    {
      if(team.props.value == match.homeID)
      {
        teamHome.push(team.props.primaryText);
      }
    });
    teamsomponentes.forEach(function(team,id)
    {
      if(team.props.value == match.awayID)
      {
        teamAway.push(team.props.primaryText);
      }
    });

    return (
      <div style={style}>
        <Card >
          <CardHeader
            title={teamHome[0] + " VS " + teamAway[0]}
            subtitle={match.name + ' '+ match.date}
            actAsExpander={true}
            showExpandableButton={true}
            style= {{width:"45vw", textAlign: 'center',}}
          />
          <CardText expandable={true} style= {cardContainer.container}>
            <div style = {cardContainer.dateContainer}>
              <div>
                <DatePicker style = {{marginRight: "3em"}} hintText="Portrait Dialog" value={this.state.date}
                  onChange={this.handleDateChange.bind(this)}/>
              </div>
              <div>
                <TimePicker style = {{marginLeft: "3em"}} format="24hr" hintText="24hr Format" value={this.state.time}
                  onChange={this.handleTimeChange.bind(this)}/>
              </div>
            </div>

            <div style = {cardContainer.body}>
                <SelectField
                  floatingLabelText="Home"
                  floatingLabelStyle={{color: 'red'}}
                  style = {{marginRight: "3em"}}
                  value={this.state.homeID}
                  onChange={this.handleHomeChange.bind(this)}
                >
                  {teamsomponentes}
                </SelectField>
                <h2 style = {{marginTop: "2em"}}> VS </h2>
                <SelectField
                  floatingLabelText="Away"
                  floatingLabelStyle={{color: 'red'}}
                  style = {{marginLeft: "3em"}}
                  value={this.state.awayID}
                  onChange={this.handleAwayChange.bind(this)}
                >
                  {teamsomponentes}
                </SelectField>
            </div>

            <div style = {cardContainer.body}>
                <TextField
                  hintText="Home Score"
                  floatingLabelText="Home Score"
                  floatingLabelFixed={true}
                  style = {{marginRight: "4em", width: "7em"}}
                  value={this.state.homeScore}
                  onChange={this.handleHomeScoreChange.bind(this)}
                />
                <TextField
                  hintText="Current State"
                  floatingLabelText="Current State"
                  floatingLabelFixed={true}
                  style = {{width: "7em"}}
                  value={this.state.currentState}
                  onChange={this.handleCurrentStateChange.bind(this)}
                />
                <TextField
                  hintText="Away Score"
                  floatingLabelText="Away Score"
                  floatingLabelFixed={true}
                  style = {{marginLeft: "4em", width: "7em"}}
                  value={this.state.awayScore}
                  onChange={this.handleAwayScoreChange.bind(this)}
                />
            </div>

            <div style = {cardContainer.body}>
                <SelectField
                  floatingLabelText="Resultado"
                  floatingLabelStyle={{color: 'red'}}
                  style = {{marginRight: "2em", width: 150}}
                  value={this.state.result}
                  onChange={this.handleResultChange.bind(this)}
                >
                  {resultItems}
                </SelectField>

                <SelectField
                  floatingLabelText="Estatus"
                  floatingLabelStyle={{color: 'red'}}
                  style= {{width: 150}}
                  value={this.state.status}
                  onChange={this.handleStatusChange.bind(this)}
                >
                  {statusItems}
                </SelectField>
                <RaisedButton style = {{marginLeft: "3em"}} label="Guardar Cambios" primary={true} onMouseUp = {this.handleSaveMatchChanges.bind(this)}/>
            </div>
          </CardText>
        </Card>

        <Snackbar
          open={this.state.open}
          message={this.state.message}
          action="undo"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this.handleActionTouchTap.bind(this)}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
      </div>
    );
  }
}