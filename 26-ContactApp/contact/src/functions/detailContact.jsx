// import { set } from "express/lib/application";
import React, { Fragment, useState } from "react";
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';

const DetailContact = ({ contacts }) => {
    const [updateName, setUpdateName] = useState(contacts.name)
    const [updateEmail, setUpdateEmail] = useState(contacts.email)
    const [updateMobile, setUpdateMobile] = useState(contacts.mobile)

// Modal function
const [show, setShow] = useState(false);
const handleClose = () =>setShow(false);
const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Button variant="secondary" onClick={handleShow}>
        Detail
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title> Detail Data Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Name </InputGroup.Text>
            <FormControl
                aria-label="small"
                type="label"
                aria-describedby="inputGroup-sizing-sm"
                name="name"
                value={updateName}
                disabled
            />
            </InputGroup>

            <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Email </InputGroup.Text>
            <FormControl
                aria-label="small"
                type="label"
                aria-describedby="inputGroup-sizing-sm"
                name="name"
                value={updateEmail}
                disabled
            />
            </InputGroup>

            <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Mobile </InputGroup.Text>
            <FormControl
                aria-label="small"
                type="label"
                aria-describedby="inputGroup-sizing-sm"
                name="name"
                value={updateMobile}
                disabled
            />
            </InputGroup>

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
    </Modal>
    </Fragment>
)
}

export default DetailContact;