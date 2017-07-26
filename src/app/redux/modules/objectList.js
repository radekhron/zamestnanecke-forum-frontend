import axios from 'axios';


// /////////////////////
// constants
// /////////////////////
const FETCH_LIST_REQUEST  = 'FETCH_LIST_REQUEST';
const FETCH_LIST_SUCCESS  = 'FETCH_LIST_SUCCESS';
const FETCH_LIST_FAILURE  = 'FETCH_LIST_FAILURE';

// /////////////////////
// reducer
// /////////////////////
const initialState = {
  isFetching:  false,
  list: [],
  errorMessage: null
};

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_LIST_REQUEST:
      return Object.assign({},state,{
        isFetching:  true,
        list: [],
        errorMessage: null
      })
    case FETCH_LIST_SUCCESS:
      return Object.assign({},state,{
        isFetching:  false,
        list: action.list,
        errorMessage: null
      })
    case FETCH_LIST_FAILURE:
      return Object.assign({},state,{
        isFetching:  false,
        list: [],
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

// /////////////////////
// action creators
// /////////////////////
export function fetchIssueList() {
  return dispatch => {
    dispatch({type: FETCH_LIST_REQUEST});
    const url = 'http://localhost:8888/api/v1/admin/issue/list';
    axios({
      method: 'get',
      url: url,
      headers: {'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null},
    })
    .then(data => dispatch({type: FETCH_LIST_SUCCESS, list: data.data}))
    .catch(err => dispatch({type: FETCH_LIST_FAILURE, errorMessage: err.response.data}));
  }
}

export function fetchThemeList() {
  return dispatch => {
    dispatch({type: FETCH_LIST_REQUEST});
    const url = 'http://localhost:8888/api/v1/admin/theme/list';
    axios({
      method: 'get',
      url: url,
      headers: {'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null},
    })
    .then(data => dispatch({type: FETCH_LIST_SUCCESS, list: data.data}))
    .catch(err => dispatch({type: FETCH_LIST_FAILURE, errorMessage: err.response.data}));
  }
}

export function resetList() {
  return dispatch => {
    dispatch({type: FETCH_LIST_SUCCESS, list: []});
  }
}
