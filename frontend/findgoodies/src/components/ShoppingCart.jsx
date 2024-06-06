import React from "react";
import { Badge } from "react-bootstrap";
import "./ShoppingCart.css";

const ShoppingCart = ({ alias, cartItems }) => {
  console.log("SHOPPING CART ALIAS: ", alias);
  return (
    <div className="shopping-cart-container">
      <h3 className="shopping-cart">
        Shopping Cart <Badge bg="secondary">{cartItems.length}</Badge>
      </h3>
    </div>
  );
};

export default ShoppingCart;
