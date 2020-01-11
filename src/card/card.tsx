import React from 'react';
import Nav from '../nav/nav';
import history from '../server/history';

const Card: React.FunctionComponent = () => {
  return (
    <section>
      <Nav active={"card"} />
      <h1>This is Card component</h1>
    </section>
  )
}

export default Card;
