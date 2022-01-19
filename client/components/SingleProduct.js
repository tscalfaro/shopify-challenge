// eslint-disable-next-line no-unused-vars
import React from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const SingleProduct = props => {
    const product = props.product;
    let { name, description, quantity, id} = product;
    const linkDestination = `/products/${id}`;
  
   
    return (
      <div className="product">
        
        <div className="info">
          <h1>Product Name: {name}</h1>
          
          <h1>quantity: {quantity}</h1>
          <p>description: {description}</p>
  
          <Link to={linkDestination}>
            <button type="button" className="button">
              VIEW PRODUCT
            </button>
          </Link>

        </div>
        <p id="itemNumber">itemNumber: {id}</p>
      </div>
    );
  };
  
  export default (SingleProduct);