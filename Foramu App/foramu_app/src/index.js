import ReactDOM from 'react-dom'
// import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Footer from './footer';
import './App.css';
// import Nav from './components/navLink';
// import Nav from './nav';

function renderDOM(content, id) {
  ReactDOM.render(content, document.getElementById(id))
}

// Dalam pemanggilan variabel nya, harus wajib diawali huruf besar 
renderDOM(<App />, 'root')
renderDOM(<Footer />, 'footer')
// renderDOM(<Button />, 'button')

reportWebVitals();
