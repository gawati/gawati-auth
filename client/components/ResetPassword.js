import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const ResetPassword = () => (
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
          {' '}Koo | Reset Password
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input label='Put your Email here' placeholder='E-mail address' />
            <Button>Send Reset Link</Button>
          </Segment>
        </Form>
        <Message>
          <Link to="/login">&#8592; Back to Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

export default ResetPassword;
