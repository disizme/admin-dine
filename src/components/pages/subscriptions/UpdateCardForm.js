import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import Store from "../../../Store";
import { getSubscription } from "../../../actions/subscription/get_subscription";
import updateCard from "../../../actions/subscription/update_card";
import { Input } from "reactstrap";

class UpdateForm extends React.Component {
    state={
      data: {
        name: ""
      }
    }

    onChange = (e) => {
      let {value, name} = e.target
      let { data } = { ...this.state };
      data[name] = value;
      this.setState({ data: {...data}});
    }

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
      "billing_details": {
        name: this.state.data.name
      }
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
        <label className="w-100">
            <span className="ml-2">
              Name
            </span>
            <div className="w-100">
              <Input type="text" placeholder="Enter Your Name"
                name="name" className="form-control StripeElement w-100" 
                value={this.state.data.name}
                onChange={e => this.onChange(e)}
                required
              />
            </div>
          </label>
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
