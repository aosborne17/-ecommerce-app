import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        //
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          // if the item doesn't already exist, then we spread the cart items into a new array and add the new item that we have just added
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        // this method will only return the items that don't match the id of our payload
        // this means only the item we want to remove will be stripped
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    // this case will run when we dispatch the action to save the shipping address
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        // first we will return the initial state
        ...state,
        // we will then add a new pieice of state 'shippingAddress' and assign it to the payload passed in
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        // first we will return the initial state
        ...state,
        // we will then add a new pieice of state 'shippingAddress' and assign it to the payload passed in
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
