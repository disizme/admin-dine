import React, { Component } from 'react'
import store from "../../../Store"
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import BrandLogo from '../../../components/shared/reseller_logo/BrandLogo';
import { addSuccessMessage } from '../../../actions/successMessage/success_message';
import { changePassword } from '../../../actions/login/login_helper';

export default class ForgetPass extends Component{
    state = {
        passes: {
            pass: "",
            repass: ""
        },
        error: false
    }
    
    onChange(e){
        let {name, value} = e.target
        let passes= {...this.state.passes}
        passes[name] = value
        this.setState({passes})
    }

    changePass(e){
        e.preventDefault()
        let passes = {...this.state.passes}
        if(passes.pass === passes.repass && passes.pass !== ""){
            let key = this.props.match.params.resettoken
            let postData = { 
                key: key,
                password: passes.pass
            }
            store.dispatch(changePassword(postData, this.props.history))
        } else {
            this.setState({error: true})
            // store.dispatch(addSuccessMessage({
            //     message: { variant: `error`, message: "Passwords do not match", title: `` }
            //   }))
        }
    }

    render(){
        const {error} = this.state
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
                                <Form onSubmit={(e) => this.changePass(e)}>
                                            <FormGroup className="mb-4">
                                                <Label for="pass">Password</Label>
                                                <Input type="password" placeholder="Password" autoComplete="current-password"
                                                    name="pass" id="pass"
                                                    value={this.state.passes.pass}
                                                    onChange={e => this.onChange(e)}
                                                    pattern="[A-Za-z0-9#$^+=!*()@%&]{8,}"
                                                    title="Must contain at least 8 Characters"
                                                    invalid={this.state.error}
                                                />
                                            </FormGroup>
                                            <FormGroup className="mb-4">
                                                <Label for="repass">Repeat Password</Label>
                                                <Input type="password" placeholder="Repeat Password" autoComplete="current-password"
                                                    name="repass" id="repass"
                                                    title="Must contain at least 8 Characters"
                                                    value={this.state.passes.repass}
                                                    onChange={e => this.onChange(e)}
                                                    pattern="[A-Za-z0-9#$^+=!*()@%&]{8,}"
                                                    invalid={this.state.error}
                                                />
                                            </FormGroup>
                                            <div className='p-2'>
                                        <div className='text-center'>
                                            <Button className="btn brand-btn" type="submit">
                                                Change Password
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
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

        
        
        
// <div className='gray-bg login-page pt-4'>
// <div className="fadeIn mx-auto p-4" style={{width: '60vw', minWidth: '300px',maxWidth:'600px'}}>
//             <div className="ibox-content">
//             <h3 className="np-color" >{localize('forgot_password')}?</h3>
//             <div className="px-2">
//                 <form className="m-t" onSubmit={(e) => this.changePass(e)}>
//                     <div className="form-group">
//                         <label>{localize('new_pass')}</label>
//                         <input type="password" name='new_password' 
//                             className={`form-control ${error && 'error'} `} placeholder="Enter New Password"
//                             onChange={(e) => this.onChange(e)} 
//                              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$" 
//                              title="Must contain at least one capital letter, one number and one non-alphanumeric character (For example: !, $, #, or %) and at least 8 or more characters"
//                             required />
//                     </div>
//                     <div className="form-group">
//                         <label>{localize('confirm_pass')}</label>
//                         <input type="password" name='new_password_confirmation' 
//                             className={`form-control ${error && 'error'} `} placeholder="Confirm New Password"
//                             onChange={(e) => this.onChange(e)} 
//                             // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$" 
//                             // title="Must contain at least one capital letter, one number and one non-alphanumeric character (For example: !, $, #, or %) and at least 8 or more characters"
//                            required />
//                     </div>
//                     <div className='text-center'>
//                     <button type="submit" className="btn btn-primary modal-button ml-0" >
//                         {localize('change_pass')}</button>
//                     </div>
//                 </form>
//                 </div>

//             </div>
//     </div>
// </div>