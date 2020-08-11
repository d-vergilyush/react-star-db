import React, { Component } from "react";

import { PlanetList, PlanetDetails } from "../sw-components";
import Row from "../row";

export default class PlanetsPage extends Component {

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
