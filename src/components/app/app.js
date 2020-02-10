import React, { Component } from "react";

import "./app.css";

import SwapiService from "../../services/swapi-service";

import Header from "../header";
import RandomPlanet from "../random-planet";
import PeoplePage from "../people-page";
import ErrorBoundary from "../error-boundary"

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    selectedPersonId: null
  };

  render() {
    return (
      <ErrorBoundary>
        <div>
          <Header />
          <RandomPlanet />
          <PeoplePage />

          {/* <div className="row mb2">
            <div className="col-md-6">
              <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPlanets}
              >
                {({ name, diameter }) => (
                    `${name} (${diameter})`
                )}
              </ItemList>
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
              >
                {({ name, model }) => (
                    `${name} (${model})`
                )}
            </ItemList>
            </div>
            <div className="col-md-6">
              <PersonDetails personId={this.state.selectedPersonId} />
            </div>
          </div> */}
        </div>
      </ErrorBoundary>
    );
  }
}
