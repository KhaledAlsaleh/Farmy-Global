import { BUNDLES_LIST_REQUEST, BUNDLES_LIST_SUCCESS, BUNDLES_LIST_FAIL } from '../constants/bundlesConstants'

export const budlesListReducer = (state = { bundles: [] }, action) => {
  switch (action.type) {
    case BUNDLES_LIST_REQUEST:
      return { loading: true, bundles: [] }
    case BUNDLES_LIST_SUCCESS:
      return {
        loading: false,
        bundles: action.payload.bundles,
      }
    case BUNDLES_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}