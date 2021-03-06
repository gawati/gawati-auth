import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class ResetPasswordPage extends Component {
  state = { password: '', confirmPassword: '', errors: '', redirect: false }

  handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }

  reset = () => {
    this.setState({ errors: '' });
    const { password, confirmPassword } = this.state;
    axios.post('/reset-password', {
      password, confirmPassword
    })
    .then(response => {
      console.log('server response:', response);
    })
    .catch(error => {
      console.log('something went wrong!', error);
    });
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/reset-password' />;
    }

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
              <Image src='../logo.png' />
              Gawati | Reset Password
            </Header>
            <Form size='large' onSubmit={this.reset}>
              <Segment stacked>
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
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  name='confirmPassword'
                  placeholder='Re-enter Password'
                  type='password'
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />
                <Button>Change Password</Button>
              </Segment>
            </Form>
            { this.state.errors ? <Message error list={this.state.errors} /> : null }
            { this.state.success ? <Message success list={this.state.success} /> : null }
            <Message>
              <Link to="/login">&#8592; Back to Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default ResetPasswordPage;
