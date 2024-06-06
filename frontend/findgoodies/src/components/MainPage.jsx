import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import mainPage from "../icons/mainpage.svg";
import "./MainPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="main-content">
        <h1>Shopping has never been easier</h1>
        <p>Upload your photos and find products in seconds</p>
        <Link to="/login">
          <Button variant="primary" className="getstarted-button">
            Get Started
          </Button>
        </Link>
      </div>
      <div className="main-image">
        <img src={mainPage} alt="Main page illustration" />
      </div>
    </div>
  );
};

export default MainPage;
