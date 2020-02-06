import React, { Component } from "react";

import "./item-list.css";

import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

export default class ItemList extends Component {
  swapiService = new SwapiService();

  state = {
    peopleList: null
  };

  componentDidMount() {
    this.loadPeopleList();
  }

  onPeopleListLoaded = peopleList => {
    this.setState({
      peopleList
    });
  };

  loadPeopleList = () => {
    this.swapiService
      .getAllPeople()
      .then(this.onPeopleListLoaded);
  }

  renderItems(arr) {
    return arr.map(({ id, name }) => {
      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => this.props.onItemSelected(id)}
        >
          {name}
        </li>
      );
    });
  }

  render() {
    const { peopleList } = this.state;
    
    const spinner = !peopleList ? <Spinner /> : null;
    const items = peopleList ? this.renderItems(peopleList) : null;

    return (
      <ul className="item-list list-group">
        {spinner}
        {items}
      </ul>
    );
  }
}
