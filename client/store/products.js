import axios from "axios";
import { bindActionCreators } from "redux";

const GET_PRODUCTS = "GET_PRODUCTS"
const DELETE_PRODUCT = "DELETE_PRODUCT"
const ADD_PRODUCT = "ADD_PRODUCT"
const UPDATE_PRODUCT = "UPDATE_PRODUCT"
const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT"

const getAllProducts = data => {
    return {
        type: GET_PRODUCTS,
        products: data,
    }
}

const addProduct = data => {
    return  {
        type: ADD_PRODUCT,
        product: data
    }
}



export const fetchAllProducts = () => async dispatch => {
    try {
        const { data } = await axios.get(`/api/products`)
        dispatch(getAllProducts(data))
    } catch (e) {
        console.log(e)
    }
}


export const fetchCreateProduct = product => async dispatch => {
    try {
        const newProduct = await axios.post('/api/products', product)

        if(newProduct) dispatch(addProduct(newProduct))
    } catch (e) {
        console.log(e)
    }
}



const reducer = (state = [], action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products;
        case ADD_PRODUCT:
            return action.product;
        default:
            return state;
    }
}

export default reducer;