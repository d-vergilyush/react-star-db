import React, { Component } from "react";

import "./people-page.css";

import SwapiService from "../../services/swapi-service";

import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import Row from "../row";

export default class PeoplePage extends Component {
  swapiService = new SwapiService();

  state = {
    selectedPersonId: null,
    hasError: false
  };

  onPersonSelected = selectedPersonId => {
    this.setState({
      selectedPersonId
    });
  };

  componentDidCatch(error) {
    this.setState({
      hasError: true
    });
  }

  render() {
    const { selectedPersonId, hasError } = this.state;

    if (hasError) {
      return <ErrorIndicator />;
    }

    const itemList = (
      <ItemList 
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
        renderItem={({ name, gender, birthYear }) => <span>{name} (<em>{gender}, {birthYear}</em>)</span> } 
      />
    );

    const personDetails = (
      <PersonDetails personId={selectedPersonId} />
    );

    return (
      <Row left={itemList} right={personDetails} />
    );
  }
}
