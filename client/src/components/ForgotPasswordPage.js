import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class ResetPasswordPage extends Component {
  state = { email: '', errors: '', success: '' }

  handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }

  reset = () => {
    this.setState({ info: '', success: '' });
    const { email } = this.state;
    axios.post('/forgot-password', {
      email
    })
    .then(response => {
      console.log('server response:', response);
      if(response.data.errorType === 'validation') {
        this.setState({ errors: response.data.errors });
      } else {
        this.setState({ success: response.data });
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
              Gawati | Reset Password
            </Header>
            <Form size='large' onSubmit={this.reset}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  name='email'
                  label='Put your Email here'
                  placeholder='E-mail address'
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <Button>Send Reset Link</Button>
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
