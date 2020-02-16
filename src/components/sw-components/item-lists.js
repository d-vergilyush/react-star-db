import React from "react";
import SwapiService from "../../services/swapi-service";
import ItemList from "../item-list";
import { withData } from "../hoc-helpers";

const { 
  getAllPeople,
  getAllPlanets,
  getAllStarships
} = new SwapiService();

const withChildFunction = (Wrapped, fn) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    )
  };
};

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ name, model }) => <span>{name} ({model})</span>;

const PersonList = withData(withChildFunction(ItemList, renderName), getAllPeople);

const PlanetList = withData(withChildFunction(ItemList, renderName), getAllPlanets);

const StarshipList = withData(withChildFunction(ItemList, renderModelAndName), getAllStarships);

export {
  PersonList,
  PlanetList,
  StarshipList
};
