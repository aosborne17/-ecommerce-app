import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from "../constants/userConstants"
import axios from 'axios'


// we want a lofgin action to get the token
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        // We are creating a header variable, allowing us to post data to the server
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // In our request we pass in three arguements
        // The first being the route we send the request to, then the data we are adding to the body
        // We finally add the headers to the request
        const response = await axios.post('/api/users/login', {email, password}, config)
        console.log(response)
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            // We only want the data that comes from our response
            payload: response.data
        })

        // We now want to add our users information to localstorage
        localStorage.setItem('userInfo', JSON.stringify(response.data))

    } catch(error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}