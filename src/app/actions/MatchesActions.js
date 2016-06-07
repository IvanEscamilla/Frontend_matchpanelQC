import dispatcher from "../dispatcher";
import axios from "axios";
import querystring from 'querystring';

import { CREATE_MATCH, GET_ALL, UPDATE_MATCH, DELETE_MATCH, FETCH_ALL_MATCHES, FETCH_ALL_TEAMS } from "../constants/matchesactionsconstants"
import { WEBROUTE } from "../constants/ServicesRoute"

export function createMatch(){
	dispatcher.dispatch({
		type: CREATE_MATCH,
		match
	});
}

export function getallMatches(adminKey){
	var route = WEBROUTE + 'matchpanel/get/matches';
  
    axios.post(route, querystring.stringify({
			data: JSON.stringify({
			        timestamp: Math.round((new Date()).getTime() / 1000),
			        adminKey})}),
		{
      		headers: {"Content-Type": "application/x-www-form-urlencoded"}
    }).then(function (response) 
    {
      if(response.responseStatus = "OK")
      {
        dispatcher.dispatch({
			type: FETCH_ALL_MATCHES,
			matches: response.data.matches,
		});
      }

    }).catch(function (response) 
    {
      console.log(response);
    });
}

export function getallTeams(adminKey){
	var route = WEBROUTE + 'matchpanel/get/teams';
  
    axios.post(route, querystring.stringify({
			data: JSON.stringify({
			        timestamp: Math.round((new Date()).getTime() / 1000),
			        adminKey})}),
		{
      		headers: {"Content-Type": "application/x-www-form-urlencoded"}
    }).then(function (response) 
    {
      if(response.responseStatus = "OK")
      {
        dispatcher.dispatch({
			type: FETCH_ALL_TEAMS,
			teams: response.data.teams,
		});
      }

    }).catch(function (response) 
    {
      console.log(response);
    });
}

export function updateMatch(match){
	dispatcher.dispatch({
		type: UPDATE_MATCH,
		match
	});
}