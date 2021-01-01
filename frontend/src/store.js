import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer} from './reducers/productReducers'
import {productDetailsReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,

})


// Here we are checking if there is anything in our cart from our local storage
// If there is then we are setting it to our initial stage of our global store
// This means when the app refreshes, those items will be in the cart from previously


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store