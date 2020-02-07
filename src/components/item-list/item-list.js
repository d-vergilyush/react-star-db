import React, { Component } from "react";

import "./item-list.css";

import Spinner from "../spinner";

export default class ItemList extends Component {
  state = {
    itemList: null
  };

  componentDidMount() {
    this.loadItemList();
  }

  onItemListLoaded = itemList => {
    this.setState({
      itemList
    });
  };

  loadItemList = () => {
    const { getData } = this.props;

    getData().then(this.onItemListLoaded);
  };

  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      const label = this.props.children(item);

      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  }

  render() {
    const { itemList } = this.state;

    const spinner = !itemList ? <Spinner /> : null;
    const items = itemList ? this.renderItems(itemList) : null;

    return (
      <ul className="item-list list-group">
        {spinner}
        {items}
      </ul>
    );
  }
}
