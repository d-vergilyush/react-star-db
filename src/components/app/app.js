import React, { Component } from "react";

import "./app.css";

import SwapiService from "../../services/swapi-service";

import Header from "../header";
import RandomPlanet from "../random-planet";
import PeoplePage from "../people-page";
import ErrorIndicator from "../error-indicator";
import ItemList from "../item-list";
import PersonDetails from "../person-details";


export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    selectedPersonId: null,
    hasError: false
  };

  componentDidCatch(error) {
    this.setState({
      hasError: true
    });
  }

  render() {
  const { hasError } = this.state; 

  if(hasError) {
    return <ErrorIndicator />
  };

    return (
      <div>
        <Header />
        <RandomPlanet />
        <PeoplePage />

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList 
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPlanets}
              renderItem={({ name, diameter }) => <span>{name} (<em>{diameter}</em>)</span> } />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPersonId} />
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList 
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}
              renderItem={({ name, model }) => <span>{name} (<em>{model}</em>)</span> } />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPersonId} />
          </div>
        </div>
      </div>
    );
  }
}
