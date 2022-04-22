import React,{useState} from 'react'
import { Toast, Button } from 'react-bootstrap';

const button = () => {
    const[count,setCount]=useState(0);
    const inc=()=>{
      setCount(count+1);
    }
    const dec=()=>{
      setCount(count-1);
    }
    return (
        <React.Fragment>
          <Toast>
          <Toast.Body>
        <Button onClick={inc} variant="outline-dark">add</Button>{' '}
        <Button onClick={dec} variant="outline-danger">reduce</Button>
        <hr></hr>
        <b> Quantity: {count} </b>
      </Toast.Body>

          </Toast>
        </React.Fragment>
    )
}
export default button