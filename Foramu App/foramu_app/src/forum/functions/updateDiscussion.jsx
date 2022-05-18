import React, { Fragment, useState } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const EditDiscussion = ({ discussion }) => {
  const [updateTitle, setUpdateTitle] = useState(discussion.title_post);
  const [updateDesc, setUpdateDesc] = useState(discussion.desc_post);
  // const [forum, setForum] = useState(discussion.desc_post);
  // const [sub_forum, setSubForum] = useState(discussion.desc_post);
  const [image, setImage] = useState("");
  const [saveImage, setSaveImage] = useState(null);

  const updateDiscussion = async (e) => {
    e.preventDefault();
    try {
      const body = { updateTitle, updateDesc };
      console.log(body)
      await fetch(`http://localhost:3001/discussion/update/${discussion.id_post}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("Discussion has been updated");
      window.location.reload(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Image Discussion
  function handleUploadChange(e) {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  }

  function handleSave() {
    if (saveImage) {
      // save image to backend
      let formData = new FormData();
      formData.append("photo", saveImage);

      fetch(`http://localhost:3001/api/upload/discussion/${discussion.id_post}`, {
        method: "POST",
        // headers: { "Content-Type": 'enctype-multipart' },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          window.location = '/discussion';
        });
    } else {
      alert("Upload image first");
    }
  }

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
          <Modal.Title> Update Data Discussion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Name Title </InputGroup.Text>
            <FormControl
              aria-label="small"
              type="text"
              aria-describedby="inputGroup-sizing-sm"
              name="name"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text size="sm"> Description </InputGroup.Text>
            <FormControl
              aria-label="small"
              as="textarea" 
              rows={5}
              aria-describedby="inputGroup-sizing-sm"
              name="name"
              value={updateDesc}
              onChange={(e) => setUpdateDesc(e.target.value)}
            />
          </InputGroup>

          <div className="container">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="w-20 mt-5 mx-auto">
          <div>
            <img src={image} className="img-thumbnail" alt="..." />
          </div>
          <div className="my-3">
            <label htmlFor="formFile" className="form-label">
              Upload image here
            </label>
            <input
              onChange={handleUploadChange}
              className="form-control"
              type="file"
              id="formFile"
            />
            <Button onClick={handleSave} variant= 'outline-primary' className="mt-2 w-100">
              <AddPhotoAlternateIcon />Update Photo Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
        </Modal.Body>
        <br />
        <Modal.Footer>
          <Button variant="outline-success" onClick={updateDiscussion}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EditDiscussion;
