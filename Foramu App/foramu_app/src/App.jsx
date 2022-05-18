import React, { Fragment, useState, useEffect } from "react"
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component  Modules
import Home from "./home"
import Forum from "./forum/mainForum"
import SubForum from "./forum/subForum"
import SubForums from "./forum/listDetailForum"
import Discussion from "./forum/discussion"
import Discusions from "./forum/listDetailDiscussion"
import Discussions from "./forum/listDiscussion"
import Navigation from './components/navbar'
import Login from './components/login'
import Register from './components/register'
import Dashboard from './components/dashboard'
import Profile from './profil/profile'
import Users from './profil/users'
import EditProfile from './profil/editUser'
// import EditDiscussion from './forum/functions/updateDiscussion'

const App = () => {
  async function isAuth() {
    try {
      const response = await fetch('http://localhost:3001/auth/verify', {
        method: 'POST',
        headers: {jwt_token : localStorage.token}
      })

      const parseRes = await response.json()
      // console.log(parseRes)
      parseRes === true ? setIsAuthenticated(true): setIsAuthenticated(false)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    isAuth()
  })
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }


  return (
    <Fragment>
    <Router>
      <Navigation />
      <Switch>
        {/* <Route exact path="/">
          <Home />
        </Route> */}
        {/* <Route path="/forum">
          <Forum />
        </Route>
        <Route path="/sub_forum">
          <SubForum />
        </Route>
        <Route path="/discussion">
          <Discussion />
        </Route> */}
        <Route path='/sub_forums/detail/:id' component={SubForums} />
        <Route path='/discusions/detail/:id' component={Discusions} />
        <Route path='/discussions/detail/:id' component={Discussions} />
        <Route path='/profiles/edit' component={EditProfile} />
        {/* <Route path='/discusion/detail/:id' component={EditDiscussion} /> */}
        {/* <Route exact path='/profiles/edit' render={props => isAuthenticated ?<EditProfile {...props} setAuth={setAuth}/> : <Redirect to='/login' />} /> */}
        <div className="container">
        {/* <Route exact path='/profile' render={props => <Profile {...props} />}/> */}
        <Route exact path='/users' render={props => <Users {...props} />}/>
        <Route exact path='/login' render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth}/> : <Redirect to='/' />} />
        <Route exact path='/register' render={props => !isAuthenticated ? <Register {...props} setAuth={setAuth}/> :<Redirect to='/login' />} />
        <Route exact path='/' render={props => isAuthenticated ?<Home {...props} setAuth={setAuth}/> : <Redirect to='/login' />} />
        {/* <Route exact path='/' render={props => isAuthenticated ?<Login {...props} setAuth={setAuth}/> : <Redirect to='/login' />} /> */}
        <Route exact path='/forum' render={props => isAuthenticated ?<Forum {...props} setAuth={setAuth}/> : <Redirect to='/forum' />} />
        <Route exact path='/sub_forum' render={props => isAuthenticated ?<SubForum {...props} setAuth={setAuth}/> : <Redirect to='/sub_forum' />} />
        <Route exact path='/discussion' render={props => isAuthenticated ?<Discussion {...props} setAuth={setAuth}/> : <Redirect to='/discussion' />} />
        <Route exact path='/profile' render={props => isAuthenticated ?<Profile {...props} setAuth={setAuth}/> : <Redirect to='/login' />} />
        {/* <Route exact path='/users' render={props => isAuthenticated ?<Users {...props} setAuth={setAuth}/> : <Redirect to='/login' />} /> */}
        </div>
      </Switch>
    </Router>
    </Fragment>
  );
};

export default App;
