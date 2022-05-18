import React, { Fragment, useState } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";

const CreateComment = () => {
  const [newDesc, setDesc] = useState("");
  // const [newDate, setDate] = useState("");

  const addComment = async e => {
    e.preventDefault();
    try {
      const body = { newDesc };
      await fetch(`http://localhost:3001/comment/add_comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert('New comment has added')
      window.location.reload(false);
      // window.location = "/discussions/detail/:id";
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
        Add Comment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Input New Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Your comment </InputGroup.Text>
            <FormControl
              aria-label="small"
              as="textarea" 
              rows={3}
              aria-describedby="inputGroup-sizing-sm"
              name="name"
              value={newDesc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </InputGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={addComment}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CreateComment;
