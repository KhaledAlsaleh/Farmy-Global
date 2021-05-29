import axios from 'axios';
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
  BUNDLE_UPDATE_REQUEST,
  BUNDLE_UPDATE_SUCCESS,
  BUNDLE_UPDATE_FAIL,
  BUNDLE_CREATE_REVIEW_REQUEST,
  BUNDLE_CREATE_REVIEW_SUCCESS,
  BUNDLE_CREATE_REVIEW_FAIL,
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
import { logout } from './userActions';

export const listBundles = (
  keyword = '',
  minPrice = '',
  maxPrice = '',
  rating = '',
  category = '',
  sortBy = ''
) => async (dispatch) => {
  try {
    dispatch({ type: BUNDLE_LIST_REQUEST });

    const { data } = await axios.get(
      `/api/bundles?keyword=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}${
        isNaN(rating) ? '' : `&rating=${rating}`
      }${category && category !== 'All' ? `&category=${category}` : ''}&sortBy=${sortBy}`
    );

    dispatch({
      type: BUNDLE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BUNDLE_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listBundleDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BUNDLE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/bundles/${id}`);

    dispatch({
      type: BUNDLE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BUNDLE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteBundle = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUNDLE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/bundles/${id}`, config);

    dispatch({
      type: BUNDLE_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: BUNDLE_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createBundle = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUNDLE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/bundles`, {}, config);

    dispatch({
      type: BUNDLE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: BUNDLE_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateBundle = (bundle) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUNDLE_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/bundles/${bundle._id}`, bundle, config);

    dispatch({
      type: BUNDLE_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: BUNDLE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: BUNDLE_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const createBundleReview = (bundleId, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUNDLE_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/bundles/${bundleId}/reviews`, review, config);

    dispatch({
      type: BUNDLE_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: BUNDLE_CREATE_REVIEW_FAIL,
      payload: message,
    });
  }
};

export const listTopBundles = () => async (dispatch) => {
  try {
    dispatch({ type: BUNDLE_TOP_REQUEST });

    const { data } = await axios.get(`/api/bundles/top`);

    dispatch({
      type: BUNDLE_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BUNDLE_TOP_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listLatestBundles = () => async (dispatch) => {
  try {
    dispatch({ type: BUNDLE_LATEST_REQUEST });

    const { data } = await axios.get(`/api/bundles/latest`);

    dispatch({
      type: BUNDLE_LATEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BUNDLE_LATEST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listBundlesNewUser = () => async (dispatch) => {
  try {
    dispatch({ type: BUNDLE_SIGNUP_NEW_USER_REQUEST });

    const { data } = await axios.get(`/api/bundles`);

    dispatch({
      type: BUNDLE_SIGNUP_NEW_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BUNDLE_SIGNUP_NEW_USER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
