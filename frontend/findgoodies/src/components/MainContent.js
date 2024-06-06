import React from "react";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Dropzone from "./Dropzone";
import Gallery from "./Gallery";
import ShoppingCartPage from "./ShoppingCartPage";
import MainPage from "./MainPage";
import Login from "./Login";
import AWS from "aws-sdk";
import axios from "axios";


// AWS username, password configuration
AWS.config.update({
  region: "us-west-2",
  accessKeyId: "*",
  secretAccessKey: "*",
});

const docClient = new AWS.DynamoDB.DocumentClient();

const saveShoppingCart = (email, cartItems) => {
  const apiUrl =
    "https://hyc97d0ndk.execute-api.us-east-1.amazonaws.com/goodiesStage/shoppingcart";
  const params = {
    TableName: "shoppingcart",
    Item: {
      alias: email,
      cartItems: cartItems,
    },
  };

  const response = axios.post(apiUrl, params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const loadShoppingCart = (email) => {
  const params = {
    TableName: "ShoppingCart",
    Key: {
      email: email,
    },
  };

  const apiUrl =
    "https://hyc97d0ndk.execute-api.us-east-1.amazonaws.com/goodiesStage/shoppingcart?alias=" + email;
  const response = axios.get(apiUrl, params, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const MainContent = ({
  onUpload,
  labels,
  products,
  addToCart,
  cartItems,
  removeFromCart,
  uploadedImage,
}) => {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(true);
  const [alias, setAlias] = useState('');
  const handleAliasUpdate = (newAlias) => {
    setAlias(newAlias);
  };


  const handleLogin = () => {
    // Implement login here and update the loggedIn state
    setLoggedIn(true);
    loadShoppingCart("example@email.com");
  };

  return (
    <div>
      {loggedIn && location.pathname === "/shopping" && (
        <Dropzone onUpload={onUpload} labels={labels} />
      )}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login alias={alias} cartItems={cartItems} onAddToCart={addToCart} onLogin={handleAliasUpdate} />} />
        <Route
          path="/shopping"
          element={
            <Gallery
              products={products}
              onAddToCart={addToCart}
              labels={labels}
              alias={alias}
              cartItems={cartItems}
              uploadedImage={uploadedImage}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <ShoppingCartPage
              cartItems={cartItems}
              alias={alias}
              removeFromCart={removeFromCart}
              onSaveShoppingCart={() =>
                saveShoppingCart(alias, cartItems)
              }
            />
          }
        />
      </Routes>
    </div>
  );
};

export default MainContent;
