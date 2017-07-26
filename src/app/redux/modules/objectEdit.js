import axios              from 'axios';
import _ from 'lodash';
import { appConfig }      from '../../config';
import { actions } from 'react-redux-form'


// /////////////////////
// constants
// /////////////////////

const FETCH_OBJECT_REQUEST = 'FETCH_OBJECT_REQUEST';
const FETCH_OBJECT_SUCCESS = 'FETCH_OBJECT_SUCCESS';
const FETCH_OBJECT_FAILURE = 'FETCH_OBJECT_FAILURE';

const POST_OBJECT_REQUEST = 'POST_OBJECT_REQUEST';
const POST_OBJECT_SUCCESS = 'POST_OBJECT_SUCCESS';
const POST_OBJECT_FAILURE = 'POST_OBJECT_FAILURE';

// /////////////////////
// reducer
// /////////////////////
const initialState = {
  isFetching:  false,
  isPosting: false,
  errorMessage: null
};

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_OBJECT_REQUEST:
      return Object.assign({},state,{
        isFetching:  true,
        isPosting: false,
        errorMessage: null
      })
    case POST_OBJECT_REQUEST:
      return Object.assign({},state,{
        isFetching:  false,
        isPosting: true,
        errorMessage: null
      })
    case FETCH_OBJECT_SUCCESS:
    case POST_OBJECT_SUCCESS:
      return Object.assign({},state,{
        isFetching:  false,
        isPosting: false,
        errorMessage: null
      })
    case FETCH_OBJECT_FAILURE:
    case POST_OBJECT_FAILURE:
      return Object.assign({},state,{
        isFetching:  true,
        isPosting: false,
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

// /////////////////////
// action creators
// /////////////////////

export function fetchObjectDetailAndUpdateFormModel(endpoint, ID, model) {
  return dispatch => {
    dispatch({type: FETCH_OBJECT_REQUEST});
    const url = appConfig.api.serverUrl + appConfig.apiVersion + endpoint + ID;
    axios({
      method: 'get',
      url: url,
      headers: {'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null},
    })
    .then(data => {
      dispatch({type: FETCH_OBJECT_SUCCESS});
      dispatch(actions.merge(model,data.data))
    })
    .catch(err => dispatch({type: FETCH_OBJECT_FAILURE, errorMessage: err.response.data}));
  }
}

export function postObjectForCreateOrUpdate(endpoint, data, history, forwardToAfterCreate) {
  return dispatch => {
    dispatch({type: POST_OBJECT_REQUEST});
    const urlEnding = (_.get(data,'_id')) ? _.get(data,'_id') : 'create';
    const url = appConfig.api.serverUrl + appConfig.apiVersion + endpoint + urlEnding;
    axios({
      method: 'post',
      url: url,
      data: data,
      headers: {'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null},
    })
    .then(data => {
      dispatch({type: POST_OBJECT_SUCCESS});
      history.push(forwardToAfterCreate);
    })
    .catch(err => dispatch({type: POST_OBJECT_FAILURE, errorMessage: err.response.data}));
  }
}

export function resetModelDetail(model) {
  return dispatch => {
    dispatch(actions.reset(model));
  }
}

// export function formChangeAction(value, target) {
//   return dispatch => {
//     dispatch({type: CHANGE_FORM_VALUE, newValue: value, target: target});
//   }
// }
