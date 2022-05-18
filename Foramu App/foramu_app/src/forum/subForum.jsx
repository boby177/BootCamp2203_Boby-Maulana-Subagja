import React, { useState, useEffect, Fragment } from "react";
import { Card, Button, Image, Dropdown } from "react-bootstrap";
import CreateSubForum from './functions/createSubForum'
import { Link } from 'react-router-dom'
import EditSubForum from "./functions/updateSubForum";
import Ads1 from "../img/others/ads1.png"
import Ads2 from "../img/others/ads3.jpg"
import Ads3 from "../img/others/ads4.png"

const SubForum = () => {
  const [sub_forum, setSubForum] = useState([]);

  const getSubForum = async () => {
    try {
      const response = await fetch("http://localhost:3001/sub_forum/");
      const jsonData = await response.json();

      setSubForum(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getSubForum();
  }, []);

// Function delete forum
const deleteSubForum = async (id_sub_forum) => {
  try {
    console.log(id_sub_forum)
    await fetch(`http://localhost:3001/sub_forum/delete_forum/${id_sub_forum}`, {
      method: "DELETE"
    },  
    alert('Forum has been deleted')) 
    getSubForum();

    setSubForum(sub_forum.filter(sub_forums => sub_forums.id_sub_forum !== id_sub_forum));
  } catch (err) {
    console.error(err.message);
  }
};

  console.log(sub_forum);
  const listSubForum = sub_forum.map((item) => {
    return (
      <Fragment key={item.id_sub_forum}>
        <div className="container" style={{ width: "800px" }}>
          <Card className="text-center">
            <Card.Header>
            <Dropdown style={{float: 'left'}}>
  <Dropdown.Toggle variant="dark" id="dropdown-basic">
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <EditSubForum sub_forum={item}/>{' '}
    <Button onClick={ () => deleteSubForum(item.id_sub_forum)} variant="outline-danger">Delete</Button>
  </Dropdown.Menu>
</Dropdown>
            </Card.Header>
            <Card.Body>
              <Card.Title>{item.name_sub_forum}</Card.Title>
              <Card.Text>{item.desc_sub_forum}</Card.Text>
              <Link to={"/discusions/detail/"+item.id_sub_forum}> 
            <Button variant="outline-dark">
          Read more 
            </Button>
          </Link> 
            </Card.Body>
            <Card.Footer className="text-muted">
              Created: {item.date_sub_forum}
            </Card.Footer>
          </Card>
          <br />
        </div>
      </Fragment>
    );
  });

  return (
    <div>
      <h1>
        {" "}
        <center>Sub Forum List</center>{" "}
      </h1>
      <div style={{width: '100%'}}>
        <center>
      <CreateSubForum />
        </center>
      </div>
      {/* <Image style={{position: "absolute", marginLeft: "100px", marginBottom: "90px", height: '800px', width: '250px'}} src={Ads2}></Image>
      <Image style={{position: "absolute", marginLeft: "1200px", marginBottom: "90px", height: '800px', width: '250px'}} src={Ads3}></Image> */}
      <br />
      {listSubForum}
      {/* <Image style={{ width: "1000px", marginLeft: "275px"}} src={Ads1}></Image> */}
    </div>
  );
};

export default SubForum;
