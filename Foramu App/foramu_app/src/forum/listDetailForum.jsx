import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, Card, Row, Col } from "react-bootstrap";
// import AddComment from './functions/createComment'
// import EditDiscussion from "./functions/updateDiscussion";
import { Link } from 'react-router-dom'
// import Ads1 from "../img/others/ads1.png"

const ListForum = (props) => {

  const [forum, setForum] = useState([]);
  const [getForum] = useState([forum.name_forum]);

  const getSubForum = async () => {
    try {
      const response = await fetch('http://localhost:3001/sub_forum/detail/'+props.match.params.id);
      const jsonData = await response.json();

      setForum(jsonData);
    } catch (err) {
      console.error(err.message)
    }
}

  useEffect(() => {
    getSubForum()
  }, [])

  console.log()
  // console.log(post)

  return (
    <Fragment>
      <h1> <center> List Data Sub Forum </center> </h1>
      <br />
      <div style={{float: "right", marginRight: "20px"}}>
      {/* <CreateDiscussion /> */}
      </div>
      <div className="container">
      <Row xs={1} md={1} className="g-3">
  {Array.from (forum).map((item, idx) => (
      <Col>
      {/* <h1> <center> List Data Forum {item.name_forum} </center> </h1> */}
      <div className="container" style={{ width: "800px" }}>
          <Card className="text-center">
            <Card.Header>Forum {item.name_forum}</Card.Header>
            <Card.Body>
              <Card.Title>{item.name_sub_forum}</Card.Title>
              <Card.Text>{item.desc_sub_forum}</Card.Text>
              <Link to={"/discussion"}> 
            <Button variant="outline-dark">
          More Detail 
            </Button>
          </Link>
            </Card.Body>
            <Card.Footer className="text-muted">
              Created: {item.date_sub_forum}
            </Card.Footer>
          </Card>
          <br />
        </div>
    </Col>
  ))}
</Row>
      </div>
    </Fragment>
  );

};

export default ListForum;