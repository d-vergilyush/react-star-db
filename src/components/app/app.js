import React, { Component } from "react";

import "./app.css";

import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";

import Header from "../header";
import RandomPlanet from "../random-planet";
import { PeoplePage, PlanetsPage, StarshipsPage } from "../pages";
import { StarshipDetails } from "../sw-components";
import ErrorBoundary from "../error-boundary";
import { SwapiServiceProvider } from "../swapi-service-context";

import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {

  state = {
    selectedPersonId: null,
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      console.log('switched to ', Service.name);
      return {
        swapiService: new Service()
      }
    })
  };

  render() {
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <Header onServiceChange={this.onServiceChange} />
            <RandomPlanet />
            <Route path="/"
                   render={() => <h2>Welcome to StarDB</h2>}
                   exact 
            />
            <Route path="/people" component={PeoplePage} />
            <Route path="/planets" component={PlanetsPage} />
            <Route path="/starships" exact component={StarshipsPage} />
            <Route path="/starships/:id"
                   render={({ match }) => {
                       const { id } = match.params;
                       return <StarshipDetails itemId={id} />
                   }}
            />
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}
