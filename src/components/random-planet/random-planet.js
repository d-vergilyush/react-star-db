/* eslint-disable jsx-a11y/alt-text */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import { withSwapiService } from "../hoc-helpers";

import "./random-planet.css";

class RandomPlanet extends Component {

  static defaultProps = {
    updateInterval: 10000
  }

  static propTypes = {
    updateInterval: PropTypes.number
  }

  state = {
    planet: {},
    image: null,
    loading: true,
    error: false
  }

  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl
    ) {
      this.updatePlanet();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = planet => {
    const image = this.props.getImageUrl(planet);

    this.setState({
      planet,
      image,
      loading: false
    });
  }

  onError = err => {
    this.setState({
      loading: false,
      error: true
    });
  }

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 17) + 2;
    const { getData } = this.props;

    getData(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const { planet, image, loading, error } = this.state;

    const hasData = !loading && !error;

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? (
      <PlanetView planet={planet} image={image} />
    ) : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const PlanetView = ({ planet, image }) => {
  const { name, population, rotationPeriod, diameter } = planet;
  return (
    <Fragment>
      <img className="planet-image" src={image} />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

const mapMethodsToProps = swapiService => {
  return {
    getData: swapiService.getPlanet,
    getImageUrl: swapiService.getPlanetImage
  };
};

export default withSwapiService(mapMethodsToProps)(RandomPlanet);
