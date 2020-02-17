import React, { Component } from "react";

import SwapiService from "../../services/swapi-service";

import { PlanetList, PlanetDetails } from "../sw-components";
import Row from "../row";

export default class PlanetsPage extends Component {
  swapiService = new SwapiService();

  state = {
    selectedItemId: null
  };

  onItemSelected = selectedItemId => {
    this.setState({
      selectedItemId
    });
  };

  render() {
    const { selectedItemId } = this.state;

    return (
      <Row
        left={<PlanetList onItemSelected={this.onItemSelected} />}
        right={<PlanetDetails itemId={selectedItemId} />}
      />
    );
  }
}
