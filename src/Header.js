import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
function Header() {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="header">
      {/* amazon clickable logo
       we are using Link to make it clickable 
       we are using to to declare where it has to go
       while we are clicking to it*/}
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      {/* search bar */}
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">Hello </span>
          <span className="header__optionLineTwo">Sign In</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Returns </span>
          <span className="header__optionLineTwo"> & Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your </span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasket />
            <span className="header__optionLineTwo header_basketCount">
              {/* using ? after basket lets us to overcome errors
              if for any reason we do not have correct value.
              it is called optional chaining */}
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
