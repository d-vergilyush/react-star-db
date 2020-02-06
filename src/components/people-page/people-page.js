import React, { Component } from 'react';

import './people-page.css';

import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";

export default class PeoplePage extends Component {
  state = {
    selectedPersonId: null,
    hasError: false
  }

  onPersonSelected = (selectedPersonId) => {
    this.setState({
      selectedPersonId
    })
  }

  componentDidCatch(error) {
    this.setState({
      hasError: true
    });
  }

  render() {
    const { selectedPersonId, hasError } = this.state;

  if(hasError) {
    return <ErrorIndicator />
  };

    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList onItemSelected={this.onPersonSelected} />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={selectedPersonId} />
        </div>
      </div>
    )
  }
}
