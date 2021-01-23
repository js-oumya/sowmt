import SignIn from './components/admin/SignIn'
import Dashboard from './components/admin/Dashboard'
import UserRegistration from './components/user/UserRegistration'


import { BrowserRouter as Router, Route } from "react-router-dom";
function App(props) {
  return (
    <div>
      <Router>
      <Route exact strict component={SignIn} path="/SignIn" history={props.history} />
      <Route exact strict component={UserRegistration} path="/UserRegistration" history={props.history} />
      <Route exact strict component={Dashboard} path="/Dashboard" history={props.history} />
     
      </Router>
    </div>
  );
}

export default App;
