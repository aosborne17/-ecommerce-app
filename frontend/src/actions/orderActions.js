import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
} from '../constants/orderConstants';
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    // set loading to true to show our spinner
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    // we need to get the userInfo inside the state, so we can access the token
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        // the auth token allows our backend to find out which user is requesting the data
        // from our backend we can then get this id and query our database to return the right data
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.post(`/api/orders`, order, config);
    // console.log(response);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      // We only want the data that comes from our response
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    // set loading to true to show our spinner
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    // we need to get the userInfo inside the state, so we can access the token
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // the auth token allows our backend to find out which user is requesting the data
        // from our backend we can then get this id and query our database to return the right data
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      // We only want the data that comes from our response
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    // set loading to true to show our spinner
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    // we need to get the userInfo inside the state, so we can access the token
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        // the auth token allows our backend to find out which user is requesting the data
        // from our backend we can then get this id and query our database to return the right data
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      // We only want the data that comes from our response
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    // set loading to true to show our spinner
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    // we need to get the userInfo inside the state, so we can access the token
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // the auth token allows our backend to find out which user is requesting the data
        // from our backend we can then get this id and query our database to return the right data
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // we will use the id from the token to get all the orders made my the logged in user
    const response = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      // We only want the data that comes from our response
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
