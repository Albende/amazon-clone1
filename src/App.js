import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header.js";
import Home from "./Home.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Link,
} from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Orders from "./Orders";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51KZN9vDVMnrQs52vRPZX08vKW7HcvGJiq4dLydXZVldQjSzXsgJ9tS1b1WA81G14Vvk23EF6nEZmaIFD2mqVZQRE00pJ3FIVdf"
);

function App() {
  const [{}, dispatch] = useStateValue();

  //useEffect is always going to listen to our app if something changed
  // for example login, signup, logout and so on
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log("USER is >>> ", authUser); ->>> using it to debug user
      //authetication to see if it was successful or not
      if (authUser) {
        //to check if somebody logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //user is logged out
        dispatch({
          type: "SET_USER",
          //user is gonna be null because we are logging out
          user: null,
        });
      }
    });

    // [] this means that useffect only will run when the app components loads
    // it means that if we put [user] there like that it will run useEffect funtion
    // when the user changes. it is like dynamic if statement
  }, []);
  return (
    //using react router v5.2.0. in latest version Switch is not working
    // instead of switch we can use Routes and Link to link it to
    //appropriate page
    <Router>
      <div className="App">
        {/* we are using header here because we 
        want Header to be in all of the pages
        that's why no need to declare it in 
        all of Routes */}

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          {/* we have to use our main router at the bottom
        because if we use it at the top
        then we will not be able to go to other routes
        it will remain the same */}
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
