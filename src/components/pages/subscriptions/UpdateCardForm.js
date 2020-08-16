import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import Store from "../../../Store";
import { getSubscription } from "../../../actions/subscription/get_subscription";
import updateCard from "../../../actions/subscription/update_card";

class UpdateForm extends React.Component {

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
        payment_method: paymentMethod.id
      }
      // console.log('[PaymentMethod]', paymentMethod);
        Store.dispatch(updateCard(data))
    }
  };

  render() {
    return (
      <div className="payment-box p-2  mx-auto">
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          <div className="text-right mx-2 mb-3">
          <button disabled={!this.props.stripe} className="btn btn-secondary brand-btn">
            Update
          </button>
          </div>
        </form> 
      </div>
    );
  }
}

export default function UpdateCheckoutForm(props) {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <UpdateForm stripe={stripe} elements={elements} 
           />
      )}
    </ElementsConsumer>
  );
}
