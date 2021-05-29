import {
  FARM_LIST_REQUEST,
  FARM_LIST_SUCCESS,
  FARM_LIST_FAIL,
  FARM_DETAILS_REQUEST,
  FARM_DETAILS_SUCCESS,
  FARM_DETAILS_FAIL,
} from '../constants/farmConstants';

export const farmListReducer = (state = { farm: [] }, action) => {
  switch (action.type) {
    case FARM_LIST_REQUEST:
      return { loading: true, farm: [] };
    case FARM_LIST_SUCCESS:
      return {
        loading: false,
        farm: action.payload,
      };
    case FARM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const farmDetailsReducer = (state = { farm: [] }, action) => {
  switch (action.type) {
    case FARM_DETAILS_REQUEST:
      return { loading: true, farm: [] };
    case FARM_DETAILS_SUCCESS:
      return {
        loading: false,
        farm: action.payload,
      };
    case FARM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
