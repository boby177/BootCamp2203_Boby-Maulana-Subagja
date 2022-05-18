import React, { Fragment, useState, useEffect } from "react";
import { Button, Modal, InputGroup, FormControl, Form } from "react-bootstrap";
import Select from 'react-select'

const CreateSubForum = () => {
  const [newName, setName] = useState("");
  const [newDesc, setDesc] = useState("");
  const [idForum, setIdForum] = useState("");
  const [forum, setForum] = useState([]);
  // const [namaForum, setNamaForum] = useState([]);

  const options = [
    { value: '1', label: 'games'},
    { value: '2', label: 'news'},
    { value: '3', label: 'anime'}
  ]

  const getForum = async () => {
    try {
      const response = await fetch("http://localhost:3001/forum/");
      const jsonData = await response.json();

      setForum(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };


  const addSubForum = async (e) => {
    e.preventDefault();
    try {
      const body = { newName, newDesc, idForum };
      console.log(body)
      await fetch(`http://localhost:3001/sub_forum/add_forum`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("New sub forum has been added");
      window.location = "/sub_forum";
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getForum();
  }, []);

  // Modal function
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(forum);
  // forum.map((item) => {
  return (
    <Fragment>
      <Button variant="outline-dark" onClick={handleShow}>
        Add Sub Forum
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Input Data Sub Forum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Name Sub Forum </InputGroup.Text>
            <FormControl
              aria-label="small"
              type="text"
              aria-describedby="inputGroup-sizing-sm"
              name="name"
              value={newName}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>

          {/* <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Forum Category </InputGroup.Text>
            <select 
            value={idForum}
            onChange={(e) => {
              setIdForum(e.target.value)
            }}
            >
              <option> Choose Forum </option>
              {forum.map((item) => {
                <option
                value={item.idForum}
                onChange={(e) => {
                  setForum(e.target.value)
                }}
                >
                  {item.id_forum} . {item.name_forum}
                </option>
              })}
            </select>
              console.log(item.id_forum, item.name_forum)
          </InputGroup> */}

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Forum Category </InputGroup.Text>
              <Form.Select aria-label="Default select example"
              value={idForum}
              onChange={(e) => setIdForum(e.target.value)}>
              <option>Choose Here</option>
              <option value='1'>Games</option>
              <option value='2'>News</option>
              <option value='3'>Technology</option>
              <option value='4'>Anime</option>
              <option value='5'>Football</option>
              <option value='6'>Other</option>
              onChange={(e) => setIdForum(e.target.value)}
            </Form.Select>
          </InputGroup> 

          {/* <Select options={options} /> */}

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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={addSubForum}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
// })
};

export default CreateSubForum;
