import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import NotFound from './components/NotFound'

import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import UserProfile from './components/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'

// import InstaContext from './Context/InstaContext'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />

      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/users/:userId" component={UserProfile} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
