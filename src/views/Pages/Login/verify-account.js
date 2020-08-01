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
                        <Col xs='8' md='8' lg='8' sm='8' style={{ minWidth: '350px' }}>
                            <Card>
                                <CardBody >
                                    <BrandLogo />
                                    <h5 className="my-2 text-center" >
                                        Click the button below to verify your Dinemate account.</h5>
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