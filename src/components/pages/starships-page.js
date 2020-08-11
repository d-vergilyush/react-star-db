import React from "react";

import { StarshipList } from "../sw-components";

const StarsipsPage = ({ history }) => {
  return (
    <StarshipList 
      onItemSelected={(id) => history.push(id)} />
  );
};

export default StarsipsPage;
