import React, { Fragment, useState } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";

const CreateForum = () => {
  const [newName, setName] = useState("");
  const [newDesc, setDesc] = useState("");
  // const [newDate, setDate] = useState("");

  const addForum = async (e) => {
    e.preventDefault();
    try {
      const body = { newName, newDesc };
      await fetch(`http://localhost:3001/forum/add_forum`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("New forum has been added");
      window.location = "/forum";
    } catch (err) {
      console.error(err.message);
    }
  };

  // Modal function
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Button variant="outline-dark" onClick={handleShow}>
        Add Forum
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Input Data Forum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Name Forum </InputGroup.Text>
            <FormControl
              aria-label="small"
              type="text"
              aria-describedby="inputGroup-sizing-sm"
              name="name"
              value={newName}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Description </InputGroup.Text>
            <FormControl
              aria-label="small"
              type="text"
              aria-describedby="inputGroup-sizing-sm"
              name="name"
              value={newDesc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </InputGroup>

          {/* <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Date </InputGroup.Text>
            <FormControl
              aria-label="small"
              type="date"
              aria-describedby="inputGroup-sizing-sm"
              name="name"
              value={newDate}
              onChange={(e) => setDate(e.target.value)}
            />
          </InputGroup> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={addForum}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CreateForum;
