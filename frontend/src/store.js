import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  bundleListReducer,
  bundleDetailsReducer,
  bundleDeleteReducer,
  bundleCreateReducer,
  bundleUpdateReducer,
  bundleReviewCreateReducer,
  bundleTopRatedReducer,
  bundleLatestReducer,
  bundleSignupNewUserReducer,
} from './reducers/bundleReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userAuthFaceBookReducer,
  userAuthGoogleReducer,
  userHistoryRoutesReducer,
} from './reducers/userReducers';
import {
  subscriptionCreateReducer,
  subscriptionDetailsReducer,
  subscriptionPayReducer,
  subscriptionDeliverReducer,
  subscriptionListMyReducer,
  subscriptionListReducer,
  subscriptionUpdateReducer,
  subscriptionCancelReducer,
} from './reducers/subscriptionReducers';
import { farmListReducer, farmDetailsReducer } from './reducers/farmReducer';

const reducer = combineReducers({
  bundleList: bundleListReducer,
  bundleSignupNewUser: bundleSignupNewUserReducer,
  bundleDetails: bundleDetailsReducer,
  bundleDelete: bundleDeleteReducer,
  bundleCreate: bundleCreateReducer,
  bundleUpdate: bundleUpdateReducer,
  bundleReviewCreate: bundleReviewCreateReducer,
  bundleTopRated: bundleTopRatedReducer,
  bundleLatest: bundleLatestReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userAuthFaceBook: userAuthFaceBookReducer,
  userAuthGoogle: userAuthGoogleReducer,
  userHistoryRoutes: userHistoryRoutesReducer,
  subscriptionCreate: subscriptionCreateReducer,
  subscriptionDetails: subscriptionDetailsReducer,
  subscriptionPay: subscriptionPayReducer,
  subscriptionDeliver: subscriptionDeliverReducer,
  subscriptionListMy: subscriptionListMyReducer,
  subscriptionList: subscriptionListReducer,
  subscriptionUpdate: subscriptionUpdateReducer,
  subscriptionCancel: subscriptionCancelReducer,
  farmList: farmListReducer,
  farmDetails: farmDetailsReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },

  // subscriptionShippingAddress: {
  //   shippingAddress: shippingAddressFromStorage,
  // },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
