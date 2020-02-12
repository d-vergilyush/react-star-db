/* eslint-disable jsx-a11y/alt-text */
import React, { Component, Fragment } from "react";

import "./item-details.css";

import swapiService from '../../services/swapi-service';
import Spinner from "../spinner";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export {
  Record
};

export default class ItemDetails extends Component {
  swapiService = new swapiService();

  state= {
    item: null,
    image: null,
    loading: false
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if(this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem = () => {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    const timerId = setTimeout(() => {
      this.setState({
        loading: true
      });
    }, 500);

    getData(itemId)
      .then((item) => {
        this.setState(({ loading }) => {
          if(!loading) {
            clearTimeout(timerId);
          };

          return {
            item,
            image: getImageUrl(item),
            loading: false
          };
        });
      })
    };
  
  render() {
    const { item, image, loading } = this.state;
    const { children } = this.props;

    const hasMsg = !this.state.item && !loading;
    const hasData = this.state.item && !loading;
    const itemBodyProps = { item, image, children };

    const msg = hasMsg ? <Message /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <ItemBody {...itemBodyProps} /> : null;

    return (
      <div className="item-details card">
        {msg}
        {spinner}
        {content}
      </div>
    );
  }
}

const Message = () => {
  return (
    <span>Please, select item from list</span>
  )
};

const ItemBody = ({ item, image, children }) => {
  const { name } = item;

  return (
    <Fragment>
      <img
        className="item-image"
        src={image}
      />
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {
            React.Children.map(children, (child) => {
              return React.cloneElement(child, { item });
            })
          }
        </ul>
      </div>
    </Fragment>
  )
};
