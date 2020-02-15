import React from "react";

import "./item-list.css";

import { withData } from "../hoc-helpers"
import SwapiService from "../../services/swapi-service";

const { getAllPeople } = new SwapiService();

const ItemList = ({ onItemSelected, data, children}) => {
  
  const items = data.map((item) => {
    const { id } = item;
    const label = children(item);

    return (
      <li
        className="list-group-item"
        key={id}
        onClick={() => onItemSelected(id)}
      >
        {label}
      </li>
    );
  });

  return (
    <ul className="item-list list-group">
      {items}
    </ul>
  );
}

export default withData(ItemList, getAllPeople);
