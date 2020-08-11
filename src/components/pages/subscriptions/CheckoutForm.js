import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import Store from "../../../Store";
import { getSubscription } from "../../../actions/subscription/get_subscription";

class CheckoutForm extends React.Component {

  handleSubmit = async event => {
    event.preventDefault();

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

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      let data = {
        price_id: this.props.selectedPlan.subscription_id,
        payment_method: paymentMethod.id
      }
      // console.log('[PaymentMethod]', paymentMethod);
      if(this.props.initialSub){
        Store.dispatch(getSubscription(data))
      }else{
        Store.dispatch(getSubscription(data, true))
      }
    }
  };

  render() {
    return (
      <div className="payment-box p-2  mx-auto">
        <div className="pl-2">
        Selected Plan: <b className="pl-2">{this.props.selectedPlan && this.props.selectedPlan.name}</b>
        </div>
        <div className="pl-2 pb-2">
        Charge: <b className="pl-1">$ {this.props.selectedPlan && this.props.selectedPlan.amount}</b>
        </div>
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          <div className="text-right mx-2 mb-3">
          <button disabled={!this.props.stripe} className="btn btn-secondary brand-btn">
            Pay
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
          initialSub={props.initialSub} />
      )}
    </ElementsConsumer>
  );
}
