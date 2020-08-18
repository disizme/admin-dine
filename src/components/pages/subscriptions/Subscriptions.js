import React, { useState, useRef, useEffect } from 'react'
import { Row, Col, Card, CardBody, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
// import store from "../../../Store"
import { connect } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InjectedCheckoutForm from './CheckoutForm';
import Store from '../../../Store';
import fetchPlans from '../../../actions/subscription/fetch_plans';
import { addSuccessMessage } from '../../../actions/successMessage/success_message';
import fetchMyPlan from '../../../actions/subscription/fetch_my_plan';
import { subscriptionReset } from '../../../actions/subscription/get_subscription';
import { Config } from '../../../Config';
import { cancelSubscription, cancelSubReset } from '../../../actions/subscription/cancel_subscription';
import CardDetail from './CardDetail';

const stripePromise = loadStripe(Config.stripe_key);

function UserSubscriptions(props){
    const paymentdetail = useRef(null);
    const [initSub, setInitSub] = useState()
    const [subs, setSubs] = useState()
    const [ pay, setPay ] = useState(false)
    const [ cancelConfirm, setConfirm ] = useState(false)
    const [ high, setHeight ] = useState(0)

    useEffect(() => {
      if(!props.fetchPlans.success){
        Store.dispatch(fetchPlans())
      }
      if(!props.fetchMyPlan.success){
        Store.dispatch(fetchMyPlan())
      }      
    }, [])

    useEffect(() => {
      let {success} = props.getSubscription
      if(success){
        Store.dispatch(addSuccessMessage({
          message: {variant: `success`, message: "Your Subscription has been updated.", title: ``}
        }))
        Store.dispatch(subscriptionReset())
        setPay(false)
        setHeight(0)
      }
    }, [props.getSubscription])

    useEffect(() => {
      let {success} = props.fetchMyPlan
      if(success && success.data){
          if(success.data.subscription_id){
            setInitSub(success.data)
            setSubs(success.data)
          }else if(success.data.details){
            setInitSub()
          }
      }
    }, [props.fetchMyPlan])

    useEffect(() => {
      let {success} = props.cancelSubscription
      if(success){
        Store.dispatch(addSuccessMessage({
          message: {variant: `success`, message: "Your Subscription has been canceled.", title: ``}
        }))
        Store.dispatch(cancelSubReset())
        Store.dispatch(fetchMyPlan())

      }
    }, [props.cancelSubscription])

    function updatePayment(id){
      let selected = props.fetchPlans.success.data.find(i => i.subscription_id === id)
      setSubs(selected)
      setPay(true)
      setHeight(paymentdetail.current.clientHeight + 80)
    }

    function toggleConfirmation(){
      setConfirm(!cancelConfirm)
    }

    function cancelSub(){
      Store.dispatch(cancelSubscription())
      setConfirm(false)
    }

    return <><Row className="app align-items-center" style={{ minHeight: '0vh'}}>
    <Col xs='12'>
      <Card>
      <CardHeader style={{
          display: "flex", justifyContent: "space-between", flexGrow: "1", alignItems: "center",
          padding: "0.55rem 1.25rem"
        }}>
          <div>
          <i className="fa fa-clipboard-check mr-2"/>
          Subscription Plans
          </div>
        </CardHeader>
        <CardBody className="p-4">
          {initSub && <div className="offer-box mb-3 py-3">
            <div>
            {initSub.amount !== 0 && <button className="float-right btn btn-default btn-secondary sub-cancel"
              onClick={() => toggleConfirmation()}>
              <i className="fa fa-ban mr-1"/>
                Cancel Subscription
              </button>}
            You are currently under <b>{initSub.name}</b> subscription plan.
            </div>
          </div>
            
          }
          {props.fetchPlans.success ? <Row className="mb-3 justify-content-center animated fadeIn">
            { 
              props.fetchPlans.success.data.map(i => {
                return <Col lg="4" md="4" sm="6" key={i.id} className="flex-item mb-3">
                  <div className="offer-box" onClick={() => updatePayment(i.subscription_id)}>
                   {subs && subs.id === i.id && <div className="float-right selected-offer">
                      <i className="fa fa-check-circle"/>
                    </div>}
                    <h4>{i.name}</h4>
                    <h2>$ {i.amount}</h2>
                    <div>
                      {i.offer.map(j => {
                        return <div key={j}>
                          <b>
                            <i className="fa fa-check mr-2"/>
                            {j}
                          </b>
                          </div>
                      })}
                    </div>
                  </div>
                </Col>
              })
            }
          </Row>
          : <Card>
                <CardBody className="text-center"><i className="fa fa-spin fa-spinner" /></CardBody>
              </Card>}
            <Row className="justify-content-center">
              <Col xs='8' md='6' lg='5' sm='7' style={{ minWidth: '350px' }} >
              <div className={`${pay ? 'is-expanded' : ''}`}>
                <div className="payment-collapse" style={{ height: high + "px" }}>
                  <div ref={paymentdetail}>
                    { <Elements stripe={stripePromise}>
                      <InjectedCheckoutForm 
                        selectedPlan={subs}
                        initialSub={initSub} 
                        fetchCoupon={props.fetchCoupon}
                        />
                    </Elements>}
                  </div>
                </div>
                {/* {!expand && <div className="text-right mx-2 mb-3">
                  <Button className="brand-btn btn-sm"
                    disabled={props.total === 0}
                    onClick={() => startPayment()}>Make Payment
                </Button>
                </div>} */}
              </div>
              </Col>
            </Row>
        </CardBody>
      </Card>
    </Col>
  </Row>
  {props.fetchMyPlan.success && !props.fetchMyPlan.success.data.mode && <CardDetail />}
  {cancelConfirm && <Modal isOpen={cancelConfirm} toggle={() => toggleConfirmation()}>
        <ModalHeader>Subscription Cancellation</ModalHeader>
        <ModalBody className="text-center">
        <div className="text-left mb-2">
          Are you sure you want to cancel your subscription to plan <b>{initSub.name}</b>?
          </div>          
        </ModalBody>
        <ModalFooter>
          <Button className="brand-btn" onClick={() => cancelSub()}>Yes</Button>{' '}
          <Button className="brand-outline-btn" onClick={() => toggleConfirmation()}>No</Button>
        </ModalFooter>
      </Modal>}
  </>
}


function mapStateToProps(state) {
    let { getLoggedInUser, fetchPlans, getSubscription, fetchMyPlan, cancelSubscription, fetchCoupon } = state
    return {
      getLoggedInUser, fetchPlans, getSubscription, fetchMyPlan, cancelSubscription, fetchCoupon
    }
  }
  
  export default connect(mapStateToProps)(UserSubscriptions)