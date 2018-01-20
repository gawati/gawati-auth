import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import ResetPassword from './components/ResetPassword';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegistrationPage} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route render={() => (
              <p>Invalid Path! - <Link to="/">Go Home</Link></p>
            )} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
