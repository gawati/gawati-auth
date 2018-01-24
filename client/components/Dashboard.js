import React from 'react';
import { Link } from 'react-router-dom';
import { Message, Button } from 'semantic-ui-react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  login() {
    
  }

  render() {
    return (
      <React.Fragment>
        <Message>
          <Message.Header>User dashboard</Message.Header>
          <Message.List>
            <Message.Item>Name: Guest</Message.Item>
            <Message.Item>Email: N/A</Message.Item>
          </Message.List>
        </Message>
        <Link to="/login">
          <Button onClick={this.login}>Login</Button>
        </Link>
      </React.Fragment>
    );
  }
};

export default Dashboard;
