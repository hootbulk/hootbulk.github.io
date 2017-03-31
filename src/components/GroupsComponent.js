import React, {Component} from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap/lib/';
import CreateGroupModal from './CreateGroupModal';

class GroupsComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false
    }
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }
  handleModalOpen(){
    this.setState({
      showModal: true
    });
  }
  handleModalClose(){
    this.setState({
      showModal: false
    });
  }
  render() {
    return (
      <ListGroup>
        <Col sm={6} md={4}>
          <ListGroupItem>
            <button onClick={this.handleModalOpen}>Create Group</button>
            <CreateGroupModal closeModal={this.handleModalClose} showModal={this.state.showModal} />
          </ListGroupItem>
        </Col>
      </ListGroup>
    )
  }
}

export default GroupsComponent;
