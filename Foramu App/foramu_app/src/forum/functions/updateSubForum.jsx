import React, { Fragment, useState } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";

const EditSubForum = ({ sub_forum }) => {
  const [updateName, setUpdateName] = useState(sub_forum.name_sub_forum);
  const [updateDesc, setUpdateDesc] = useState(sub_forum.desc_sub_forum);

  const updateSubForum = async (e) => {
    e.preventDefault();
    try {
      const body = { updateName, updateDesc };
      await fetch(`http://localhost:3001/sub_forum/update/${sub_forum.id_sub_forum}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("Sub Forum has been updated");
      window.location = "/sub_forum";
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
          <Modal.Title> Update Data Sub Forum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Name Sub Forum </InputGroup.Text>
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

        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={updateSubForum}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EditSubForum;
