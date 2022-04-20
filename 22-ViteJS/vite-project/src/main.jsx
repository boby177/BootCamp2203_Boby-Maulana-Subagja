import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Nav from './nav';
import Button from './button';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function renderDOM(content, id) {
  ReactDOM.render(content, document.getElementById(id))
}

renderDOM(<App />, 'root')
renderDOM(<Nav />, 'nav')
renderDOM(<Button />, 'button')
// renderDOM(<Bootstrap />, 'bootstrap')