import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

import MainContent from "./components/MainContent";
import ShoppingCart from "./components/ShoppingCart";
import axios from "axios";

import "./App.css";
import mockData from "./testData";
const AWS = require("aws-sdk");
const App = () => {
  function newUploadFile(image) {
    const s3 = new AWS.S3({
      region: "us-west-2",
    });

    //   var fileInput = image;
    //  var file = fileInput.files[0];
    var key = image.name;
    var file = image;
    //var labels_string = labels.join(", ");
    //console.log("LABELS: ", labels_string);

    var params = {
      Bucket: "upload-images1",
      Key: key,
      Body: file,
      ContentType: file.type,
      //Metadata: {
      //'x-amz-meta-customLabels': labels_string,
      //}
    };
    s3.upload(params)
      .promise()
      .then((data) => {
        console.log("Upload completed successfully: ", data);
      })
      .catch((err) => {
        console.log("Error uploading image", err);
      });

    /*
    s3.upload(params, function(err, data) {
      if (err) {
        console.log('Error uploading image: ' + err);
      } else {
        console.log('Image uploaded successfully.');
      }
    });
    */
  }

  function getShoppingList(product) {
    var params = {
      product: product,
    };
    var body = {};
    var additionalParams = {};
  }

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [labels, setLabels] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);

  const onUpload = async (image) => {
    // API URL
    var endpoint = image.name.split(".")[0];
    const apiUrl =
      "https://hyc97d0ndk.execute-api.us-east-1.amazonaws.com/goodiesStage/upload?product=" +
      endpoint;
    const formData = new FormData();
    formData.append("image", image);
    newUploadFile(image);
    //getShoppingList("bags");
    setTimeout(async () => {
      const response = await axios.get(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      });
      setProducts(response.data.search_results);
    }, 4000);
    setUploadedImage(image);

    // setProducts(mockData);
    // setLabels(["iphone", "mobile phone", "galaxy"]);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (product) => {
    setCartItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        return [...prevItems.slice(0, index), ...prevItems.slice(index + 1)];
      }
      return prevItems;
    });
  };

  return (
    <BrowserRouter>
      <Container className="App">
        <header className="header">
          <h1>Find Goodies</h1>
        </header>
        <Row>
          <Col>
            <MainContent
              onUpload={onUpload}
              labels={labels}
              products={products}
              addToCart={addToCart}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              uploadedImage={uploadedImage}
            />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;
