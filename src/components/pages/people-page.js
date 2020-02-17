import React, { Component } from "react";

import SwapiService from "../../services/swapi-service";

import { PersonList, PersonDetails } from "../sw-components";
import Row from "../row";

export default class PeoplePage extends Component {
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
        left={<PersonList onItemSelected={this.onItemSelected} />}
        right={<PersonDetails itemId={selectedItemId} />}
      />
    );
  }
}
