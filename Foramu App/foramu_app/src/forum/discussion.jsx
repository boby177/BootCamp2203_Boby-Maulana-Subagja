import React, {useState, useEffect, Fragment} from 'react';
import { Card, Row, Col, Button, Image, Dropdown } from 'react-bootstrap';
import CreateDiscussion from './functions/createDiscussion'
import EditData from './functions/updateDiscussion'
import { Link } from 'react-router-dom'
import Ads1 from "../img/others/ads2.jpg"

const Discussion = () => {
  const [discussion, setDiscussion] = useState([]);

  const getDiscussion = async () => {
    try {
      const response = await fetch('http://localhost:3001/discussion/');
      const jsonData = await response.json();

      setDiscussion(jsonData);
    } catch (err) {
      console.error(err.message)
    }
}

  useEffect(() => {
    getDiscussion();
  }, []);

// Function delete Discussion
const deletePost = async (id_post) => {
  try {
    console.log(id_post)
    await fetch(`http://localhost:3001/discussion/delete_discussion/${id_post}`, {
      method: "DELETE"
    },  
    alert('Discussion has been deleted')) 

    setDiscussion(discussion.filter(discussions => discussions.id_post !== id_post));
  } catch (err) {
    console.error(err.message);
  }
};

  console.log(discussion)
  return (
    <Fragment>
      <div className='container'>
      <h1> <center> List Discussions </center> </h1>
      <br />
      <CreateDiscussion />
      <br /> <br />
      <Row xs={1} md={3} className="g-3">
  {Array.from (discussion).map((item, idx) => (
    <Col>
      <Card>
      {/* <Card.Header>
            </Card.Header> */}
        <Card.Img variant="top" src={item.img_post} width='50%'/>
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
          <Link to={"/discussions/detail/"+item.id_post}> 
            <Button variant="outline-dark">
          Read more 
            </Button>
          </Link>{' '}
          <EditData discussion={item} />{' '}
          <Button onClick={ () => deletePost(item.id_post)} variant="outline-danger">Delete</Button>
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
{/* <Image style={{ width: "1000px", marginLeft: "125px", width: '1000px'}} src={Ads1}></Image> */}
</div>
</Fragment>
  );

}

export default Discussion;