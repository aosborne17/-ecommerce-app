import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
} from '../constants/userConstants';
import axios from 'axios';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';

// we want a lofgin action to get the token
export const login = (email, password) => async (dispatch) => {
  try {
    // we dispatch the lgoion requesdt here so we can set laoding to true
    // this allows us to hive a loading spinner etc while we wait for the successful api call
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // We are creating a header variable, allowing us to post data to the server
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // In our request we pass in three arguements
    // The first being the route we send the request to, then the data we are adding to the body
    // We finally add the headers to the request
    const response = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );
    console.log(response);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      // We only want the data that comes from our response
      payload: response.data,
    });

    // We now want to add our users information to localstorage
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  // when the user logs out, we will reset the state of these reducers
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });

  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    // we dispatch the lgoion requesdt here so we can set laoding to true
    // this allows us to hive a loading spinner etc while we wait for the successful api call
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    // We are creating a header variable, allowing us to post data to the server
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // In our request we pass in three arguements
    // The first being the route we send the request to, then the data we are adding to the body
    // We finally add the headers to the request
    const response = await axios.post(
      '/api/users/',
      { name, email, password },
      config
    );
    console.log(response);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      // We only want the data that comes from our response
      payload: response.data,
    });

    // We are going to login the user when they register
    // so we will dispatch the user login action too

    dispatch({
      type: USER_LOGIN_SUCCESS,
      // We only want the data that comes from our response
      payload: response.data,
    });

    // We now want to add our users information to localstorage
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    // Calling a function that gets our redux state
    // here we are destructuring to get the userInfo which is within the userLogin reducer state
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

    // In our request we pass in two arguements
    // The first being the route we want to get the data from
    // secondlhy we add the headers to the request for our token and applicatio type
    const response = await axios.get(`/api/users/${id}`, config);
    console.log(response);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      // We only want the data that comes from our response
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    // set loading to true to show our spinner
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
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

    // As we are updating the user details we are doing a put request
    // We then pass in the upated user object
    const response = await axios.put(`/api/users/profile`, user, config);
    console.log(response);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      // We only want the data that comes from our response
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserList = () => async (dispatch, getState) => {
  try {
    // set loading to true to show our spinner
    dispatch({
      type: USER_LIST_REQUEST,
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

    // this get request will get a list of all the users in our DB
    const response = await axios.get(`/api/users`, config);
    console.log(response);

    dispatch({
      type: USER_LIST_SUCCESS,
      // the data will be all the users
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    // set loading to true to show our spinner
    dispatch({
      type: USER_DELETE_REQUEST,
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

    // this will delete the user with the id we pass in
    await axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    // set loading to true to show our spinner
    dispatch({
      type: USER_UPDATE_REQUEST,
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

    // this will update the user with the id we pass in
    const response = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    // so once we have received the updated user, we can pass this data back into the state
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
