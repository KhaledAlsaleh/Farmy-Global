import {
  BUNDLE_LIST_REQUEST,
  BUNDLE_LIST_SUCCESS,
  BUNDLE_LIST_FAIL,
  BUNDLE_DETAILS_REQUEST,
  BUNDLE_DETAILS_SUCCESS,
  BUNDLE_DETAILS_FAIL,
  BUNDLE_DELETE_SUCCESS,
  BUNDLE_DELETE_REQUEST,
  BUNDLE_DELETE_FAIL,
  BUNDLE_CREATE_REQUEST,
  BUNDLE_CREATE_SUCCESS,
  BUNDLE_CREATE_FAIL,
  BUNDLE_CREATE_RESET,
  BUNDLE_UPDATE_REQUEST,
  BUNDLE_UPDATE_SUCCESS,
  BUNDLE_UPDATE_FAIL,
  BUNDLE_UPDATE_RESET,
  BUNDLE_CREATE_REVIEW_REQUEST,
  BUNDLE_CREATE_REVIEW_SUCCESS,
  BUNDLE_CREATE_REVIEW_FAIL,
  BUNDLE_CREATE_REVIEW_RESET,
  BUNDLE_TOP_REQUEST,
  BUNDLE_TOP_SUCCESS,
  BUNDLE_TOP_FAIL,
  BUNDLE_LATEST_REQUEST,
  BUNDLE_LATEST_SUCCESS,
  BUNDLE_LATEST_FAIL,
  BUNDLE_SIGNUP_NEW_USER_REQUEST,
  BUNDLE_SIGNUP_NEW_USER_SUCCESS,
  BUNDLE_SIGNUP_NEW_USER_FAIL,
} from '../constants/bundleConstants';

export const bundleListReducer = (state = { bundles: [] }, action) => {
  switch (action.type) {
    case BUNDLE_LIST_REQUEST:
      return { loading: true, bundles: [] };
    case BUNDLE_LIST_SUCCESS:
      return {
        loading: false,
        bundles: action.payload.bundles,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case BUNDLE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bundleDetailsReducer = (state = { bundle: { reviews: [] } }, action) => {
  switch (action.type) {
    case BUNDLE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case BUNDLE_DETAILS_SUCCESS:
      return { loading: false, bundle: action.payload };
    case BUNDLE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bundleDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BUNDLE_DELETE_REQUEST:
      return { loading: true };
    case BUNDLE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BUNDLE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bundleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BUNDLE_CREATE_REQUEST:
      return { loading: true };
    case BUNDLE_CREATE_SUCCESS:
      return { loading: false, success: true, bundle: action.payload };
    case BUNDLE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BUNDLE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const bundleUpdateReducer = (state = { bundle: {} }, action) => {
  switch (action.type) {
    case BUNDLE_UPDATE_REQUEST:
      return { loading: true };
    case BUNDLE_UPDATE_SUCCESS:
      return { loading: false, success: true, bundle: action.payload };
    case BUNDLE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BUNDLE_UPDATE_RESET:
      return { bundle: {} };
    default:
      return state;
  }
};

export const bundleReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BUNDLE_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case BUNDLE_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case BUNDLE_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case BUNDLE_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const bundleTopRatedReducer = (state = { bundles: [] }, action) => {
  switch (action.type) {
    case BUNDLE_TOP_REQUEST:
      return { loading: true, bundles: [] };
    case BUNDLE_TOP_SUCCESS:
      return { loading: false, bundles: action.payload };
    case BUNDLE_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bundleLatestReducer = (state = { bundles: [] }, action) => {
  switch (action.type) {
    case BUNDLE_LATEST_REQUEST:
      return { loading: true, bundles: [] };
    case BUNDLE_LATEST_SUCCESS:
      return {
        loading: false,
        bundles: action.payload,
      };
    case BUNDLE_LATEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bundleSignupNewUserReducer = (state = { bundles: [] }, action) => {
  switch (action.type) {
    case BUNDLE_SIGNUP_NEW_USER_REQUEST:
      return { loading: true, bundles: [] };
    case BUNDLE_SIGNUP_NEW_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        bundles: action.payload.bundles,
      };
    case BUNDLE_SIGNUP_NEW_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
