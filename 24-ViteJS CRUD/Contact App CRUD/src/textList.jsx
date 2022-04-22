import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
// import contacts from './contact'
import axios from "axios";
import {uid} from "uid"
let api = axios.create({ baseURL: "hhttp://localhost:8000" });

export default function Contact() {
  const [contacts, setContact] = useState([]);

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  //
  useEffect(() => {
    // mengambil data contact json
    axios.get("http://localhost:8000/contacts").then((res) => {
      console.log(res.data);
      setContact(res?.data ?? []);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    let data = [...contacts];

    if (formData.name === "") {
      return false;
    }
    if (formData.email === "") {
      return false;
    }
    if (formData.mobile === "") {
      return false;
    }

    if (isUpdate.status) {
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.name = formData.name;
          contact.email = formData.email;
          contact.mobile = formData.mobile;
        }
      });
      
      axios.put(`http://localhost:8000/contacts/${isUpdate.id}`), {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile
      }.then((res) =>{
          alert("Berhasil mengubah data")
      })
      // update berdasarkan id
    } else {
      let toSave = {
        id: uid(),
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile
      };
      data.push(toSave);

      axios.post(`http://localhost:8000/contacts/`, toSave).then((res) => {
      alert("Berhasil menyimpan data");
    });

      // menambahkan data
      api.post("/contacts", toSave).then(() => {
        alert("Data berhasil ditambah");
      });
    }
    setContact(data);
    setIsUpdate(false);
    setFormData({ name: "", email: "", mobile: "" });
  }

  function handleChange(e) {
    let newFormState = { ...formData };
    newFormState[e.target.name] = e.target.value;
    setFormData(newFormState);
  }

  function deleteContact(id) {
    let data = [...contacts];
    let filteredData = data.filter((contact) => contact.id !== id);
    setContact(filteredData);

    axios.delete(`http://localhost:8000/contacts/${id}`).then((res) => {
      alert("Berhasil menghapus data");
    });
  }

  function updateContact(id) {
    let data = [...contacts];
    let foundData = data.find((contact) => contact.id === id);
    setFormData({
        name: foundData.name,
        email: foundData.email,
        mobile: foundData.mobile,
    });
    setIsUpdate({ id: id, status: true });

    // axios.put(`http://localhost:8000/contacts/${isUpdate.id}`)
  }

  const listContact = contacts.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <div style={{ float: "left" }}>
          <div style={{ margin: "13px" }}>
            <br></br>
            {/* Show data contact */}
            <Card border="primary" style={{ width: "22rem" }}>
              <Card.Header> Data Contact WGS Bootcamp</Card.Header>
              <Card.Body>
                <Card.Title>
                  {item.name}
                  <Button
                    variant="outline-info"
                    style={{ float: "right" }}
                    onClick={() => updateContact(item.id)}
                  >
                    Update
                  </Button>
                </Card.Title>
                <Card.Text> {item.email} </Card.Text>
                <Card.Text>
                  {" "}
                  {item.mobile}
                  <Button
                    variant="outline-danger"
                    style={{ float: "right" }}
                    onClick={() => deleteContact(item.id)}
                  >
                    Delete
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </React.Fragment>
    );
  });

  return <div>
      {/* Form Add Data contact */}
      <div className="form">
      <h1 className="px-3 py-3 font-weight-bold"><center> Add New Contact </center></h1>
              <form onSubmit={handleSubmit} className="px-3 py-4">
                <div className="form-group">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                    defaultValue={formData.name}
                    name="name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                    defaultValue={formData.email}
                    name="email"
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="">Mobile</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    defaultValue={formData.mobile}
                    className="form-control"
                    name="mobile"
                  />
                </div>
                <div>
                  <button type="submit" className="btn btn-outline-primary w-100 mt-3">
                    Submit
                  </button>
                </div>
              </form>
            </div>
      {listContact}</div>;
}
