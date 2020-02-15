import React from "react";
import SwapiService from "../../services/swapi-service";
import ItemList from "../item-list";
import { withData } from "../hoc-helpers";

const { 
  getAllPeople,
  getAllPlanets,
  getAllStarships
} = new SwapiService();

const withChildData = (Wrapped, fn) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    )
  };
};

const ListWithChild = withChildData(ItemList, ({ name }) => <span>{name}</span>);

const PersonList = withData(ListWithChild, getAllPeople);

const PlanetList = withData(ListWithChild, getAllPlanets);

const StarshipList = withData(ListWithChild, getAllStarships);

export {
  PersonList,
  PlanetList,
  StarshipList
};
