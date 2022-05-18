import React, { Fragment, useState } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";

const EditForum = ({ forum }) => {
  const [updateName, setUpdateName] = useState(forum.name_forum);
  const [updateDesc, setUpdateDesc] = useState(forum.desc_forum);
  // const [updateDate, setUpdateDate] = useState(forum.date_forum);

  const updateForum = async (e) => {
    e.preventDefault();
    try {
      const body = { updateName, updateDesc };
      await fetch(`http://localhost:3001/forum/update/${forum.id_forum}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("Forum has been updated");
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
      <Button variant="outline-success" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Update Data Forum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Name Forum </InputGroup.Text>
            <FormControl
              aria-label="small"
              type="text"
              aria-describedby="inputGroup-sizing-sm"
              name="name"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Description </InputGroup.Text>
            <FormControl
              aria-label="small"
              type="text"
              aria-describedby="inputGroup-sizing-sm"
              name="name"
              value={updateDesc}
              onChange={(e) => setUpdateDesc(e.target.value)}
            />
          </InputGroup>

          {/* <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Date </InputGroup.Text>
            <FormControl
              aria-label="small"
              type="date"
              aria-describedby="inputGroup-sizing-sm"
              name="name"
              value={updateDate}
              onChange={(e) => setUpdateDate(e.target.value)}
            />
          </InputGroup> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={updateForum}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EditForum;
