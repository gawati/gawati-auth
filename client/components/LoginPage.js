import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', info: '' }

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  login() {
    const { email, password } = this.state;
    axios.post('/login', {
      email, password
    })
    .then(response => {
      console.log('server response:', response);
      if(response.data.email === this.state.email) {
        window.location = '/dashboard';
      }
    })
    .catch(error => {
      console.log('something went wrong!', error);
    });
  }

  render() {
    return (
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png' />
              {' '}Koo | Login
            </Header>
            <Form size='large' onSubmit={this.login}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  name='email'
                  placeholder='E-mail address'
                  value={this.state.email}
                  onChange={this.handleChange}
                />

                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  name='password'
                  placeholder='Password'
                  type='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />

                <Button color='teal' fluid size='large'>Login</Button>
              </Segment>
            </Form>
            <Message>
              <Link to="/reset-password">Forgot Password</Link> | Don't have account ? <Link to="/register">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginPage;
