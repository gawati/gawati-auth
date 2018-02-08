import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Button, Form, Grid, Header, Image, Message, Segment 
} from 'semantic-ui-react';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class RegistratioPage extends Component {
  state = { 
    firstName: '', lastName: '', gender: '', email: '', password: '', confirmPassword: '', info: '', success: ''
  }

  handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }

  emailSignup = () => {
    this.setState({ info: '' });

    const { firstName, lastName, gender, email, password, confirmPassword } = this.state;
    
    axios.post('/register', {
      name: firstName + lastName,
      gender,
      email,
      password, 
      confirmPassword
    })
    .then(response => {
      console.log('server response:', response);
      if(response.data.name === 'VALIDATION_ERROR') {
        this.setState({ info: response.data.message });
      } else if(response.data.name === 'UserExistsError') {
        this.setState({ info: ['Email is already registered with us'] });
      } else if(response.data._id) {
        localStorage.setItem('user', JSON.stringify(response.data));
        this.setState({ success: ['Account created succesfully!'] });
        this.props.history.push("dashboard");
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
            <Image src='/logo.png' /> Gawati | Sign-Up
          </Header>
          <Form size='large' onSubmit={this.emailSignup}>
            <Segment stacked>
              <Form.Group>
                <Form.Input placeholder='First name' name='firstName' value={this.state.firstName} onChange={this.handleChange} />
                <Form.Input style={{ marginRight: '10px' }} placeholder='Last name' name='lastName'value={this.state.lastName} onChange={this.handleChange} />
              </Form.Group>
              
                <Form.Select fluid options={genderOptions} name="gender" placeholder='Gender' onChange={this.handleChange}/>
              
              <br /> 
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
            <strong>or</strong>
            <Segment stacked>
              <Button color='blue' fluid size='large'>Sign Up with Facebook</Button>
              <br />
              <Button color='red' fluid size='large'>Sign Up with Google</Button>
            </Segment>
          </Form>
          {
            this.state.info ? <Message error list={this.state.info} /> : null
          }
          {
            this.state.success ? <Message success list={this.state.success} /> : null
          }
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

