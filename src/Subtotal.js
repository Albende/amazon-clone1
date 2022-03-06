import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      {/* it is better use to history.push instead of Link to
      if we want to push the user somewhere programatically 
      using history.push is better and it will keep the 
      styling of button while we are redirecting user to payment page here */}
      {user == null ? (
        <button onClick={(e) => alert("Please sign in to Proceed")}>
          Proceed to Checkout
        </button>
      ) : (
        <button
          onClick={(e) =>
            basket.length != 0
              ? history.push("/payment")
              : alert("Basket can not be empty")
          }
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}

export default Subtotal;
