import axios from 'axios';


// /////////////////////
// constants
// /////////////////////
const FETCH_USER_LIST_REQUEST  = 'FETCH_USER_LIST_REQUEST';
const FETCH_USER_LIST_SUCCESS  = 'FETCH_USER_LIST_SUCCESS';
const FETCH_USER_LIST_FAILURE  = 'FETCH_USER_LIST_FAILURE';

// /////////////////////
// reducer
// /////////////////////
const initialState = {
  isFetching:  false,
  userList: [],
  errorMessage: null
};

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_USER_LIST_REQUEST:
      return Object.assign({},state,{
        isFetching:  true,
        userList: [],
        errorMessage: null
      })
    case FETCH_USER_LIST_SUCCESS:
      return Object.assign({},state,{
        isFetching:  false,
        userList: action.userList,
        errorMessage: null
      })
    case FETCH_USER_LIST_FAILURE:
      return Object.assign({},state,{
        isFetching:  false,
        userList: [],
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

// /////////////////////
// action creators
// /////////////////////
export function fetchUserList() {
  return dispatch => {
    dispatch({type: FETCH_USER_LIST_REQUEST});
    const url = 'http://localhost:8888/api/v1/admin/employee/list';
    axios({
      method: 'get',
      url: url,
      headers: {'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null},
    })
    .then(data => dispatch({type: FETCH_USER_LIST_SUCCESS, userList: data.data}))
    .catch(err => dispatch({type: FETCH_USER_LIST_FAILURE, errorMessage: err.response.data}));
  }
}
