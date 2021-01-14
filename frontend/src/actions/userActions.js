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
} from '../constants/userConstants';
import axios from 'axios';

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
