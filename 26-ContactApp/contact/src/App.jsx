import React, {useState, useEffect, Fragment} from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import EditContact from "./functions/updateContact";
import DetailContact from "./functions/detailContact";
import CreateContact from "./functions/createContact";
import DeleteContact from "./functions/deleteContact";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    try {
      const response = await fetch('http://localhost:3001/contacts/');
      const jsonData = await response.json();

      setContacts(jsonData);
    } catch (err) {
      console.error(err.message)
    }
}

  useEffect(() => {
    getContacts();
  }, []);

  const deleteContact = async (id) => {
    try {
      console.log(id)
      await fetch(`http://localhost:3001/contact/${id}`, {
        method: "DELETE"
      },  
      alert('Data has been deleted')) 
      getContacts();

      setContacts(contacts.filter(contact => contact.contact_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

    console.log(contacts)
    return (
      <Fragment>
        <h1> <center> Data contacts </center> </h1>
        {/* {contacts ? contacts : 'There is no data available'} */}
        <br />
        <CreateContact />
        <br /> <br />
        <Table striped bordered hover>
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Email</th>
        {/* <th>Mobile</th> */}
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {contacts.map((item, i) => (
        <tr key={item.id}>
        <td> {i+1} </td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        {/* <td>{item.mobile}</td> */}
        <td>
        <DetailContact contacts={item} /> {' '}
        <EditContact contacts={item} /> {' '}
        {/* <DeleteContact contacts={item} /> {' '} */}
        <Button variant="danger" onClick={ () => deleteContact(item.id)}>Delete</Button>
        </td>
      </tr>
    ))}
    </tbody>
  </Table>
  </Fragment>
    );
  
}

export default App;