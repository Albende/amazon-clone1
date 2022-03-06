import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { useHistory } from "react-router-dom";

function Checkout() {
  const history = useHistory();

  const routeChange = () => {
    let path = `/login`;
    history.push(path);
  };
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          {/* by putting ? question mark after user we are 
          just making sure that we will not have an error
          because sometimes there can be a delay in our server 
          and it can lead of data to be loaded a bit later.
          that's why it can cause an error if we do not put ? question mark
          there. it is always better to do it when we are using cloud.
          if our database is in our local machine then it is mostly
          not gonna give any error but if it is in cloud. always use ? to 
          prevent errors. it will automatically handle error  */}
          <h3>Hello, {user?.email}</h3>
          {basket.length != 0 ? (
            <h2 className="checkout__title">Your shopping basket</h2>
          ) : (
            <h2 className="checkout__title">Your basket is empty</h2>
          )}

          {basket.length == 0 && user == null ? (
            <button className="checkout__signUpButton" onClick={routeChange}>
              {" "}
              <h3>Please Sign in or Sign Up</h3>
            </button>
          ) : (
            basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))
          )}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
