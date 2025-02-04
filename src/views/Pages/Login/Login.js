import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../page.css'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  FormGroup,
  Row,
  Label
} from 'reactstrap';
import { getLoginRequest } from "../../../actions/login/login_request";
import { addSuccessMessage } from "../../../actions/successMessage/success_message";
import store from "../../../Store"
import { connect } from "react-redux";
import BrandLogo from '../../../components/shared/reseller_logo/BrandLogo';
import { getLoggedInUser } from '../../../actions/login/get_logged_in_user';

let dataFormat= {username: "", password: ""}

class Login extends Component {
  state = {
    data: {...dataFormat},
    error: {...dataFormat},
    touched: {username: false, password: false}
  }


  onChange(e) {
    let { name } = e.target;
    let { value } = e.target;
    let data = { ...this.state.data };
    let error = { ...this.state.error };
    let touched ={...this.state.touched}
    data[name] = value;
    touched[name]=true
    error[name] = '';
    this.setState({ data, error,touched });
  }

  onSubmit(e) {
    let { data } = { ...this.state }
    e.preventDefault()
    if(data.username && data.password){
      store.dispatch(getLoginRequest(data))
    }
  } 

  componentDidUpdate(prevProps) {
    let { getLoginRequest } = this.props;

    if (getLoginRequest !== prevProps.getLoginRequest) {
      let { success, error } = getLoginRequest;
      if (success) {
        if (success.data) {
          let data = success.data
          // if(checkAdmin(data.user.roles)){
            localStorage.setItem('Bearer', data.access);
            localStorage.setItem('rt', data.refresh);
            // localStorage.setItem('user', data.user.email);
            // localStorage.removeItem('redirect')
            store.dispatch(getLoggedInUser());
            this.props.history.push("/dashboard");
          // }else{
          //   store.dispatch(addSuccessMessage({
          //     message: { variant: `error`, message: "This user does not have admin permission!", title: `` }
          //   }))
          // }
        }
      }
    }
  }

  render() {
    return (
      <div className='page'>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col xs='8' md='6' lg='5' sm='7' style={{minWidth: '350px'}}>
              <Card >
                <CardBody >
                  <BrandLogo />
                    <div className="text-center">
                      {/* <h1>Login</h1> */}
                      <p className="text-muted">Sign In to your account</p>
                    </div>
                    <Form onSubmit={(e) => this.onSubmit(e)}>
                    <FormGroup className="mb-3">
                      <Label for="username">Username</Label>
                      <Input type="text" placeholder="Username"
                        name="username" id="username"
                        value={this.state.data.username}
                        invalid = {this.state.touched.username && this.state.data.username===''}
                        onChange={e => this.onChange(e)} />
                      <FormFeedback>Enter Username</FormFeedback>
                    </FormGroup>
                    <FormGroup className="mb-4">
                      <Label for="password">Password</Label>
                      <Input type="password" placeholder="Password" autoComplete="current-password"
                        name="password" id="password"
                        value={this.state.data.password}
                        onChange={e => this.onChange(e)}
                        invalid = {this.state.touched.password && this.state.data.password===''}
                      />
                      <FormFeedback>Enter Password</FormFeedback>
                    </FormGroup>
                    <div className="text-center">
                      <p xs="6">
                        <Button className="px-4 brand-btn" type='submit'>
                          Login
                          </Button>
                        <br/>
                        <Button  type='button' color="link" className="px-0" active tabIndex={-1}>Forgot Password?</Button>
                      </p>
                      <div>
                      </div>
                      <div xs='8'>
                        Don't Have an Account?
                          <p>
                          <Link to="/register">
                            <Button  type='button' color="link" className="px-0" active tabIndex={-1}>Sign Up Here!</Button>
                          </Link>
                        </p>
                      </div>
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
  let { getLoginRequest, successMessage } = state
  return {
    getLoginRequest, successMessage
  }
}

export default connect(mapStateToProps)(Login)
