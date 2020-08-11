import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#303238",
      fontSize: "14px",
      fontFamily: "sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF"
      }
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238"
      }
    }
  }
};

function CardSection() {
  return (
    <label className="w-100">
        <span className="ml-2">
        Card details
        </span>
      <div className="w-100">
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
    </label>
  );
}

export default CardSection;
