import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class LogoutPage extends Component {
  state = { email: '', errors: '', success: '' }

  handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }

  logout = () => {
    localStorage.removeItem('user');
    var afterLogoutUrl = localStorage.getItem('afterLogoutUrl');
    if(afterLogoutUrl!=null){
        localStorage.removeItem('afterLogoutUrl');
        window.location.replace(afterLogoutUrl);
    }else{
        this.props.history.push("login");
    }
  }

  getParameterByName = (name, url) => {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    checkRedirect = () => {
        var afterLogoutUrl = this.getParameterByName('afterLogoutUrl');
        if(afterLogoutUrl!=null && afterLogoutUrl!=undefined){
            localStorage.setItem('afterLogoutUrl', afterLogoutUrl);
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
              <Image src='/logo.png' /> Gawati | Logout
            </Header>
            <p> Are you really want to logout ? </p>
             <Button color='teal' fluid size='large' onClick={this.logout}>Logout</Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LogoutPage;

