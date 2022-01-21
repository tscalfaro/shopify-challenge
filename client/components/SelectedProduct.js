// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import {
    fetchSingleProduct,
    fetchDeleteProduct,
    fetchUpdatedProduct
} from '../store/selectedProducts'
import { connect } from "react-redux";


class SelectedProduct extends React.Component  {
    constructor(){
        super()
        this.handleDelete = this.handleDelete.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchSingleProduct(this.props.match.params.id)
    }
  
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
       console.log(this.state)
    }

    async handleSubmit(event) {
        // event.preventDefault();
        alert('Submitting product information for update.')
        const editedProduct = {
            name: this.state.name,
            quantity: this.state.quantity,
            description: this.state.description,
            id: this.props.match.params.id
        }
        await this.props.fetchUpdatedProduct(editedProduct)
        this.props.history.push(`/products/${editedProduct.id}`, this.state)
        console.log(editedProduct)
    }

    async handleDelete() {
        if (window.confirm(`ARE YOU SURE YOU WISH TO DELETE THIS PRODUCT, ${this.props.product.name}?`)){
            this.props.fetchDeleteProduct(this.props.product)
            this.props.history.push('/products', this.state)
        }
        
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
            <form onSubmit={this.handleSubmit}>

                <div>
                    <label>
                        <small>New Name</small>
                    </label>
                    <input name="name" type="text" className="input" onChange={this.handleChange}/>
                </div>

                <div>
                    <label>
                        <small>Quantity</small>
                    </label>
                    <input name="quantity" type="number" className="input" onChange={this.handleChange}/>
                </div>

                <div>
                    <label>
                        <small>Description</small>
                    </label>
                    <input name="description" type="text" className="input" onChange={this.handleChange}/>
                </div>

                <button type="submit">SUBMIT</button>
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
          fetchDeleteProduct: product => dispatch(fetchDeleteProduct(product)),
          fetchUpdatedProduct: product => dispatch(fetchUpdatedProduct(product))
      }
  }
  
  export default connect(mapState, mapDispatch)(SelectedProduct)