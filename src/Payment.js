import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import "./Payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer.js";
import axios from "axios";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceede] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setclientSecret] = useState(true);

  //it is gonna run when payment component loads
  //as well as any component inside of [] changes
  //here for example when [basket] changes
  //useEffect is gonna run
  useEffect(() => {
    //we are gonna generate special stripe secret
    //which is gonna allow us to charge customer
    //but whenever the basket changes we need to get new secret
    //because we will tell stripe that price changed
    //and new secret needed

    //using async function inside of useEffect
    const getClientSeceret = async () => {
      //axios allows us to fetch data from API
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket)}`,
      });
    };
    getClientSeceret();
  }, [basket]);

  const handleSubmit = async (event) => {
    //it will stop refreshing because we do not need to refresh each time
    event.preventDefault();
    //it will prevent user to click buy button several times
    //user will click on Buy Now and then button will be disabled
    setProcessing(true);

    const payload = await stripe;
  };
  const handleChange = (event) => {
    //first of all we are going to Listen for change in CardElement
    //and display any errors as the costumer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const stripe = useStripe();
  const elements = useElements();
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          {" "}
          Checkout <Link to="/checkout">{basket?.length} items</Link>
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p> 123 React Lane</p>
            <p> Los Angeles, CA</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">Payment Method</div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3> Order total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)} // Part of the homework
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* this is like if statement
              this code means if there is an error
              only then show an error which is in
              inside of div */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
