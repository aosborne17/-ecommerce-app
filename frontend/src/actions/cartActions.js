import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

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
      qty: qty,
    },
  });

  // Here we are saving our cart to local storage.
  // getState function allows us to get the state of our whole cart
  // We use json.stringify because we can only save strings in local storage

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  // We then add the new cart items state to the local storage, thus the removed item will no longer be present
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// This action takes the shipping address from the form in /shipping and dispatches to store
// it also adds the shipping address to local storage, thus when the user refreshes or leaves the page it will persist
export const saveShippingAddress = (shippingForm) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: shippingForm,
  });
  // We then add the new cart items state to the local storage, thus the removed item will no longer be present
  localStorage.setItem('shippingAddress', JSON.stringify(shippingForm));
};
