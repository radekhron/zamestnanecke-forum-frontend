import axios from 'axios';

// /////////////////////
// constants
// /////////////////////
const POST_EMPLOYEE_LOGIN_REQUEST  = 'POST_EMPLOYEE_LOGIN_REQUEST';
const POST_EMPLOYEE_LOGIN_SUCCESS  = 'POST_EMPLOYEE_LOGIN_SUCCESS';
const POST_EMPLOYEE_LOGIN_FAILURE  = 'POST_EMPLOYEE_LOGIN_FAILURE';

const EMPLOYEE_LOGOUT_REQUEST = 'EMPLOYEE_LOGOUT_REQUEST';
const EMPLOYEE_LOGOUT_SUCCESS = 'EMPLOYEE_LOGOUT_SUCCESS';
const EMPLOYEE_LOGOUT_FAILURE = 'EMPLOYEE_LOGOUT_FAILURE';


// /////////////////////
// reducer
// /////////////////////
const decodedJwt = parseJwt(localStorage.getItem('jwt'));


const initialState = {
  isFetching:  false,
  isAuthenticated: decodedJwt ? true : false,
  role: decodedJwt ? decodedJwt.permissions : null,
  errorMessage: null
};

export default function (state = initialState, action) {
  switch(action.type) {
    case POST_EMPLOYEE_LOGIN_REQUEST:
      return Object.assign({},state,{
        isFetching: true,
        isAuthenticated: false,
        role: null,
        errorMessage: null
      })
    case POST_EMPLOYEE_LOGIN_SUCCESS:
      return Object.assign({},state,{
        isFetching: false,
        isAuthenticated: true,
        role: action.role,
        errorMessage: null
      })
    case POST_EMPLOYEE_LOGIN_FAILURE:
      return Object.assign({},state,{
        isFetching: false,
        isAuthenticated: false,
        role: null,
        errorMessage: action.errorMessage
      })
    case EMPLOYEE_LOGOUT_SUCCESS:
      return Object.assign({},state,{
        isFetching: false,
        isAuthenticated: false,
        role: null,
        errorMessage: null
      })
    default:
      return state
  }
}

// /////////////////////
// action creators
// /////////////////////

export function postEmployeeLogin(loginData) {
  return dispatch => {
    dispatch({type:POST_EMPLOYEE_LOGIN_REQUEST});
    const url = 'http://localhost:8888/api/v1/employee/authenticate';
    axios({
      method: 'post',
      url: url,
      headers: {'Content-Type': 'application/json'},
      data: loginData
    })
    .then(data => {
      localStorage.setItem('jwt', data.data.token)
      const decodedJwt = parseJwt(data.data.token);
      dispatch({type: POST_EMPLOYEE_LOGIN_SUCCESS, role: decodedJwt.permissions});
    })
    .catch(err => dispatch({type: POST_EMPLOYEE_LOGIN_FAILURE, errorMessage: err}));
  }
}

export function employeeLogout() {
  return dispatch => {
    localStorage.removeItem('jwt')
    dispatch({type:EMPLOYEE_LOGOUT_SUCCESS})
  }
}

function parseJwt (token) {
    if (!token) {
      return null;
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};
