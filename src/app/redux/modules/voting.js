import axios from "axios";
import _ from "lodash";
import { appConfig } from "../../config";
import { actions } from "react-redux-form";
import { fetchObjectDetail } from "./objectEdit";

// /////////////////////
// constants
// /////////////////////

const FETCH_VOTE_REQUEST = "FETCH_VOTE_REQUEST";
const FETCH_VOTE_SUCCESS = "FETCH_VOTE_SUCCESS";
const FETCH_VOTE_FAILURE = "FETCH_VOTE_FAILURE";

// /////////////////////
// reducer
// /////////////////////
const initialState = {
  isFetching: false,
  voteStatus: null,
  errorMessage: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_VOTE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        voteStatus: null,
        errorMessage: null
      });
    case FETCH_VOTE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        voteStatus: action.voteStatus || state.voteStatus,
        errorMessage: null
      });
    case FETCH_VOTE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isPosting: false,
        errorMessage: action.errorMessage
      });
    default:
      return state;
  }
}

// /////////////////////
// action creators
// /////////////////////

export function fetchVoteStatus(endpoint, ID, type) {
  return dispatch => {
    dispatch({ type: FETCH_VOTE_REQUEST });
    const url =
      appConfig.api.serverUrl +
      appConfig.apiVersion +
      endpoint +
      "/" +
      ID +
      "/" +
      type;
    axios({
      method: "get",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt")
          ? localStorage.getItem("jwt")
          : null
      }
    })
      .then(data => {
        dispatch({ type: FETCH_VOTE_SUCCESS, voteStatus: data.data });
        dispatch(fetchObjectDetail("/employee/protected/homepage", null));
      })
      .catch(err =>
        dispatch({
          type: FETCH_VOTE_FAILURE,
          errorMessage: _.get(err, "response.data")
        })
      );
  };
}
