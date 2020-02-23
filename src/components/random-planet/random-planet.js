/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import { withSwapiService } from "../hoc-helpers";

import "./random-planet.css";

const RandomPlanet = ({ getData, getImageUrl, updateInterval }) => {
  const [planet, setPlanet] = useState({});
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const updatePlanet = useCallback(() => {
    const id = Math.floor(Math.random() * 17) + 2;

    getData(id)
      .then(planet => {
        setPlanet(planet);
        setImage(getImageUrl(planet));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [getData, getImageUrl]);

  useEffect(() => {
    const intervalId = setInterval(updatePlanet, updateInterval);
    updatePlanet();

    return () => {
      clearInterval(intervalId);
    };
  }, [getData, getImageUrl, updateInterval, updatePlanet]);

  if (error) {
    return <ErrorIndicator />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="random-planet jumbotron rounded">
      <PlanetView planet={planet} image={image} />
    </div>
  );
};

RandomPlanet.defaultProps = {
  updateInterval: 6000
};

RandomPlanet.propTypes = {
  updateInterval: PropTypes.number
};

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
