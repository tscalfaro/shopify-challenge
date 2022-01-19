import axios from "axios";

//ACTION TYPES

const GET_SELECTED_PRODUCT = "GET_SELECTED_PRODUCT"
const UPDATE_PRODUCT = "UPDATE_PRODUCT"
const DELETE_SELECTED = "DELETE_SELECTED"

//ACTION CREATORS

const getSingleProduct = product => {
    return {
        type: GET_SELECTED_PRODUCT,
        product,
    }
}

const updateProduct = data => {
    return {
        type:  UPDATE_PRODUCT,
        product: data
    }
}

const deleteProduct = id => {
    return {
        type: DELETE_SELECTED,
        id,
    }
}

//THUNKS

export const fetchSingleProduct = id => async dispatch => {
    try {
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch(getSingleProduct(data))
    } catch (e) {
        console.log(e)
    }
}

export const fetchUpdatedProduct = product => async dispatch => {
    try {
        const updatedProduct = await axios.post(`/api/products/${product.id}`, product)

        if(updateProduct) {
            dispatch(updateProduct(updatedProduct))
        }
    } catch (e) {
        console.log(e)
    }
}

export const fetchDeleteProduct = product => async dispatch => {
    try {
        
        const response = await axios.delete(`/api/products/${product.id}`, product)
        if(response.status === 202) {
            dispatch(deleteProduct(product.id))
        } else {
            console.log("SORRY, something went wrong while trying to delete the product")
        }
    } catch (e) {
        console.log(e)
    }
}

const reducer = (state = [], action) => {
    switch (action.type) {
        case GET_SELECTED_PRODUCT:
            return action.product;
        case DELETE_SELECTED:
            return {};
        case UPDATE_PRODUCT:
            return action.product;
        default:
            return state;
    }
}

export default reducer;