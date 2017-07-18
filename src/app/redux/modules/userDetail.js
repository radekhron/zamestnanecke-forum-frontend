import axios from 'axios';


// /////////////////////
// constants
// /////////////////////
const FETCH_USER_DETAIL_REQUEST  = 'FETCH_USER_DETAIL_REQUEST';
const FETCH_USER_DETAIL_SUCCESS  = 'FETCH_USER_DETAIL_SUCCESS';
const FETCH_USER_DETAIL_FAILURE  = 'FETCH_USER_DETAIL_FAILURE';
const CHANGE_EMPLOYMENT_CONFIRMATION  = 'CHANGE_EMPLOYMENT_CONFIRMATION';

// /////////////////////
// reducer
// /////////////////////
const initialState = {
  isFetching:  false,
  userDetail: null,
  errorMessage: null
};

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_USER_DETAIL_REQUEST:
      return Object.assign({},state,{
        isFetching:  true,
        userDetail: null,
        errorMessage: null
      })
    case FETCH_USER_DETAIL_SUCCESS:
      return Object.assign({},state,{
        isFetching:  false,
        userDetail: action.userDetail,
        errorMessage: null
      })
    case FETCH_USER_DETAIL_FAILURE:
      return Object.assign({},state,{
        isFetching:  false,
        userDetail: null,
        errorMessage: action.errorMessage
      })
    case CHANGE_EMPLOYMENT_CONFIRMATION:
      let newUserDetail = Object.assign({},state.userDetail);
      newUserDetail[action.target] = action.newValue;
      return Object.assign({},state,{
        isFetching:  false,
        userDetail: newUserDetail,
        errorMessage: null
      })
    default:
      return state
  }
}

// /////////////////////
// action creators
// /////////////////////
export function fetchUserDetail(userID) {
  return dispatch => {
    dispatch({type: FETCH_USER_DETAIL_REQUEST});
    const url = 'http://localhost:8888/api/v1/admin/employee/'+userID;
    axios({
      method: 'get',
      url: url,
      headers: {'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null},
    })
    .then(data => dispatch({type: FETCH_USER_DETAIL_SUCCESS, userDetail: data.data}))
    .catch(err => dispatch({type: FETCH_USER_DETAIL_FAILURE, errorMessage: err.response.data}));
  }
}

export function employmentConfirmationChangeAction(value, target) {
  return dispatch => {
    dispatch({type: CHANGE_EMPLOYMENT_CONFIRMATION, newValue: value, target: target});
  }
}
