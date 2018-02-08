import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import LogoutPage from './components/LogoutPage';
import DashboardPage from './components/DashboardPage';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route path="/register" component={RegistrationPage} />
            <Route exact path="/forgot-password" component={ForgotPasswordPage} />
            <Route path="/reset-password/:token" component={ResetPasswordPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route path="/dashboard" component={DashboardPage} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
