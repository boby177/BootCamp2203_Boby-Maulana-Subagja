import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../img/others/foramu_logo.png'
import HowToRegIcon from '@mui/icons-material/HowToReg';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        "http://localhost:3001/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        alert("Register Successfully");
      } else {
        setAuth(false);
        alert(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // Save Image
  // const [image, setImage] = useState("https://fakeimg.pl/350x200/");
  // const [saveImage, setSaveImage] = useState(null);

  // function handleUploadChange(e) {
  //   let uploaded = e.target.files[0];
  //   setImage(URL.createObjectURL(uploaded));
  //   setSaveImage(uploaded);
  // }

  // function handleSave() {
  //   if (saveImage) {
  //     // save image to backend
  //     let formData = new FormData();
  //     formData.append("photo", saveImage);

  //     fetch("http://localhost:3001/api/upload", {
  //       method: "POST",
  //       // headers: { "Content-Type": formData },
  //       body: formData,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         window.location = '/profile';
  //       });
  //   } else {
  //     alert("Upload image first");
  //   }
  // }

  return (
    <Fragment>
      <Container>
  <Row>
    <Col>
      <h2 className="mt-5 text-center"> <HowToRegIcon /> Register Foramu</h2>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-primary ">Register</button>
      </form>
      Already have account? Login <Link to="/login" style={{textDecoration: 'none'}}>Here</Link>
    </Col>
    <Col>
    <img src={Logo} width= '100%' />
    {/* <div className="container">
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
              Upload your photo profile
            </label>
            <input
              onChange={handleUploadChange}
              className="form-control"
              type="file"
              id="formFile"
            />
          </div>
        </div>
      </div>
    </div> */}
    </Col>
    </Row>
    </Container>
    </Fragment>
  );
};

export default Register;