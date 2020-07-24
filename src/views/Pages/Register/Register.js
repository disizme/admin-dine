import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, FormGroup, Row, Label, FormFeedback } from 'reactstrap';
import BrandLogo from '../../../components/shared/reseller_logo/BrandLogo';
import './../page.css'
import { getSignupRequest } from "../../../actions/login/signup_request";
import { addSuccessMessage } from "../../../actions/successMessage/success_message";
import store from "../../../Store"
import { connect } from "react-redux";
// import { getLoggedInUser } from '../../../actions/login/get_logged_in_user';

let dataFormat = { username: "", email: "", password: "", repassword: "" }
let requiredKeys = [ "username", "email", "password", "repassword"]

class Register extends Component {
  state = {
    data: { ...dataFormat },
    error: { ...dataFormat },
    touched: { username: false, password: false, email: false, repassword: false }
  }

  onChange(e) {
    let { name } = e.target;
    let { value } = e.target;
    let data = { ...this.state.data };
    let error = { ...this.state.error };
    let touched = { ...this.state.touched }
    data[name] = value;
    touched[name] = true
    error[name] = '';
    this.setState({ data, error, touched });
  }

  onSubmit(e) {
    let { data, error } = { ...this.state }
    e.preventDefault()
    let dataKeys = Object.keys(error)
    for(let i = 0; i< dataKeys.length; i++){
      if((data[dataKeys[i]] === "" || data[dataKeys[i]].length<1) && requiredKeys.includes(dataKeys[i])){
        error[dataKeys[i]] = true 
      }
    }
    if(data.password && data.repassword){
      if(data.password !== data.repassword){
        error["repassword"] = true
      }
    }
    let checkedVal = Object.values(error)
    if(checkedVal.includes(true)){
      this.setState({error: {...error}})
    }else{
      let forwardData = {...data}
      delete forwardData.repassword
      store.dispatch(getSignupRequest(forwardData))
    }

  }

  componentDidUpdate(prevProps) {
    let { getSignupRequest } = this.props;

    if (getSignupRequest !== prevProps.getSignupRequest) {
      let { success, error } = getSignupRequest;
      if (success) {
        if (success.data) {
          let data = success.data
          store.dispatch(addSuccessMessage({
                message: { variant: `success`, message: "Please Login to continue!", title: `` }
              }))
            this.props.history.push("/login")
            
          // if(checkAdmin(data.user.roles)){
          // localStorage.setItem('Bearer', data.access_token);
          // localStorage.setItem('rt', data.refresh_token);
          // localStorage.setItem('user', data.user.email);
          // store.dispatch(getLoggedInUser(data.user));
          // this.props.history.push("/login");
          // }else{
          //   
          // }
        }
      }
      // else if (error) {
      //   if (error.response) {
      //     if (error.response.status === 422) {
      //       this.setState({
      //         error: error.response.data.message
      //       })
      //     } else {
      //       store.dispatch(addSuccessMessage({
      //         message: { variant: `error`, message: error.response.data.msg || error.response.data.message, title: `` }
      //       }))
      //     }

      //   } else {
      //     store.dispatch(addSuccessMessage({
      //       message: { type: `error`, message: error.message.toString(), title: `` }
      //     }))
      //   }
      // }
    }
  }

  render() {
    return (
      <div className='page'>
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col xs='8' md='6' lg='5' sm='7' style={{ minWidth: '350px' }} >
                <Card className="mt-3">
                  <CardBody>
                    <BrandLogo />
                    <Form onSubmit={(e) => this.onSubmit(e)}>
                      <div className="text-center">
                        <h4>Register</h4>
                        <p className="text-muted">Create your account</p>
                      </div>
                      <FormGroup className="mb-3">
                        <Label for="Username">Username</Label>
                        <Input type="text" placeholder="Username"
                          name="username" id="username"
                          value={this.state.data.username}
                          invalid={this.state.touched.username && (this.state.data.username === '' || this.state.error.username)}
                          onChange={e => this.onChange(e)} />
                        <FormFeedback>Enter Username</FormFeedback>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <Label for="email">Email</Label>
                        <Input type="text" placeholder="Email"
                          name="email" id="email"
                          value={this.state.data.email}
                          onChange={e => this.onChange(e)}
                          invalid={this.state.touched.email && (this.state.data.email === '' || this.state.error.email)}
                        />
                        <FormFeedback>Enter Email Address</FormFeedback>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <Label for="password">Password</Label>
                        <Input type="password" placeholder="Password"
                          name="password" id="password"
                          value={this.state.data.password}
                          onChange={e => this.onChange(e)}
                          invalid={this.state.touched.password && (this.state.data.password === '' || this.state.error.password)}
                        />
                        <FormFeedback>Enter Password</FormFeedback>
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Label for="repassword">Repeat Password</Label>
                        <Input type="password" placeholder="Repeat password"
                          name="repassword" id="repassword"
                          value={this.state.data.repassword}
                          onChange={e => this.onChange(e)}
                          invalid={this.state.touched.repassword && (this.state.data.repassword === '' || this.state.error.repassword)}
                        />
                        <FormFeedback>Re-enter Password</FormFeedback>
                      </FormGroup>
                      <div className="text-center">
                        <p xs="6">
                          <Button className="brand-btn" type='submit'>
                            Create Account</Button>
                        </p>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { getSignupRequest, successMessage } = state
  return {
    getSignupRequest, successMessage
  }
}

export default connect(mapStateToProps)(Register)