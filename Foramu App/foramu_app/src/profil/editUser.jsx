// import React, { Fragment, useState, useEffect } from "react";
// import { Button, Modal, InputGroup, FormControl, Form } from "react-bootstrap";

// const CreateSubForum = () => {
//   const [newName, setName] = useState("");
//   const [newDesc, setDesc] = useState("");
//   const [forum, setForum] = useState([]);
//   const [idForum, setIdForum] = useState([]);
//   const [namaForum, setNamaForum] = useState([]);

//   const getForum = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/forum/");
//       const jsonData = await response.json();

//       setForum(jsonData);
      
//     } catch (err) {
//       console.error(err.message);
//     }
//   };


//   const addSubForum = async (e) => {
//     e.preventDefault();
//     try {
//       const body = { newName, newDesc, setIdForum };
//       await fetch(`http://localhost:3001/sub_forum/add_forum`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });
//       alert("New sub forum has been added");
//       window.location = "/sub_forum";
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     getForum();
//   }, []);

//   // Modal function
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   console.log(forum);
//   // forum.map((item) => {
//   return (
//     <Fragment>
//       <Button variant="outline-dark" onClick={handleShow}>
//         Add Sub Forum
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title> Input Data Sub Forum</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <InputGroup size="sm" className="mb-3">
//             <InputGroup.Text size="sm"> Name Sub Forum </InputGroup.Text>
//             <FormControl
//               aria-label="small"
//               type="text"
//               aria-describedby="inputGroup-sizing-sm"
//               name="name"
//               value={newName}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </InputGroup>

//           <InputGroup size="sm" className="mb-3">
//             <InputGroup.Text size="sm"> Forum Category </InputGroup.Text>
//             <select 
//             value={idForum}
//             onChange={(e) => {
//               setIdForum(e.target.value)
//             }}
//             >
//               <option> Choose Forum </option>
//               {forum.map((item) => {
//                 <option
//                 value={item.id_forum}
//                 onChange={(e) => {
//                   setForum(e.target.value)
//                 }}
//                 >
//                   {item.id_forum} . {item.name_forum}
//                 </option>
//               })}
//             </select>
//               {/* <Form.Select aria-label="Default select example">
//               <option>Choose Forum</option>
//               {forum.map((item) => {
//                 <option value={newCategory}>{item.name_forum}</option>
//                 console.log(item.id_forum, item.name_forum)
//               })}
//               onChange={(e) => setCategory(e.target.value)}
//             </Form.Select> */}
//           </InputGroup>

//           <InputGroup size="sm" className="mb-3">
//             <InputGroup.Text size="sm"> Description </InputGroup.Text>
//             <FormControl
//               aria-label="small"
//               type="text"
//               aria-describedby="inputGroup-sizing-sm"
//               name="name"
//               value={newDesc}
//               onChange={(e) => setDesc(e.target.value)}
//             />
//           </InputGroup>

//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="success" onClick={addSubForum}>
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Fragment>
//   );
// // })
// };

// export default CreateSubForum;
