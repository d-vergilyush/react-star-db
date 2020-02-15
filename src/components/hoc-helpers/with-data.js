import React, { Component } from "react";

import Spinner from "../spinner";

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

      if (!data) {
        return <Spinner />;
      }

      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;
