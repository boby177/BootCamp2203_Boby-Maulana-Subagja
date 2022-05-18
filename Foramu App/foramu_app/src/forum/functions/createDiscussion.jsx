import React, { Fragment, useState } from "react";
import { Button, Modal, InputGroup, FormControl, Form } from "react-bootstrap";

const CreateDiscussion = () => {
  const [newTitle, setTitle] = useState("");
  const [newDesc, setDesc] = useState("");
  const [idForum, setIdForum] = useState("");
  const [idSubForum, setIdSubForum] = useState("");
  

  const addDiscussion = async (e) => {
    e.preventDefault();
      try {
        const body = { newTitle, newDesc, idForum, idSubForum};
        await fetch(`http://localhost:3001/discussion/add_discussion`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          // formData
        });
        alert("New discussion has been added");
        window.location = "/discussion";
      } catch (err) {
        console.error(err.message);
      }
    // }
  };

  // function handleUploadChange(e){
  //   // Getting files from js
  //   console.log(e.target.files[0])
  //   let uploaded = e.target.files[0]
  //   console.log(URL.createObjectURL(uploaded))
  //   setImage(URL.createObjectURL(uploaded))
  //   setSaveImage(uploaded)
  // }

  // Modal function
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Button variant="outline-dark" onClick={handleShow}>
        Add Discussion
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg"> New Discussion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Title </InputGroup.Text>
            <FormControl
              aria-label="small"
              type="text"
              aria-describedby="inputGroup-sizing-sm"
              name="name"
              value={newTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>

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
          
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Sub Forum Category </InputGroup.Text>
              <Form.Select aria-label="Default select example"
              value={idSubForum}
              onChange={(e) => setIdSubForum(e.target.value)}>
              <option>Choose Here</option>
              <option value='1'>Genshin Impact</option>
              <option value='2'>Mobile Legend</option>
              <option value='3'>Local</option>
              <option value='11'>One Piece</option>
              <option value='5'>Programming</option>
              <option value='6'>Hardware</option>
              <option value='7'>EPL</option>
              <option value='8'>Serie A</option>
              <option value='9'>Harvest Moon</option>
              <option value='10'>Musik Anime</option>
              <option value='11'>Other</option>
              onChange={(e) => setIdSubForum(e.target.value)}
            </Form.Select>
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Description </InputGroup.Text>
            <FormControl
              aria-label="small"
              as="textarea" 
              rows={5}
              aria-describedby="inputGroup-sizing-sm"
              name="name"
              value={newDesc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </InputGroup>
{/* 
          <InputGroup size="sm" className="mb-3">
          <InputGroup.Text size="sm"> Upload Image: </InputGroup.Text>
            <FormControl
              aria-label="small"
              type="file"
              aria-describedby="inputGroup-sizing-sm" 
              className="form-control"
              accept="image/*"
              name="name"
              value={newImage}
              // onChange={(e) => setImage(e.target.value)}
              onChange={handleUploadChange}
            />
          </InputGroup> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={addDiscussion}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CreateDiscussion;
