import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class RegistratioPage extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

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
            {' '}Gawati | Sign-Up
          </Header>
          <Form size='large' onSubmit={this.emailSignup}>
            <Segment stacked>
              
            <Form.Group>
              <Form.Input placeholder='First name' />
              <Form.Input  placeholder='Last name' />
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
              
              
              <Button color='teal' fluid size='large'>
                  Sign Up
              </Button>
            </Segment>
            <p style={{ color: 'red' }}>{ this.state.error }</p>
            <strong>or</strong>
            <Segment stacked>
              
              
                <Button color='blue' fluid size='large'>Sign Up with Facebook</Button>
                <br/>
                <Button color='red' fluid size='large'>Sign Up with Google</Button>
              </Segment>
          </Form>
          <Message>
            Already a member ? <Link to="/login" href='#'>Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
    );
}
}

export default RegistratioPage;

