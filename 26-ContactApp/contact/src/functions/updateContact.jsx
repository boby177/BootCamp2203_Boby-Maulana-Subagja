// import { set } from "express/lib/application";
import React, { Fragment, useState } from "react";
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';

const EditContact = ({ contacts }) => {
    const [updateName, setUpdateName] = useState(contacts.name)
    const [updateEmail, setUpdateEmail] = useState(contacts.email)
    const [updateMobile, setUpdateMobile] = useState(contacts.mobile)

    const updateContact = async e => {
    e.preventDefault();
    try {
        const body = { updateName, updateEmail, updateMobile };
        const response = await fetch(
        `http://localhost:3001/contact/${contacts.id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }
    );
        alert('Contact has been updated')
        window.location = "/contacts";
    } catch (err) {
      console.error(err.message);
    }
  };

// Modal function
const [show, setShow] = useState(false);
const handleClose = () =>setShow(false);
const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Button variant="success" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title> Update Data Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Name </InputGroup.Text>
            <FormControl
                aria-label="small"
                type="text"
                aria-describedby="inputGroup-sizing-sm"
                name="name"
                value={updateName}
                onChange={e => setUpdateName(e.target.value)}
            />
            </InputGroup>

            <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Email </InputGroup.Text>
            <FormControl
                aria-label="small"
                type="text"
                aria-describedby="inputGroup-sizing-sm"
                name="name"
                value={updateEmail}
                onChange={e => setUpdateEmail(e.target.value)}
            />
            </InputGroup>

            <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Mobile </InputGroup.Text>
            <FormControl
                aria-label="small"
                type="text"
                aria-describedby="inputGroup-sizing-sm"
                name="name"
                value={updateMobile}
                onChange={e => setUpdateMobile(e.target.value)}
            />
            </InputGroup>

        </Modal.Body>
        <Modal.Footer>
        <Button variant="success" onClick={updateContact}>
            Save
        </Button>
        </Modal.Footer>
    </Modal>
    </Fragment>
)
}

export default EditContact;