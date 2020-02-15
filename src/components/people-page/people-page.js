import React, { Component } from "react";

import "./people-page.css";

import SwapiService from "../../services/swapi-service";

import { PersonList, PersonDetails } from "../sw-components";
import ErrorBoundary from "../error-boundary";
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

    const itemList = <PersonList onItemSelected={this.onItemSelected} />;

    const itemDetails = (
      <ErrorBoundary>
        <PersonDetails itemId={selectedItemId} />
      </ErrorBoundary>
    );

    return (
        <Row 
          left={itemList} 
          right={itemDetails} 
        />
    );
  }
}
