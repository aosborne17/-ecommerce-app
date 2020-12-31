import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from '../constants/productConstants'

export const productListReducer = (state = {products: []}, action) => {
    switch(action.type) {
        // this will be while the database is being fetched
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []}

        // once we get the response back,we can then update the product state accordingly
        // this will be done by assigning it the value of the payload we receive from the action creator
        // we will also set loading to false as we now have the data
        case PRODUCT_LIST_SUCCESS: 
            return {loading: false, products: action.payload}
        

        case PRODUCT_LIST_FAIL:
                return {loading: false, error: action.payload}

        default:
            return state

    }   

}


export const productDetailsReducer = (state = {product: { reviews: [] }}, action) => {
    switch(action.type) {
        // this will be while the database is being fetched
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true, ...state}

        // once we get the response back,we can then update the product state accordingly
        // this will be done by assigning it the value of the payload we receive from the action creator
        // we will also set loading to false as we now have the data
        case PRODUCT_DETAILS_SUCCESS: 
            return {loading: false, product: action.payload}
        

        case PRODUCT_DETAILS_FAIL:
                return {loading: false, error: action.payload}

        default:
            return state

    }   

}