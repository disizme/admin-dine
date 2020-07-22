import React, { Component } from 'react';
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    Row
  } from 'reactstrap';
import { FaUtensils } from "react-icons/fa";
import { connect } from 'react-redux';
import store from '../../../../Store';
import userProfile from '../../../../actions/diners/admin/user_profile';
import Inputs from '../../../shared/diners/Inputs';
import MainLogo from '../../../shared/diners/logo/MainLogo';
import customerCheckin from '../../../../actions/diners/customer/customer_checkin';

class CheckIn extends Component{
   slug= this.props.match.params.slug
    state={
      data: {
        name: "",
        email: "",
        // address:"",
        phone_number: "",
        postcode: ""
      }
    }


    componentDidMount(){
        if(!this.props.userProfile.success){
            store.dispatch(userProfile(this.slug))
        }
    }

    onChange(e) {
      let { name } = e.target;
      let { value } = e.target;
      let { data } = { ...this.state };
      data[name] = value;
      this.setState({ data: {...data}});
    }

    onSubmit(e){
        e.preventDefault()
        store.dispatch(customerCheckin(this.state.data, this.props.match.params.slug))
    }

    componentDidUpdate(prevProps){
      let { customerCheckin } = this.props;
      if (customerCheckin !== prevProps.customerCheckin) {
          let { success, error } = customerCheckin;
          if(success){
            this.props.history.push(`/customer-dine/${this.slug}/menu`)
        }else if(error){
        }
      }
    }

    render(){
      const { data } = this.state
      let allInputs = [
        {
          name: "name",
          placeholder: "Name",
          type: "text",
          value: data.name,
          required: true
        },
        {
          name: "email",
          placeholder: "Email",
          type: "email",
          value: data.email,
          required: true,
        },
        // {
        //   name: "address",
        //   placeholder: "Address",
        //   type: "text",
        //   value: data.address,
        //   required: true,
        // },
        {
          name: "phone_number",
          placeholder: "Contact No.",
          type: "tel",
          value: data.phone_number,
          pattern: "[0-9]{7,10}",
          required: true
        },
        {
          name: "postcode",
          placeholder: "Postal Code",
          type: "text",
          value: data.postcode,
          required: true,
          pattern: "[0-9]{4}"
        }
      ]

      return <div className="App check-in d-flex flex-row align-items-center">
      <Container>
      <Row className="justify-content-center">
        <Col xs='8' md='6' lg='5' sm='7' style={{minWidth: '320px'}}>
          <Card className="check-in-card">
            <CardBody >
              <MainLogo className="text-center"
                photo={this.props.userProfile.success ? this.props.userProfile.success.data.photo : null} />
                <div className="text-center">
                  <h4>{this.props.userProfile.success ? this.props.userProfile.success.data.name : ""} </h4>
                  <p className="text-muted">Please Check-in</p>
                </div>
                <Form className="px-2" onSubmit={(e) => this.onSubmit(e)}>
                  {
                    allInputs.map(i=> {
                      return <Inputs input={i} key={i.name}
                        onChange={(e) => this.onChange(e)} />
                    })
                  }
                <div className="text-center mt-3">
                  <p className="mb-1"><small>I agree to the terms and conditions by checking in to this application.</small></p>
                  <p xs="6">
                      <Button className="px-4 brand-component" type='submit'>
                      <FaUtensils className="mr-1" />
                          Check-in
                      </Button>
                  </p>
                  <p className="mb-1 brand-color"><small>Powered by Dinemate</small></p>
                </div>
                </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
    }
}

function mapStateToProps(state) {
    let { customerCheckin, userProfile } = state
    return {
      customerCheckin, userProfile
    }
  }
  
  export default connect(mapStateToProps)(CheckIn)
  