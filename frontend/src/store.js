import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer ,productDeleteReducer,productCreateReducer,productUpdateReducer,productReviewCreateReducer,productTopRatedReducer} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer ,userRegisterReducer, userDetailsReducer, userUpdateProfileReducer,userListReducer,userDeleteReducer,userUpdateReducer} from './reducers/userReducers';
import {orderCreateReducer,orderDeatilsReducer,orderPayReducer,orderListMyReducer,orderListReducer} from './reducers/orderReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDeatilsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
});

//取出持久化库内的数据,若有则取出，否则返回空数组
const CartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : '银行卡支付'

const initialState = {//此处取名对应上方reducer处定义,刷新时展示的默认值
  cart: {
    cartItems: CartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage
  },
  userLogin:{
    userInfo:userInfoFromStorage
  }
};

const middlewares = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(
  applyMiddleware(...middlewares)
))

export default store;