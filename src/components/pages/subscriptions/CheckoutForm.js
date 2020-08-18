import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import Store from "../../../Store";
import { getSubscription } from "../../../actions/subscription/get_subscription";
import { Input, Button, Row, Col } from "reactstrap";
import fetchCoupon from "../../../actions/subscription/fetch_coupon";

let couponObj = {
      valid: false,
      info: false,
      percent: null,
      amount: null,
      total: null,
      processing: false,
      id: null
}

class CheckoutForm extends React.Component {
  state = {
    coupon: false,
    redeemed: {
      valid: false,
      info: false,
      percent: null,
      amount: null,
      total: null,
      processing: false,
      id: null
    },
    data: {
      name: "",
      coupon: ""
    },
    error: {
      name: false,
      coupon: false
    }
  }

  onChange = (e) => {
    let {value, name} = e.target
    let { data, error, redeemed } = { ...this.state };
    data[name] = value;
    error[name] = false
    if(name === "coupon"){
      redeemed = {...redeemed, ...couponObj}
    }
    this.setState({ data: {...data}, error: {...error}, redeemed: {...redeemed}});
  }

  redeemCoupon = () => {
    let d = {
      coupon: this.state.data.coupon
    }
    this.setState({redeemed : {...this.state.redeemed, processing: true}})

    Store.dispatch(fetchCoupon(d))
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.props.initialSub && this.props.initialSub.mode) {
      const { stripe, elements } = this.props;
      if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardElement);
      // const result = await stripe.createToken(card);
      // if (result.error) {
      //   console.log(result.error.message);
      // } else {
      //   console.log(result.token);
      // }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: card,
        "billing_details": {
          name: this.state.data.name
        }
      });

      if (error) {
        console.log('[error]', error);
      } else {
        let data = {
          price_id: this.props.selectedPlan.subscription_id,
          payment_method: paymentMethod.id,
        }
        if (this.state.coupon && this.state.redeemed.valid) {
          data.coupon = this.state.redeemed.id
        }
        Store.dispatch(getSubscription(data))
      }
    }else {
      let data = {
        price_id: this.props.selectedPlan.subscription_id,
      }
      if (this.state.coupon && this.state.redeemed.valid) {
        data.coupon = this.state.redeemed.id
      }
      Store.dispatch(getSubscription(data))
    }
  };

  componentDidUpdate(prevProps){
    let {fetchCoupon} = this.props
    if(fetchCoupon !== prevProps.fetchCoupon){
      let {redeemed} = {...this.state}
      if(fetchCoupon.success){
        redeemed.info = true
        redeemed.valid = fetchCoupon.success.data.valid
        redeemed.amount = fetchCoupon.success.data.amount_off
        redeemed.id = fetchCoupon.success.data.id
        if(fetchCoupon.success.data.amount_off){
          redeemed.total =  this.props.selectedPlan.amount - fetchCoupon.success.data.amount_off
        }else if(fetchCoupon.success.data.percent_off){
          redeemed.total =  this.props.selectedPlan.amount * (100 - fetchCoupon.success.data.percent_off)/100
        }
        redeemed.percent = fetchCoupon.success.data.percent_off
        redeemed.processing = false
        this.setState({redeemed})
      }else if(fetchCoupon.error){
        redeemed = {...redeemed, ...couponObj}
        this.setState({redeemed})
      }else if(fetchCoupon.processing){
        redeemed = {...redeemed, ...couponObj}
        this.setState({redeemed})
      }
    }
  }

  render() {
    const { redeemed} = this.state
    return (
      <div className="payment-box p-2  mx-auto">
        <div className="pb-2">
        <div className="pl-2">
        Selected Plan: <b className="pl-2">{this.props.selectedPlan && this.props.selectedPlan.name}</b>
        </div>
        <div className="pl-2">
        Charge: <b className="pl-1">$ {(redeemed.info && redeemed.valid) ? redeemed.total : this.props.selectedPlan && this.props.selectedPlan.amount}</b>
        </div>
        {redeemed.info && redeemed.valid && <div className="pl-2">
        Discount: <b className="pl-1">{redeemed.amount ? `$ ${redeemed.amount}` : redeemed.percent + "%"}</b>
        </div>}
        </div>
        <form onSubmit={this.handleSubmit}>
          {this.props.initialSub && this.props.initialSub.mode && <><label className="w-100">
            <span className="ml-2">
              Name
            </span>
            <div className="w-100">
              <Input type="text" placeholder="Enter Your Name"
                name="name" className="form-control StripeElement w-100" 
                value={this.state.data.name}
                onChange={e => this.onChange(e)}
                invalid={this.state.error.name}
                required
              />
            </div>
          </label>
          <CardSection /></>}
         {this.state.coupon ? <label className="w-100 mb-3">
            <span className="ml-2">
              Coupon
            </span>
            <div className="w-100">
              <Row>
                <Col className="col-9">
                  <Input type="text" placeholder="Coupon"
                    name="coupon" className="form-control StripeElement"
                    value={this.state.data.coupon}
                    onChange={e => this.onChange(e)}
                    invalid={this.state.error.coupon}
                  />
                </Col>
                <Col style={{ marginTop: "15px" }} className="col-3 pl-0" >
                  <Button outline type="button"
                    color={!redeemed.info ? "info" 
                    : redeemed.valid ? "success" : "danger"}
                    onClick={() => this.redeemCoupon()}
                    disabled={this.state.data.coupon === ""}
                  >
                    <i className={`fa fa-${redeemed.processing ? "spin fa-spinner " 
                      : !redeemed.info ? "gift" 
                      : redeemed.valid ? "check-circle  " : "exclamation-circle "}`} />
                  </Button>
                </Col>
              </Row>
            </div>
          </label>
          : <div>
            <u className="show-pointer brand-color" onClick={() => this.setState({coupon: !this.state.coupon})}>
              Redeem Coupon</u>
          </div>
          }
          <div className="text-right mx-2 mb-3">
          <button disabled={!this.props.stripe} className="btn btn-secondary brand-btn" type="submit">
            {this.props.initialSub && this.props.initialSub.mode ? "Pay" : "Change Plan"}
          </button>
          </div>
        </form> 
      </div>
    );
  }
}

export default function InjectedCheckoutForm(props) {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} 
          selectedPlan={props.selectedPlan}
          initialSub={props.initialSub}
          fetchCoupon={props.fetchCoupon}
           />
      )}
    </ElementsConsumer>
  );
}
