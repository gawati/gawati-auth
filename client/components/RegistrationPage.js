import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class RegistratioPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', password: '', confirmPassword: '', info: '' }

    this.handleChange = this.handleChange.bind(this);
    this.emailSignup = this.emailSignup.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  emailSignup() {
    const { name, email, password, confirmPassword } = this.state;
    axios.post('/register', {
      name, email, password, confirmPassword
    })
    .then(response => {
      console.log('server response:', response.data);
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
            {' '}Koo | Sign-Up
          </Header>
          <Form size='large' onSubmit={this.emailSignup}>
            <Segment stacked>
              
            <Form.Group>
              <Form.Input placeholder='First name' name='name' value={this.state.name} onChange={this.handleChange} />
              <Form.Input placeholder='Last name' />
            </Form.Group>
            <br/>
            <Form.Group>
            <Form.Select style={{width: '185px'}}   fluid options={options} placeholder='Gender' />
            <Form.Select  style={{width: '185px'}}   fluid  options={options} placeholder='Age' />
          </Form.Group>
             <br/> 
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
              
              <Button color='teal' fluid size='large'>
                  Sign Up
              </Button>
            </Segment>
            <p style={{ color: 'green' }}>{ this.state.info }</p>
            <strong>or</strong>
            <Segment stacked>
                <Button color='blue' fluid size='large'>Sign Up with Facebook</Button>
                <br/>
                <Button color='red' fluid size='large'>Sign Up with Google</Button>
              </Segment>
          </Form>
          <Message>
            Already a member ? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
    );
}
}

export default RegistratioPage;

