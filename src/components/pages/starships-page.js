import React, { Component } from "react";

import SwapiService from "../../services/swapi-service";

import { StarshipList, StarshipDetails } from "../sw-components";
import Row from "../row";

export default class StarsipsPage extends Component {
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
        left={<StarshipList onItemSelected={this.onItemSelected} />}
        right={<StarshipDetails itemId={selectedItemId} />}
      />
    );
  }
}
