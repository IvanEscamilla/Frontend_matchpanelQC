import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import { CREATE_MATCH, GET_ALL, UPDATE_MATCH, DELETE_MATCH, FETCH_ALL_MATCHES, FETCH_ALL_TEAMS } from "../constants/matchesactionsconstants"

class MatchesStore extends EventEmitter{
	
	constructor() {
		super()
		this.matches = [];
	    this.teams = [];

	}

	getAll()
	{
		return this.matches;
	}

	getAllTeams()
	{
		return this.teams;
	}

	createMatche() {

		const id = Date.now();

		this.matches.push({
		  id,
	      "league": "Copa America Centenario",
	      "matchday": 1,
	      "date": "2016/06/04",
	      "time": "17:00:00",
	      "homeID": 10003,
	      "homeScore": 0,
	      "awayScore": 0,
	      "awayID": 10004,
	      "result": 0,
	      "status": 0,
	      "currentState": "",
		});

		this.emit("change");
	}

	updateMatches() {
    	this.emit("change");
	}

	handleActions(action) {
		/*console.log("MatchesStore received an action", action);*/
		switch(action.type) {
			case UPDATE_MATCH:{

			}break;
			case CREATE_MATCH:{

			}break;
			case GET_ALL:{
				console.log(this.getAll()); 
			}break;
			case FETCH_ALL_MATCHES:{
				this.matches = action.matches;
				this.emit("changeMatchesArr");
			}break;
			case FETCH_ALL_TEAMS:{
				this.teams = action.teams;
				this.emit("changeTeamArr");
			}break;
			default:{
				console.log("MatchesStore received an unknown action!", action);
			}
			break;	
		}
	}

}

const matchesStore = new MatchesStore;
/*to make matchesStore Global an can be access on the console*/
/*window.matchesStore = matchesStore;*/
dispatcher.register(matchesStore.handleActions.bind(matchesStore));
window.dispatcher = dispatcher;
/*to dispatch an event just run dispatcher.dispatch({type: "some event", args: {a: 1, b: 2}})*/
export default matchesStore;