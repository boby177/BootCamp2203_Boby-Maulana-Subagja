import React, { useState, useEffect, Fragment } from "react";
import { Image, Card, Button, Dropdown } from "react-bootstrap";
import Ads1 from "../img/others/Screenshot_8.png"
import Ads2 from "../img/others/ads13.png"
import Ads3 from "../img/others/ads10.jpg"
import { Link } from 'react-router-dom'
// import ListForum from "./listDetailForum"
import CreateForum from './functions/createForum'
import EditForum from './functions/updateForum'
// import CardActions from '@mui/material/CardActions';
// import Button from '@mui/material/Button';
// import SubForum from './subForum'
// import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
// import Navigation from '../components/navbar'

const Forum = () => {
  const [forum, setForum] = useState([]);

  const getForum = async () => {
    try {
      const response = await fetch("http://localhost:3001/forum/");
      const jsonData = await response.json();

      setForum(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getForum();
  }, []);

// Function delete forum
const deleteForum = async (id_forum) => {
  try {
    console.log(id_forum)
    await fetch(`http://localhost:3001/forum/delete_forum/${id_forum}`, {
      method: "DELETE"
    },  
    alert('Forum has been deleted')) 
    getForum();

    setForum(forum.filter(forums => forums.id_forum !== id_forum));
  } catch (err) {
    console.error(err.message);
  }
};

  console.log(forum);
  const listForum = forum.map((item) => {
    return (
      <Fragment key={item.id_forum}>
        <div className="container" style={{ width: "60%" }}>
          <Card className="text-center">
            <Card.Header>
              <Dropdown style={{float: 'left'}}>
  <Dropdown.Toggle variant="dark" id="dropdown-basic">
  </Dropdown.Toggle>
  
  <Dropdown.Menu>
    {/* <Dropdown.Item href="#/action-1"> */}
        <EditForum forum={item} />{' '}
              <Button onClick={ () => deleteForum(item.id_forum)} variant="outline-danger">Delete</Button>
    {/* </Dropdown.Item> */}
    {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
  </Dropdown.Menu>
</Dropdown>
            <div style={{marginLeft: '40%',width: '100%'}}>
          </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>{item.name_forum}</Card.Title>
              <Card.Text>{item.desc_forum}</Card.Text>
              {/* <ListForum forum={item}/> */}
              <Link to={"/sub_forums/detail/"+item.id_forum}> 
            <Button variant="outline-dark">
          Read more 
            </Button>
          </Link> 
          {/* <div style={{float: 'right', width: '100%'}}>
          <br />
        <EditForum forum={item} />{' '}
              <Button onClick={ () => deleteForum(item.id_forum)} variant="outline-danger">Delete</Button>
          </div> */}
            </Card.Body>
            <Card.Footer className="text-muted">
              Created: {item.date_forum}
            </Card.Footer>
          </Card>
          <br />
        </div>
      </Fragment>
    );
  });

  return (
      <Fragment>
    <div>
      <h1>
        {" "}
        <center>Forum List</center>{" "}
      </h1>
      <div style={{width: '100%'}}>
      <center>

      <CreateForum />
      </center>
      </div>
      {/* <Image style={{position: "absolute", marginLeft: "100px", marginBottom: "90px", height: '800px', width: '250px'}} src={Ads2}></Image>
      <Image style={{position: "absolute", marginLeft: "1200px", marginBottom: "90px", height: '800px', width: '250px'}} src={Ads3}></Image> */}
      <br />
      {listForum}
      {/* <Image style={{ width: "1000px", marginLeft: "275px"}} src={Ads1}></Image> */}
    </div>
      </Fragment>
  );
};

export default Forum;
