// import "./App.css";
import { useEffect, useState, Fragment } from "react";
import { Button, Row, Col, Form, Container } from "react-bootstrap";
// import ImageDb from '../../../node/image/upload/'
import ExitToApp from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function Profile({ setAuth }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:3001/dashboard/", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
    //   console.log(parseData)
      setName(parseData.user_name);
      setEmail(parseData.user_email);
      setImage(parseData.user_img);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      alert("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // const [image, setImage] = useState("https://fakeimg.pl/350x200/");
  const [saveImage, setSaveImage] = useState(null);

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

      fetch("http://localhost:3001/api/upload", {
        method: "POST",
        // headers: { "Content-Type": 'enctype-multipart' },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          window.location = '/profile';
        });
    } else {
      alert("Upload image first");
    }
  }

  return (
    <Fragment>
      <Container>
    <center>
      <h1> {name} Profile</h1>
    </center>
    <div style={{float: 'right'}}>
      <Button onClick={e => logout(e)} variant="outline-danger">
        <ExitToApp /> Logout
      </Button>
    </div>

    <Row>
    <Col>
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
    </Col>

    <Col>
    <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
    <Form>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" value={name} disabled />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="*******" disabled />
  </Form.Group>
</Form>
</div>
    </Col>
    <Col>
    <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" value={email} disabled/>
    {/* <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text> */}
  </Form.Group>
  <br />
  {/* <Link to={"/profiles/edit"}>  */}
            <Button variant="primary" disabled>
          Edit Profile 
            </Button>
          {/* </Link>  */}
            <br />
</Form> 

      </div>
    </Col>
    </Row>
    </Container>
    </Fragment>
  );
}

export default Profile;