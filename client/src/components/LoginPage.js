import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class LoginPage extends Component {
  state = { email: '', password: '', info: '' }

  handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }

  login = () => {
    this.setState({ info: '' });
    const { email, password } = this.state;
    axios.post('/login', {
      email, password
    })
    .then(response => {
      //console.log('server response:', response);
      if(response.data.errorType === 'validation') {
        this.setState({ info: response.data.errors });
      } else if(response.data === 401) {
        this.setState({ info: ['The email or password is incorrect'] });
      } else if(response.data._id) {
        localStorage.setItem('user', JSON.stringify(response.data));
        this.props.history.push("dashboard");
      } 
    })
    .catch(error => {
      console.log('something went wrong!', error);
    });
  }

  getParameterByName = (name, url)=>{
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    checkRedirect = () =>{
        var beforeLoginUrl = this.getParameterByName('beforeLoginUrl');
        if(beforeLoginUrl!=null && beforeLoginUrl!=undefined){
            localStorage.setItem('beforeLoginUrl', beforeLoginUrl);
        }
    }
    componentDidMount() {
        this.checkRedirect();
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
              <Image src='/logo.png' /> Gawati | Login
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
            {
              this.state.info ? <Message error list={this.state.info} /> : null
            }
            <Message>
              <Link to="/forgot-password">Forgot Password</Link> | Don't have account ? <Link to="/register">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginPage;

