import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, Card, Row, Col } from "react-bootstrap";
import AddComment from './functions/createComment'
import EditDiscussion from "./functions/updateDiscussion";
import { Link } from 'react-router-dom'
// import Ads1 from "../img/others/ads1.png"

const ListDiscussion = (props) => {

  const [discussion, setDiscussion] = useState([]);
  const [comment, setComment] = useState([])

  const getDiscussion = async () => {
    try {
      const response = await fetch('http://localhost:3001/discussion/detail/'+props.match.params.id);
      const jsonData = await response.json();

      setDiscussion(jsonData);
    } catch (err) {
      console.error(err.message)
    }
}

  const getComment = async () => {
    try {
      const response = await fetch('http://localhost:3001/comment/')
      const jsonData = await response.json()

      setComment(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getComment()
  }, [])

  useEffect(() => {
    getDiscussion()
  }, [])

  // Function delete comment
const deleteComment = async (id_comment) => {
  try {
    console.log(id_comment)
    await fetch(`http://localhost:3001/comment/delete_comment/${id_comment}`, {
      method: "DELETE"
    },  
    alert('Comment has been deleted')) 

    setComment(comment.filter(comments => comments.id_comment !== id_comment));
  } catch (err) {
    console.error(err.message);
  }
};

  console.log(discussion)
  // console.log(post)

  return (
    <Fragment>
      <h1> <center> Data Discussion </center> </h1>
      <br />
      <div style={{float: "right", marginRight: "20px"}}>
      {/* <CreateDiscussion /> */}
      </div>
      <div className="container">
      <Row xs={1} md={1} className="g-3">
  {Array.from (discussion).map((item, idx) => (
    <Col>
      <Card>
          <div className="container" style={{textAlign: 'justify'}}>
        <Card.Body >
          <Card.Title>{item.title_post}</Card.Title>
          <br />
          <Card.Text>
            {item.desc_post}
          </Card.Text>
          {/* <Card.Img variant="top" src="https://fakeimg.pl/550x300/ff0000,128/000,255" /> */}
          <center>
          <img src={item.img_post} width='50%' />
          </center>
          <br />
        </Card.Body>
          </div>
      </Card>
    </Col>
  ))}
</Row>
      </div>
      <br /> <br />
  <br />
  <div className="container">
  <AddComment />
    <br />
    <center>
    <h2> Comments from foramus </h2>
    </center>
  <br /> 
  <Row xs={1} md={1} className="g-4">
  {Array.from( comment ).map((item, idx) => (
    <Col>
      <Card border="danger">
        <Card.Body>
          <Card.Title>Foramus User</Card.Title>
          <Card.Text>
            {item.desc_comment} <br />
            <hr />
            {item.date_comment}
          </Card.Text>
          <Button onClick={ () => deleteComment(item.id_comment)} variant="outline-danger" style={{ position: "absolute", marginLeft: "1190px", marginTop: "-135px"}}>Delete</Button>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
</div>
    </Fragment>
  );

};

export default ListDiscussion;