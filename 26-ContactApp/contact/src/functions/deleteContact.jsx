// import { set } from "express/lib/application";
import React, { Fragment, useState } from "react";
import { Button } from 'react-bootstrap';

const DeleteContact = () => {
    const [contacts, setContacts] = useState([]);

    const delContact = async (id) => {
        try {
            console.log(id)
            await fetch(`http://localhost:3001/contact/${id}`, {
            method: "DELETE"
        },  
            alert('Data has been deleted')) 
            window.location = "/contacts";
    
            setContacts(contacts.filter(contact => contact.contact_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

return (
    <Fragment>
    <Button variant="danger" onClick={delContact}>
        Delete
    </Button>
    </Fragment>
    )
}

export default DeleteContact;