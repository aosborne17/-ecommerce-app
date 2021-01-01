import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants'



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
        case CART_REMOVE_ITEM:
            return {
                ...state,
                // this method will only return the items that don't match the id of our payload
                // this means only the item we want to remove will be stripped
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        default:
            return state
    }
}