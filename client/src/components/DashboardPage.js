import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class DashboardPage extends Component {

  handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }

  logout = () => {
    this.props.history.push("logout");
  }

  redirect = () => {
    var beforeLoginUrl = localStorage.getItem('beforeLoginUrl');
    if(beforeLoginUrl!=null){
        localStorage.removeItem('beforeLoginUrl');
        window.location.replace(beforeLoginUrl+"?token="+localStorage.getItem('user'));
    }else{
        //this.props.history.push("dasboard");
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
          button{
            margin:20px;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png' /> Gawati | Dasboard
            </Header>
            <Button color='teal' fluid size='large' onClick={this.logout}>Logout</Button><br></br>
            <Button color='teal' fluid size='large' onClick={this.redirect}>Redirect</Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default DashboardPage;

