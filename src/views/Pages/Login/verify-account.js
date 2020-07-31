import React, { Component } from 'react'
import store from "../../../Store"
import { verifyUserAccount } from '../../../actions/login/login_helper';
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Row,
} from 'reactstrap';
import BrandLogo from '../../../components/shared/reseller_logo/BrandLogo';

class verifyAccount extends Component {
    // state = {
    //     expire: false
    // }

    // static getDerivedStateFromProps(nextProps){
    //     if(nextProps.error && nextProps.error.response && nextProps.error.response.status === 401){
    //       return { expire: true};
    //    }
    //    else return null;
    //  }

    verifyUser() {
        let token = this.props.match.params.veritoken
        store.dispatch(verifyUserAccount(token, this.props.history))
    }

    render() {
        return <div className='page'>
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col xs='8' md='6' lg='5' sm='7' style={{ minWidth: '350px' }}>
                            <Card >
                                <CardBody >
                                    <BrandLogo />
                                    <h4 className="np-color text-center" >
                                        Click the button below to verify your Dinemate account.</h4>
                                    <div className='p-2'>
                                        <div className='text-center'>
                                            <Button className="btn brand-btn" 
                                                onClick={() => this.verifyUser()}>
                                                Verify your account
                                            </Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    }
}

export default verifyAccount