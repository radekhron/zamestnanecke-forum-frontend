import axios from "axios";
import _ from "lodash";
import { appConfig } from "../../config";
import { actions } from "react-redux-form";

// /////////////////////
// constants
// /////////////////////

const ANONYMOUS_INVITE_REQUEST = "ANONYMOUS_INVITE_REQUEST";
const ANONYMOUS_INVITE_SUCCESS = "ANONYMOUS_INVITE_SUCCESS";
const ANONYMOUS_INVITE_FAILURE = "ANONYMOUS_INVITE_FAILURE";
const RESET_ANONYMOUS_INVITE = "RESET_ANONYMOUS_INVITE";

// /////////////////////
// reducer
// /////////////////////
const initialState = {
  isFetching: false,
  isPosting: false,
  wasPosting: false,
  object: null,
  errorMessage: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ANONYMOUS_INVITE_REQUEST:
      return Object.assign({}, state, {
        isFetching: false,
        isPosting: true,
        errorMessage: null
      });
    case ANONYMOUS_INVITE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isPosting: false,
        wasPosting: true,
        object: action.object || state.object,
        errorMessage: null
      });
    case ANONYMOUS_INVITE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isPosting: false,
        errorMessage: action.errorMessage
      });
    case RESET_ANONYMOUS_INVITE:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}

// /////////////////////
// action creators
// /////////////////////

export function anonymousInvite(email, companyID) {
  return dispatch => {
    dispatch({ type: ANONYMOUS_INVITE_REQUEST });
    const url =
      appConfig.api.serverUrl + appConfig.apiVersion + "/anonymous-invitation";
    const payload = {
      email: email,
      companyID: companyID
    };
    console.log(payload);
    axios({
      method: "post",
      url: url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt")
          ? localStorage.getItem("jwt")
          : null
      }
    })
      .then(data => {
        dispatch({ type: ANONYMOUS_INVITE_SUCCESS, object: data.data });
        setTimeout(() => {
          dispatch({ type: RESET_ANONYMOUS_INVITE });
        }, 4000);
      })
      .catch(err => {
        dispatch({
          type: ANONYMOUS_INVITE_FAILURE,
          errorMessage: _.get(err, "response.data") || err
        });
        setTimeout(() => {
          dispatch({ type: RESET_ANONYMOUS_INVITE });
        }, 4000);
      });
  };
}

// export function formChangeAction(value, target) {
//   return dispatch => {
//     dispatch({type: CHANGE_FORM_VALUE, newValue: value, target: target});
//   }
// }
