import React from 'react'
import { Card, CardGroup } from 'react-bootstrap'
import contacts from './contact'

// const list = [{ data: 'tags1'}, { data: 'tags2'}, { data: 'tags3'}, { data: 'tags3'}]

export default function Contact(){
    const listContact = contacts.map((item) => {
        return (
                <div style={{float: 'left'}}>
                    <div style={{margin: '13px'}}>
                        <br></br>
                            <Card border="primary" style={{ width: '22rem' }}>
                                <Card.Header> Data Contact WGS Bootcamp</Card.Header>
                                <Card.Body>
                                <Card.Title>{item.Name} </Card.Title>
                                <Card.Text> {item.Email} </Card.Text>
                                <Card.Text> {item.Mobile} </Card.Text>
                                </Card.Body>
                            </Card>
                    </div>
                </div>
            )
    })

    return (
        <div>
            {listContact}
        </div>
    )
}