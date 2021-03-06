import axios from "axios";
import _ from "lodash";
import { appConfig } from "../../config";
import { actions } from "react-redux-form";
import { fetchListByEndpoint } from "./objectList";

// /////////////////////
// constants
// /////////////////////

const FETCH_OBJECT_REQUEST = "FETCH_OBJECT_REQUEST";
const FETCH_OBJECT_SUCCESS = "FETCH_OBJECT_SUCCESS";
const FETCH_OBJECT_FAILURE = "FETCH_OBJECT_FAILURE";

const POST_OBJECT_REQUEST = "POST_OBJECT_REQUEST";
const POST_OBJECT_SUCCESS = "POST_OBJECT_SUCCESS";
const POST_OBJECT_ANIMATION_END = "POST_OBJECT_ANIMATION_END";
const POST_OBJECT_FAILURE = "POST_OBJECT_FAILURE";

const POST_EMPLOYMENT_CONFIRMATION_SUCCESS =
  "POST_EMPLOYMENT_CONFIRMATION_SUCCESS";
const DELETE_EMPLOYMENT_CONFIRMATION_SUCCESS =
  "DELETE_EMPLOYMENT_CONFIRMATION_SUCCESS";

const RESET_OBJECT_EDIT = "RESET_OBJECT_EDIT";

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
    case FETCH_OBJECT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isPosting: false,
        object: null,
        errorMessage: null
      });
    case POST_OBJECT_REQUEST:
      return Object.assign({}, state, {
        isFetching: false,
        isPosting: true,
        errorMessage: null
      });
    case FETCH_OBJECT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isPosting: false,
        object: action.object || state.object,
        errorMessage: null
      });
    case POST_OBJECT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isPosting: false,
        wasPosting: true,
        object: action.object || state.object,
        errorMessage: null
      });
    case POST_OBJECT_ANIMATION_END:
      return Object.assign({}, state, {
        wasPosting: false
      });
    case POST_EMPLOYMENT_CONFIRMATION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isPosting: false,
        object: {
          ...state.object,
          pathToEmploymentConfirmation: action.employementConfirmationUrl
        },
        errorMessage: null
      });
    case DELETE_EMPLOYMENT_CONFIRMATION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isPosting: false,
        object: { ...state.object, pathToEmploymentConfirmation: null },
        errorMessage: null
      });
    case FETCH_OBJECT_FAILURE:
    case POST_OBJECT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isPosting: false,
        errorMessage: action.errorMessage
      });
    case RESET_OBJECT_EDIT:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}

// /////////////////////
// action creators
// /////////////////////

export function fetchObjectDetailAndUpdateFormModel(
  endpoint,
  ID,
  model,
  dataPath = null
) {
  return dispatch => {
    dispatch({ type: FETCH_OBJECT_REQUEST });
    const url = appConfig.api.serverUrl + appConfig.apiVersion + endpoint + ID;
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
        dispatch({ type: FETCH_OBJECT_SUCCESS, object: data.data });
        dispatch(actions.merge(model, _.get(data.data, dataPath, data.data)));
      })
      .catch(err =>
        dispatch({
          type: FETCH_OBJECT_FAILURE,
          errorMessage: _.get(err, "response.data") || _.get(err, "response")
        })
      );
  };
}

export function postObjectForCreateOrUpdate(
  endpoint,
  data,
  history,
  forwardToAfterCreate
) {
  return dispatch => {
    dispatch({ type: POST_OBJECT_REQUEST });
    const urlEnding =
      _.get(data, "_id") || _.get(data, "id")
        ? _.get(data, "_id") || _.get(data, "id")
        : "create";
    const url =
      appConfig.api.serverUrl + appConfig.apiVersion + endpoint + urlEnding;
    axios({
      method: "post",
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt")
          ? localStorage.getItem("jwt")
          : null
      }
    })
      .then(data => {
        dispatch({ type: POST_OBJECT_SUCCESS });
        if (urlEnding === "create") {
          history.push(forwardToAfterCreate);
        }
      })
      .catch(err =>
        dispatch({ type: POST_OBJECT_FAILURE, errorMessage: err.response.data })
      );
  };
}

export function resetModelDetail(model) {
  return dispatch => {
    dispatch(actions.reset(model));
  };
}

export function fetchObjectDetail(endpoint, ID) {
  return dispatch => {
    dispatch({ type: FETCH_OBJECT_REQUEST });
    const url =
      appConfig.api.serverUrl +
      appConfig.apiVersion +
      endpoint +
      (ID === null ? "" : ID);
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
        dispatch({ type: FETCH_OBJECT_SUCCESS, object: data.data });
      })
      .catch(err =>
        dispatch({
          type: FETCH_OBJECT_FAILURE,
          errorMessage: err.response.data
        })
      );
  };
}

export function postEmploymentConfirmationUrl(employementConfirmationUrl) {
  return dispatch => {
    dispatch({ type: POST_OBJECT_REQUEST });
    const url =
      appConfig.api.serverUrl +
      appConfig.apiVersion +
      "/employee/protected/employementConfirmation";
    axios({
      method: "post",
      url: url,
      data: { employementConfirmationUrl: employementConfirmationUrl },
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt")
          ? localStorage.getItem("jwt")
          : null
      }
    })
      .then(data => {
        dispatch({
          type: POST_EMPLOYMENT_CONFIRMATION_SUCCESS,
          employementConfirmationUrl: employementConfirmationUrl
        });
        dispatch(fetchObjectDetail("/employee/protected/homepage", null));
      })
      .catch(err =>
        dispatch({ type: POST_OBJECT_FAILURE, errorMessage: err.response.data })
      );
  };
}

export function deleteEmploymentConfirmation() {
  return dispatch => {
    dispatch({ type: POST_OBJECT_REQUEST });
    const url =
      appConfig.api.serverUrl +
      appConfig.apiVersion +
      "/employee/protected/employementConfirmation";
    axios({
      method: "delete",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt")
          ? localStorage.getItem("jwt")
          : null
      }
    })
      .then(data => {
        dispatch({ type: DELETE_EMPLOYMENT_CONFIRMATION_SUCCESS });
        dispatch(fetchObjectDetail("/employee/protected/homepage", null));
      })
      .catch(err =>
        dispatch({ type: POST_OBJECT_FAILURE, errorMessage: err.response.data })
      );
  };
}

export function postObjectForUpdateAndFetchList(
  endpoint,
  data,
  newListEndpoint
) {
  return dispatch => {
    dispatch({ type: POST_OBJECT_REQUEST });
    const url =
      appConfig.api.serverUrl +
      appConfig.apiVersion +
      endpoint +
      (_.get(data, "_id") || _.get(data, "id"));
    axios({
      method: "post",
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt")
          ? localStorage.getItem("jwt")
          : null
      }
    })
      .then(data => {
        dispatch({ type: POST_OBJECT_SUCCESS });
        dispatch(fetchListByEndpoint(newListEndpoint));
      })
      .catch(err =>
        dispatch({ type: POST_OBJECT_FAILURE, errorMessage: err.response.data })
      );
  };
}

export function postObjectToEndpointAndUpdate(endpoint, ID, data) {
  return dispatch => {
    dispatch({ type: POST_OBJECT_REQUEST });
    const url =
      appConfig.api.serverUrl + appConfig.apiVersion + endpoint + "/" + ID;
    axios({
      method: "post",
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt")
          ? localStorage.getItem("jwt")
          : null
      }
    })
      .then(data => {
        dispatch({ type: POST_OBJECT_SUCCESS });
        dispatch(fetchObjectDetail(endpoint + "/", ID));
        if (endpoint === "/employer/companyissue") {
          dispatch(resetModelDetail("formData.companyIssueMessage"));
        }
      })
      .catch(err =>
        dispatch({
          type: POST_OBJECT_FAILURE,
          errorMessage: _.get(err, "response.data")
        })
      );
  };
}

export function pushItemToModel(model, item) {
  return dispatch => {
    dispatch(actions.push(model, item));
  };
}

export function removeItemFromModel(model, index) {
  return dispatch => {
    dispatch(actions.remove(model, index));
  };
}

export function mergeDataWithModel(model, data) {
  return dispatch => {
    dispatch(actions.merge(model, data));
  };
}

export function postCompanyIssueForPublishAndForwardToTheList(
  ID,
  data,
  history
) {
  return dispatch => {
    dispatch({ type: POST_OBJECT_REQUEST });
    const endpoint = "/admin/companyissue/";
    const url = appConfig.api.serverUrl + appConfig.apiVersion + endpoint + ID;
    axios({
      method: "post",
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt")
          ? localStorage.getItem("jwt")
          : null
      }
    })
      .then(data => {
        dispatch({ type: POST_OBJECT_SUCCESS });
        history.push("/admin/pozadavky-ve-firmach/seznam");
      })
      .catch(err =>
        dispatch({ type: POST_OBJECT_FAILURE, errorMessage: err.response.data })
      );
  };
}

export function postObjectToEndpoint(endpoint, data) {
  return dispatch => {
    dispatch({ type: POST_OBJECT_REQUEST });
    const url = appConfig.api.serverUrl + appConfig.apiVersion + endpoint;
    axios({
      method: "post",
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt")
          ? localStorage.getItem("jwt")
          : null
      }
    })
      .then(data => {
        dispatch({ type: POST_OBJECT_SUCCESS });
      })
      .catch(err =>
        dispatch({ type: POST_OBJECT_FAILURE, errorMessage: err.response.data })
      );
  };
}

export function resetObjectEdit() {
  return dispatch => {
    dispatch({ type: RESET_OBJECT_EDIT });
  };
}

export function anonymousInvite(email, companyID) {
  return dispatch => {
    dispatch({ type: POST_OBJECT_REQUEST });
    const url =
      appConfig.api.serverUrl + appConfig.apiVersion + "/anonymous-invitation";
    const payload = {
      email: email,
      companyID: companyID
    };
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
        dispatch({ type: POST_OBJECT_SUCCESS, object: data.data });
        setTimeout(() => {
          dispatch({ type: RESET_OBJECT_EDIT });
        }, 4000);
      })
      .catch(err =>
        dispatch({
          type: POST_OBJECT_FAILURE,
          errorMessage: _.get(err, "response.data") || err
        })
      );
  };
}

// export function formChangeAction(value, target) {
//   return dispatch => {
//     dispatch({type: CHANGE_FORM_VALUE, newValue: value, target: target});
//   }
// }
