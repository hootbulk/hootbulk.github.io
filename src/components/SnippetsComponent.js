import React from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap/lib/';

const SnippetsComponent = () => {
  return (
    <ListGroup>
      <Col sm={6} md={4}>
        <ListGroupItem>Snippets</ListGroupItem>
      </Col>
    </ListGroup>
  )
}

export default SnippetsComponent;
