import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';

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
  <MenuItem key={0} value={0} primaryText="No hay resultado" />,
  <MenuItem key={1} value={1} primaryText="Ganó local" />,
  <MenuItem key={2} value={2} primaryText="Empate" />,
  <MenuItem key={3} value={3} primaryText="Ganó Visita" />,
];

const statusItems = [
  <MenuItem key={0} value={0} primaryText="No iniciado" />,
  <MenuItem key={1} value={1} primaryText="En Vivo" />,
  <MenuItem key={2} value={2} primaryText="Término" />,
];

export default class extends React.Component {

   constructor(props) {
    super(props);
    this.state = {
      homeID: null,
      awayID: null,
      result: null,
      status: null,
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

  componentDidMount(){
    const {match} = this.props;
    this.setState({
      homeID:match.homeID,
      awayID:match.awayID,
      result:parseInt(match.result),
      status:parseInt(match.status),
    });
  }

  render() {
    const {match} = this.props;
    const {teams} = this.props;
    const {homeID} = this.state;
    const {awayID} = this.state;
    const {result} = this.state;
    const {status} = this.state;
    const teamsomponentes = teams.map((teams, i) => <MenuItem key={i} value={teams.id} primaryText = {teams.name}/>);
    
    const hour = match.time.split(":");
    const defDate = new Date(match.date);
    defDate.setHours(hour[0],hour[1],hour[2],0);

    return (
      <div style={style}>
        <Card >
          <CardText expandable={false} style= {cardContainer.container}>
            <div style = {cardContainer.dateContainer}>
              <div>
                <DatePicker style = {{marginRight: "3em"}} defaultDate={defDate} hintText="Portrait Dialog"/>
              </div>
              <div>
                <TimePicker style = {{marginLeft: "3em"}} defaultTime={defDate} format="24hr" hintText="24hr Format" />
              </div>
            </div>

            <div style = {cardContainer.body}>
                <SelectField
                  floatingLabelText="Home"
                  floatingLabelStyle={{color: 'red'}}
                  style = {{marginRight: "3em"}}
                  value={homeID}
                  onChange={this.handleHomeChange.bind(this)}
                >
                  {teamsomponentes}
                </SelectField>
                <h2 style = {{marginTop: "2em"}}> VS </h2>
                <SelectField
                  floatingLabelText="Away"
                  floatingLabelStyle={{color: 'red'}}
                  style = {{marginLeft: "3em"}}
                  value={awayID}
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
                  defaultValue={match.homeScore}
                />
                <TextField
                  hintText="Current State"
                  floatingLabelText="Current State"
                  floatingLabelFixed={true}
                  style = {{width: "7em"}}
                  defaultValue={match.currentState}
                />
                <TextField
                  hintText="Away Score"
                  floatingLabelText="Away Score"
                  floatingLabelFixed={true}
                  style = {{marginLeft: "4em", width: "7em"}}
                  defaultValue={match.awayScore}
                />
            </div>

            <div style = {cardContainer.body}>
                <SelectField
                  floatingLabelText="Resultado"
                  floatingLabelStyle={{color: 'red'}}
                  style = {{marginRight: "2em", width: 250}}
                  value={result}
                  onChange={this.handleResultChange.bind(this)}
                >
                  {resultItems}
                </SelectField>

                <SelectField
                  floatingLabelText="Estatus"
                  floatingLabelStyle={{color: 'red'}}
                  style= {{width: 150}}
                  value={status}
                  onChange={this.handleStatusChange.bind(this)}
                >
                  {statusItems}
                </SelectField>
                <RaisedButton style = {{marginLeft: "3em"}} label="Guardar Cambios" primary={true} style={style} />
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
}