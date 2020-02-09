import React, { Component } from "react";

import "./people-page.css";

import SwapiService from "../../services/swapi-service";

import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorBoundary from "../error-boundary";
import Row from "../row";

export default class PeoplePage extends Component {
  swapiService = new SwapiService();

  state = {
    selectedPersonId: null
  };

  onPersonSelected = selectedPersonId => {
    this.setState({
      selectedPersonId
    });
  };

  render() {
    const { selectedPersonId } = this.state;

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
      >
        {i => `${i.name} (${i.birthYear})`}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundary>
        <PersonDetails personId={selectedPersonId} />
      </ErrorBoundary>
    );

    return (
        <Row left={itemList} right={personDetails} />
    );
  }
}
