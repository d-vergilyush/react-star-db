/* eslint-disable jsx-a11y/alt-text */
import React, { Component, Fragment } from "react";

import "./person-details.css";

import swapiService from '../../services/swapi-service';
import Spinner from "../spinner";

export default class PersonDetails extends Component {
  swapiService = new swapiService();

  state= {
    person: null,
    loading: false
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if(this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson = () => {
    const { personId } = this.props;

    if (!personId) {
      return;
    }

    const timerId = setTimeout(() => {
      this.setState({
        loading: true
      });
    }, 500);

    this.swapiService
      .getPerson(personId)
      .then((person) => {
        this.setState(({ loading }) => {
          if(!loading) {
            clearTimeout(timerId);
          };

          return {
            person,
            loading: false
          };
        });
      })
    };
  
  render() {
    const { person, loading } = this.state;

    const hasMsg = !this.state.person && !loading;
    const hasData = this.state.person && !loading;

    const msg = hasMsg ? <Message /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PersonBody person={person} /> : null;

    return (
      <div className="person-details card">
        {msg}
        {spinner}
        {content}
      </div>
    );
  }
}

const Message = () => {
  return (
    <span>Please, select person from list</span>
  )
};

const PersonBody = ({ person }) => {
  const { id, name, gender, birthYear, eyeColor } = person;

  return (
    <Fragment>
      <img
        className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
      />
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </Fragment>
  )
};
