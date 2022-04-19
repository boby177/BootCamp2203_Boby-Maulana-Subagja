import ReactDOM from 'react-dom'
import MainContent from './mainContent';
import Nav from './nav';
import Button from './buttonClick';
import './style.css';

function renderDOM(content, id) {
    ReactDOM.render(content, document.getElementById(id))
}

// Dalam pemanggilan variabel nya, harus wajib diawali huruf besar 
renderDOM(<MainContent />, 'root')
renderDOM(<Nav />, 'nav')
renderDOM(<Button />, 'button')