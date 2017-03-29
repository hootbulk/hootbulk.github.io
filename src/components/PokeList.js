import React from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap/lib/';

const PokeList = ({listOfPokemon, openModal}) => {
  let pokemon = listOfPokemon.map((creature) => {
    return (
      <Col sm={6} md={4} key={creature.name}>
        <ListGroupItem className="PokeList-item" onClick={openModal.bind(null, creature)}>{creature.name}</ListGroupItem>
      </Col>
    )
  });
  return (
    <ListGroup>
      {pokemon}
    </ListGroup>
  )
}

export default PokeList;
