import React,{useState} from 'react'

const Button = () => {
    const[count,setCount]=useState(0);
    const inc=()=>{
      setCount(count+1);
    }
    return (
        <React.Fragment>
        <button onClick={inc} >Add</button>
        <br></br><br></br>
        <b> Quantity: {count} </b>
        </React.Fragment>
    )
}
export default Button