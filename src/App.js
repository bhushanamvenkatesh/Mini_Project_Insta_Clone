import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import NotFound from './components/NotFound'

import Login from './components/Login'
import Home from './components/Home'
// import InstaContext from './Context/InstaContext'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/not-found" component={NotFound} />
      <Route exact path="/" component={Home} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
