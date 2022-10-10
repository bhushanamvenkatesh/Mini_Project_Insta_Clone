import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import NotFound from './components/NotFound'

import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import UserProfile from './components/UserProfile'
// import InstaContext from './Context/InstaContext'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/not-found" component={NotFound} />
      <Route exact path="/" component={Home} />
      <Route eact path="/profile" component={Profile} />
      <Route exact path="/users/:userId" component={UserProfile} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
