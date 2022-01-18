import React from 'react'
import {connect} from 'react-redux'
import SingleProduct from './SingleProduct';
import {
    fetchAllProducts
    
} from "../store/products"

/**
 * COMPONENT
 */
class AllProducts extends React.Component {
    constructor() {
        super();
        
    }
  
    componentDidMount() {
        console.log(this.props)
        this.setState = {
            products: this.props.fetchAllProducts()
        }
    }
     render() {
        let products = this.props.products || []
        products = products.filter(product => product.quantity > 0)

        
        const productsDiv = 
            products.length > 0 ? (
                products.map(product => (
                    <SingleProduct key={product.id} product={product} />
                ))
            ) : (
                <span>No Products</span>
            );
        return (
        <div>
            <h3>{productsDiv}</h3>
        </div>
    )}
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
    return {
        fetchAllProducts: () => dispatch(fetchAllProducts())
    }
}

export default connect(mapState, mapDispatch)(AllProducts)