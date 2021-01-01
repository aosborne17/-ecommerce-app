import {CART_ADD_ITEM, CART} from '../constants/cartConstants'



export const cartReducer = (state = {cartItems: []}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            
            const existItem = state.cartItems.find(x => x.product === item.product)
            if (existItem) {
                //
                return { 
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }

            } else {
                return {
                    ...state,
                    // if the item doesn't already exist, then we spread the cart items into a new array and add the new item that we have just added
                    cartItems: [...state.cartItems, item]
                }
            }
        default:
            return state
    }
}