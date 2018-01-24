import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import ResetPassword from './ResetPassword';
import Dashboard from './Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegistrationPage} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route path="/dashboard" component={Dashboard}/>
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
