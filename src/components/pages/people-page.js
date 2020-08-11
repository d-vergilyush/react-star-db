import React from "react";

import { PersonList, PersonDetails } from "../sw-components";
import Row from "../row";

const PeoplePage = ({ history, match }) => {

  const { id } = match.params;

  const onItemSelected = (id) => {
    history.push(id)
  }

  return (
    <Row
      left={<PersonList onItemSelected={onItemSelected} />}
      right={<PersonDetails itemId={id} />}
    />
  );
}

export default PeoplePage;
