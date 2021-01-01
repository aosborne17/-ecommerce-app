import axios from 'axios'
import {CART_ADD_ITEM} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    // We are now taking the data from the database and attaching it our payload
    // this product will then be sent to our cart
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            // the product will be the id of the single product that we retrieve from the database
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: qty
        }
    })

    // Here we are saving our cart to local storage.
    // getState function allows us to get the state of our whole cart
    // We use json.stringify because we can only save strings in local storage


    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}