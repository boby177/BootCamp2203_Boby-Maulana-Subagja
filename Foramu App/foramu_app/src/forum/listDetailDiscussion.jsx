import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, Card, Row, Col } from "react-bootstrap";
import CreateDiscussion from './functions/createDiscussion'
import { Link } from 'react-router-dom'
// import Ads1 from "../img/others/ads1.png"

const ListDiscussion = (props) => {

  const [subForum, setSubForum] = useState([]);
//   const [getForum] = useState([forum.name_forum]);

  const getDiscussion = async () => {
    try {
      const response = await fetch('http://localhost:3001/discussions/detail/'+props.match.params.id);
      const jsonData = await response.json();

      setSubForum(jsonData);
    } catch (err) {
      console.error(err.message)
    }
}

  useEffect(() => {
    getDiscussion()
  }, [])


  console.log()
  // console.log(post)

  return (
    <Fragment>
    <div className='container'>
    <h1> <center> List Discussions </center> </h1>
    {/* <br />
    <CreateDiscussion /> */}
    <br /> <br />
    <Row xs={1} md={3} className="g-3">
{Array.from (subForum).map((item, idx) => (
  <Col>
    <Card>
    {/* <Card.Header>
          </Card.Header> */}
      <Card.Img variant="top" src={item.img_post} />
      {/* <img src="https://fakeimg.pl/350x200/ff0000,128/000,255" /> */}
      <Card.Body >
        <Card.Title>{item.title_post}</Card.Title>
        <Card.Text>
          <span>
          {item.desc_post}
          </span>
        </Card.Text>
        <center>
          {/* <ListDiscussion disc={item}> */}
        <Link to="/discussion"> 
          <Button variant="outline-dark">
        Read more 
          </Button>
        </Link>{' '}
        {/* <div style={{ position: 'absolute', marginLeft: '230px', marginTop: '-118px'}}> */}
        {/* </div> */}
        </center>
        <br />
        <Card.Footer className="text-muted">
            Created By: {item.user_name} | {item.date_post}
        </Card.Footer>
      </Card.Body>
    </Card>
  </Col>
))}
</Row>
<br />
</div>
    </Fragment>
  );

};

export default ListDiscussion;