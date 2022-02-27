import React from "react";
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

function App() {
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
        <Header />
        <Switch>
          <Route path="/checkout">
            <Checkout />
          </Route>
          {/* we have to use our main router at the bottom
        because if we use it at the top
        then we will not be able to go to other routes
        it will remain the same */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
