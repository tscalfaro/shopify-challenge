// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import {
    fetchSingleProduct,
    fetchDeleteProduct
} from '../store/selectedProducts'
import { connect } from "react-redux";


class SelectedProduct extends React.Component  {
    constructor(){
        super()
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchSingleProduct(this.props.match.params.id)
    }
  
    async handleDelete() {
        console.log(this.props.product.id)
        this.props.fetchDeleteProduct(this.props.product)
        this.props.history.push('/products', this.state)
    }

   render() {
    
    const { name, quantity, description, id} = this.props.product
    return (
      <div className="product">
        
        <div className="info">
          <h1>Product Name: {name}</h1>
          <h1>quantity: {quantity}</h1>
          <p>description: {description}</p>
        </div>
        <div>
        <p id="itemNumber">itemNumber: {id}</p>
        <button onClick= {this.handleDelete} >DELETE PRODUCT</button>
        </div>
        <hr></hr>
        <hr></hr>
        <div>
            <h3>Edit Product</h3>
            <form>
                <div>
                    <label>
                        <small>New Name</small>
                    </label>
                    <input name="Name" type="text" className="input" />
                </div>
                <div>
                    <label>
                        <small>Quantity</small>
                    </label>
                    <input name="Quantity" value={quantity} type="text" className="input" />
                </div>
                <button>SUBMIT</button>
            </form>
        </div>

      </div>
    );
    }
  };
  
  const mapState = state => {
    return {
      product: state.selectedProduct
    }
  }
  
  const mapDispatch = dispatch => {
      return {
          fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
          fetchDeleteProduct: product => dispatch(fetchDeleteProduct(product))
      }
  }
  
  export default connect(mapState, mapDispatch)(SelectedProduct)