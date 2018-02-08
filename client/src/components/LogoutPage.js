import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class LogoutPage extends Component {
  state = { email: '', errors: '', success: '' }

  handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }

  logout = () => {
    console.log(localStorage.getItem('user'));
    localStorage.removeItem('user');
    console.log(localStorage.getItem('user'));
    console.log(localStorage.getItem('afterLogoutUrl'));
    var afterLogoutUrl = localStorage.getItem('afterLogoutUrl');
    if(afterLogoutUrl!=null){
        localStorage.removeItem('afterLogoutUrl');
        window.location.replace(afterLogoutUrl);
    }else{
        this.props.history.push("login");
    }
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
              <Image src='/logo.png' /> Gawati | Logout
            </Header>
             <Button color='teal' fluid size='large' onClick={this.logout}>Logout</Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LogoutPage;

