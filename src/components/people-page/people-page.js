import React, { Component } from "react";

import "./people-page.css";

import SwapiService from "../../services/swapi-service";

import ItemList from "../item-list";
import ItemDetails, { Record } from "../item-details";
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
    const { getPerson, getPersonImage } = this.swapiService;

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
      >
        {({name}) => <span>{name}</span>}
      </ItemList>
    );

    const itemDetails = (
      <ErrorBoundary>
        <ItemDetails 
          itemId={selectedItemId} 
          getData={getPerson}
          getImageUrl={getPersonImage}
        >
          <Record field="gender" label="Gender" />
          <Record field="birthYear" label="Birth year" />
          <Record field="eyeColor" label="Eye color" />
        </ItemDetails>
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
