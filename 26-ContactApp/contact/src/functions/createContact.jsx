// import { set } from "express/lib/application";
import React, { Fragment, useState } from "react";
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';

const CreateContact = ({ contacts }) => {
    const [newName, setName] = useState("")
    const [newEmail, setEmail] = useState("")
    const [newMobile, setMobile] = useState("")

    const addContact = async e => {
    e.preventDefault();
    try {
        const body = { newName, newEmail, newMobile };
        const response = await fetch(
        `http://localhost:3001/add_contact`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }
    );
        alert('New contact has been added')
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
      <Button variant="primary" onClick={handleShow}>
        Add Contact
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
                value={newName}
                onChange={e => setName(e.target.value)}
            />
            </InputGroup>

            <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Email </InputGroup.Text>
            <FormControl
                aria-label="small"
                type="text"
                aria-describedby="inputGroup-sizing-sm"
                name="name"
                value={newEmail}
                onChange={e => setEmail(e.target.value)}
            />
            </InputGroup>

            <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Mobile </InputGroup.Text>
            <FormControl
                aria-label="small"
                type="text"
                aria-describedby="inputGroup-sizing-sm"
                name="name"
                value={newMobile}
                onChange={e => setMobile(e.target.value)}
            />
            </InputGroup>

        </Modal.Body>
        <Modal.Footer>
        <Button variant="success" onClick={addContact}>
            Submit
        </Button>
        </Modal.Footer>
    </Modal>
    </Fragment>
)
}

export default CreateContact;