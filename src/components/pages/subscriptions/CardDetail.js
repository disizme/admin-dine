import React, { useState, useEffect } from 'react'
import { Row, Col, Card, CardBody, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
// import store from "../../../Store"
import { connect } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InjectedCheckoutForm from './CheckoutForm';
import Store from '../../../Store';
import { addSuccessMessage } from '../../../actions/successMessage/success_message';
import { Config } from '../../../Config';
import UpdateCheckoutForm from './UpdateCardForm';

const stripePromise = loadStripe(Config.stripe_key);

function CardDetail(props) {
    const [updCard, setupdCard] = useState(false)

    useEffect(() => {
        let { success } = props.updateCard
        if (success) {
            Store.dispatch(addSuccessMessage({
                message: { variant: `success`, message: "Your Card has been updated.", title: `` }
            }))
            setupdCard(false)
        }
    }, [props.updateCard])

    return <>
        <Row className="app align-items-center" style={{ minHeight: '0vh' }}>
            <Col xs='12'>
                <Card>
                    <CardHeader style={{
                        display: "flex", justifyContent: "space-between", flexGrow: "1", alignItems: "center",
                        padding: "0.55rem 1.25rem"
                    }}>
                        <div>
                            Update Your Card
          </div>
                    </CardHeader>
                    <CardBody className="p-4">
                        <Row className="justify-content-center">
                            {updCard ? <Col xs='8' md='6' lg='5' sm='7' style={{ minWidth: '350px' }} >
                                {<Elements stripe={stripePromise}>
                                    <UpdateCheckoutForm/>
                                </Elements>}
                            </Col>
                            : <Button className="brand-btn" onClick={() => setupdCard(!updCard)}>
                                Update Card Details
                            </Button>
                            }
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </>
}


function mapStateToProps(state) {
    let { updateCard } = state
    return {
        updateCard
    }
}

export default connect(mapStateToProps)(CardDetail)