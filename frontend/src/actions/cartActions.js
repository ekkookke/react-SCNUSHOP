import axios from 'axios';
import { CART_ADD_ITEM ,CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHOD} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {//getState取出cart->cartReducer->cartItems内容
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))//将JavaScript值转换为JSON字符串,持久化购物车内容，存入本地localstroage中
}

export const removeFromCart = (id) => (dispatch, getState) => {

  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))//持久化购物车内容，存入本地localstroage中
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data })

  localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
}