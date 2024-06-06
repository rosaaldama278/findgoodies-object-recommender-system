import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, InputGroup, Form, Button } from "react-bootstrap";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./Login.css";

const Login = ({alias, cartItems, onAddToCart, onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     // Add your API endpoint for user authentication here
  //     const apiUrl = "https://your-api-endpoint/authenticate";

  //     try {
  //       // Replace this with your actual API call
  //       await axios.post(apiUrl, { email, password });

  //       // If authentication is successful, redirect the user to the main shopping page
  //       navigate("/shopping");
  //     } catch (error) {
  //       // Handle authentication errors here
  //       console.error("Error authenticating user:", error);
  //     }
  //   };

  const handleSubmit = () => {
    onLogin(email);
    const apiUrl = "https://hyc97d0ndk.execute-api.us-east-1.amazonaws.com/goodiesStage/shoppingcart";
    axios.get(apiUrl, {
      params: {
        alias: email,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(response => {
      //onAddToCart(response.data.shopping_cart);
      if (cartItems !== undefined) {
        if (cartItems.length === 0) {
        for (let i = 0; i < response.data.shopping_cart.length; i++) {
          onAddToCart(response.data.shopping_cart[i]);
        }
       }
      }
    })
    .catch(error => {
      console.log(error);
    });
    navigate("/shopping");
  };

  return (
    <div className="login">
      <h1>WELCOME BACK</h1>
      <Form onSubmit={handleSubmit} className="form">
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroup.Text
              onClick={togglePasswordVisibility}
              className="password-toggle"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Button variant="primary" type="submit" className="login-button">
          LOGIN
        </Button>
      </Form>
    </div>
  );
};

export default Login;
