import React, {Fragment, useState} from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';
// import 'react-toastify/dist/ReactToastify.css';
import LoginIcon from '@mui/icons-material/Login';
import Logo from '../img/others/foramu_logo.png'

const Login = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const { email, password } = inputs

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value})
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {email, password}
            const response = await fetch('http://localhost:3001/auth/login', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })

            const parseRes = await response.json()
            // console.log(parseRes)

            if(parseRes.jwtToken) {
                localStorage.setItem('token', parseRes.jwtToken)
                setAuth(true);
                alert("Login Successfully");
            }else {
                setAuth(false)
                alert('Email or password is incorrect');
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <Container>
  <Row>
    <Col>
            <div style={{width: '100%'}}>
            <h2 className='text-center my-5'> <LoginIcon /> Login Foramu </h2>
            <form onSubmit={onSubmitForm} >
                <input type="email" name='email' placeholder='email' className="form-control my-3" value={email} onChange={e => onChange(e)}/>
                <input type="password" name='password' placeholder='password' className="form-control my-3" value={password} onChange={e => onChange(e)}/>
                <button className='btn btn-primary'> Submit </button>
            </form>
            New user? Register <Link to="/register" style={{textDecoration: 'none'}}> Here</Link>
            {/* <div style={{width: '70%'}}> */}
            {/* </div> */}
            </div>
    </Col>
    <Col>
    <img src={Logo} width= '100%' />
    </Col>
  </Row>
</Container>
        </Fragment>
    )
}

export default Login