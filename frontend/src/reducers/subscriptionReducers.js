import {
  SUBSCRIPTION_CREATE_REQUEST,
  SUBSCRIPTION_CREATE_SUCCESS,
  SUBSCRIPTION_CREATE_FAIL,
  SUBSCRIPTION_DETAILS_REQUEST,
  SUBSCRIPTION_DETAILS_SUCCESS,
  SUBSCRIPTION_DETAILS_FAIL,
  SUBSCRIPTION_PAY_REQUEST,
  SUBSCRIPTION_PAY_FAIL,
  SUBSCRIPTION_PAY_SUCCESS,
  SUBSCRIPTION_PAY_RESET,
  SUBSCRIPTION_LIST_MY_REQUEST,
  SUBSCRIPTION_LIST_MY_SUCCESS,
  SUBSCRIPTION_LIST_MY_FAIL,
  SUBSCRIPTION_LIST_MY_RESET,
  SUBSCRIPTION_LIST_FAIL,
  SUBSCRIPTION_LIST_SUCCESS,
  SUBSCRIPTION_LIST_REQUEST,
  SUBSCRIPTION_DELIVER_FAIL,
  SUBSCRIPTION_DELIVER_SUCCESS,
  SUBSCRIPTION_DELIVER_REQUEST,
  SUBSCRIPTION_DELIVER_RESET,
  SUBSCRIPTION_CREATE_RESET,
  SUBSCRIPTION_UPDATE_REQUEST,
  SUBSCRIPTION_UPDATE_SUCCESS,
  SUBSCRIPTION_UPDATE_FAIL,
  SUBSCRIPTION_UPDATE_RESET,
  SUBSCRIPTION_CANCEL_REQUEST,
  SUBSCRIPTION_CANCEL_SUCCESS,
  SUBSCRIPTION_CANCEL_FAIL,
} from '../constants/subscriptionConstants';

export const subscriptionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_CREATE_REQUEST:
      return {
        loading: true,
      };
    case SUBSCRIPTION_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        subscription: action.payload,
      };
    case SUBSCRIPTION_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SUBSCRIPTION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const subscriptionDetailsReducer = (
  state = { loading: true, subscriptionItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case SUBSCRIPTION_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUBSCRIPTION_DETAILS_SUCCESS:
      return {
        loading: false,
        subscription: action.payload,
      };
    case SUBSCRIPTION_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const subscriptionPayReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_PAY_REQUEST:
      return {
        loading: true,
      };
    case SUBSCRIPTION_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SUBSCRIPTION_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SUBSCRIPTION_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const subscriptionDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case SUBSCRIPTION_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SUBSCRIPTION_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SUBSCRIPTION_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const subscriptionListMyReducer = (state = { subscriptions: [] }, action) => {
  switch (action.type) {
    case SUBSCRIPTION_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case SUBSCRIPTION_LIST_MY_SUCCESS:
      return {
        loading: false,
        subscriptions: action.payload,
      };
    case SUBSCRIPTION_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SUBSCRIPTION_LIST_MY_RESET:
      return { subscriptions: [] };
    default:
      return state;
  }
};

export const subscriptionUpdateReducer = (state = { subscription: {} }, action) => {
  switch (action.type) {
    case SUBSCRIPTION_UPDATE_REQUEST:
      return { loading: true };
    case SUBSCRIPTION_UPDATE_SUCCESS:
      return { loading: false, success: true, subscription: action.payload };
    case SUBSCRIPTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SUBSCRIPTION_UPDATE_RESET:
      return { subscription: {} };
    default:
      return state;
  }
};

export const subscriptionListReducer = (state = { subscriptions: [] }, action) => {
  switch (action.type) {
    case SUBSCRIPTION_LIST_REQUEST:
      return {
        loading: true,
      };
    case SUBSCRIPTION_LIST_SUCCESS:
      return {
        loading: false,
        subscriptions: action.payload,
      };
    case SUBSCRIPTION_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const subscriptionCancelReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_CANCEL_REQUEST:
      return { loading: true };
    case SUBSCRIPTION_CANCEL_SUCCESS:
      return { loading: false, success: true };
    case SUBSCRIPTION_CANCEL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
