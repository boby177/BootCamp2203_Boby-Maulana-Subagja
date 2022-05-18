import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, Card, Row, Col } from "react-bootstrap";
// import AddComment from './functions/createComment'
// import EditDiscussion from "./functions/updateDiscussion";
import { Link } from 'react-router-dom'
// import Ads1 from "../img/others/ads1.png"
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material';

const ListUsers = (props) => {

  const [users, setuser] = useState([]);

  const getusers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      const jsonData = await response.json();

      setuser(jsonData);
    } catch (err) {
      console.error(err.message)
    }
}

  useEffect(() => {
    getusers()
  }, [])

  console.log(users)
  // console.log(post)

  return (
    <Fragment>
      <div className='container'>
      <h1> <center> List Data User Foramus </center> </h1>
      <br />
      <Row xs={1} md={3} className="g-3">
  {Array.from (users).map((item, idx) => (
    <Col>
      <CardActionArea>
      <Card>
        {/* <Card.Img variant="top" src="https://fakeimg.pl/250x100/ff0000,128/000,255" /> */}
        {/* <img src="https://fakeimg.pl/350x200/ff0000,128/000,255" /> */}
        <Card.Body >
          <center>
          <img src={item.user_img} width='30%'/>
          </center>
          <Card.Title>{item.user_name}</Card.Title>
          <Card.Text>
            <span>
            {item.user_email}
            </span>
          </Card.Text>        
          </Card.Body>
      </Card>
  </CardActionArea>
    </Col>
  ))}
</Row>
<br />
{/* <Image style={{ width: "1000px", marginLeft: "125px", width: '1000px'}} src={Ads1}></Image> */}
</div>
</Fragment>
  );

};

export default ListUsers;