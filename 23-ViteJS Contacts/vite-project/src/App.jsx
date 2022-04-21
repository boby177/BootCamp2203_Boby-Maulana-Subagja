import React from "react";
import { Toast } from 'react-bootstrap';

const mainContent = () => {
    return (
      <Toast>
        <Toast.Header>
          <strong className="me-auto">Button Add</strong>
          <small className="m-auto">click button to change number</small>
        </Toast.Header>
      </Toast>
    )
}

export default mainContent;