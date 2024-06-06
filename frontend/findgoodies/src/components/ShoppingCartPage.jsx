import React from "react";
import { Card } from "react-bootstrap";
import "./ShoppingCartPage.css";
import { Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
import { Button } from "react-bootstrap";

const ShoppingCartPage = ({
  cartItems,
  alias,
  removeFromCart,
  onSaveShoppingCart,
}) => {
  const filteredCartItems = cartItems;
  return (
    <div className="gallery">
      <Link to="/shopping">
        <header className="header">
          <h1>Find Goodies</h1>
          <Link to="/cart">
            <ShoppingCart cartItems={cartItems} />
          </Link>
        </header>
      </Link>
      <div className="products">
        <div>
          <Button
            onClick={onSaveShoppingCart}
            variant="primary"
            className="save-cart-btn"
          >
            Save shopping cart
          </Button>
        </div>
        {filteredCartItems.map((item) => (
          <Card key={item.id} style={{ width: "18rem", margin: "10px" }}>
            <Card.Img
              variant="top"
              src={item.image_url}
              onClick={() => window.open(item.link)}
            />
            <Card.Body>
              <Card.Title>{item.product_name}</Card.Title>
              <Card.Text>
                Price: {item.price}
                <br />
                <a
                  href={item.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy now
                </a>
                <br />
                <Button
                  className="remove-button"
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCartPage;
