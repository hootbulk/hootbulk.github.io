import React from 'react';
import { Modal, Button } from 'react-bootstrap/lib/';
import CreateGroupComponent from './CreateGroupComponent'

const CreateGroupModal = ({closeModal, showModal}) => {
  return (
    <div>
        <Modal
          show={showModal}
          onHide={closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Create Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateGroupComponent />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

export default CreateGroupModal;
