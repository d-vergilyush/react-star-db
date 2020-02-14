import React, { Component } from "react";

import "./item-list.css";

import Spinner from "../spinner";
import SwapiService from "../../services/swapi-service"

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

const withData = (View, getData) => {
  return class extends Component {

    state = {
      data: null
    };
  
    componentDidMount() {
      this.loadData();
    }
  
    onDataLoaded = data => {
      this.setState({
        data
      });
    };
  
    loadData = () => {
      getData().then(this.onDataLoaded);
    };

    render() {
      const { data } = this.state;

      if(!data) {
        return <Spinner />;
      }

      return <View {...this.props} data={data} />
    }
  }
}

export default withData(ItemList, getAllPeople);
