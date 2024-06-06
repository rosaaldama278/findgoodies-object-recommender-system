import { React, useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "./Gallery.css";
import { Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Gallery = ({
  products,
  onAddToCart,
  uploadedImage,
  cartItems,
  alias,
}) => {
  const location = useLocation();
  //var alias = location.state.alias;
  //const [cartItems, setCartItems] = useState([]);
  /*
  useEffect(() => {
    console.log("Use effect start for alias: ", alias);
    const apiUrl = "https://hyc97d0ndk.execute-api.us-east-1.amazonaws.com/goodiesStage/shoppingcart";
    axios.get(apiUrl, {
      params: {
        alias: alias,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(response => {
      //onAddToCart(response.data.shopping_cart);
      if (cartItems !== undefined) {
        console.log("CartItems length: ", cartItems.length);
        if (cartItems.length === 0) {
          console.log("CartItems length 2: ", cartItems.length);
        for (let i = 0; i < response.data.shopping_cart.length; i++) {
          onAddToCart(response.data.shopping_cart[i]);
        }
       }
      }
    })
    .catch(error => {
      console.log(error);
    });
  }, );
  */

  return (
    <div className="gallery">
      <Link to="/shopping">
        <div className="header">
          <h1>Find Goodies</h1>
          <Link to="/cart">
            <ShoppingCart cartItems={cartItems} />
          </Link>
        </div>
      </Link>
      {uploadedImage && (
        <div className="uploaded-image-container">
          <h3>This is the image you uploaded:</h3>
          <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" />
        </div>
      )}
      <div className="products-grid">
        {products.map((product) => {
          const inCart = cartItems.some(
            (item) => item.image_url === product.image_url
          );
          return (
            <Card key={product.id} style={{ width: "18rem", margin: "10px" }}>
              <Card.Img variant="top" src={product.image_url} />
              <Card.Body>
                <Card.Title>{product.product_name}</Card.Title>
                <Card.Text>
                  Price: {product.price}
                  <br />
                  <a
                    href={product.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on store
                  </a>
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => onAddToCart(product)}
                  disabled={inCart}
                  className="cart-button"
                >
                  {inCart ? "In Cart" : "Add to Cart"}
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
