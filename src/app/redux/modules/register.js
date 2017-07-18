import axios from 'axios';


// /////////////////////
// constants
// /////////////////////
const FETCH_COMPANY_DETAILS_REQUEST  = 'FETCH_COMPANY_DETAILS_REQUEST';
const FETCH_COMPANY_DETAILS_SUCCESS  = 'FETCH_COMPANY_DETAILS_SUCCESS';
const FETCH_COMPANY_DETAILS_FAILURE  = 'FETCH_COMPANY_DETAILS_FAILURE';
const POST_EMPLOYEE_REGISTRATION_REQUEST  = 'POST_EMPLOYEE_REGISTRATION_REQUEST';
const POST_EMPLOYEE_REGISTRATION_SUCCESS  = 'POST_EMPLOYEE_REGISTRATION_SUCCESS';
const POST_EMPLOYEE_REGISTRATION_FAILURE  = 'POST_EMPLOYEE_REGISTRATION_FAILURE';

// /////////////////////
// reducer
// /////////////////////
const initialState = {
  isFetching:  false,
  isPostingRegistration: false,
  company:    null,
  employeeRegistered: false,
  errorMessage: {}
};

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_COMPANY_DETAILS_REQUEST:
      return Object.assign({},state,{
        isFetching: true,
        isPostingRegistration: false,
        company: null,
        employeeRegistered: false,
        errorMessage: {}
      })
    case FETCH_COMPANY_DETAILS_SUCCESS:
      return Object.assign({},state,{
        isFetching: false,
        isPostingRegistration: false,
        company: action.company,
        employeeRegistered: false,
        errorMessage: {}
      })
    case FETCH_COMPANY_DETAILS_FAILURE:
    case POST_EMPLOYEE_REGISTRATION_FAILURE:
      return Object.assign({},state,{
        isFetching:  false,
        isPostingRegistration: false,
        company: null,
        employeeRegistered: false,
        errorMessage: action.errorMessage
      })
    case POST_EMPLOYEE_REGISTRATION_REQUEST:
      return Object.assign({},state,{
        isFetching:  false,
        isPostingRegistration: true,
        company: state.company,
        employeeRegistered: false,
        errorMessage: {}
      })
      case POST_EMPLOYEE_REGISTRATION_SUCCESS:
        return Object.assign({},state,{
          isFetching:  false,
          isPostingRegistration: false,
          company: state.company,
          employeeRegistered: true,
          errorMessage: {}
        })
    default:
      return state
  }
}

// /////////////////////
// action creators
// /////////////////////
export function fetchCompanyDetails(companyID) {
  return dispatch => {
    dispatch({type: FETCH_COMPANY_DETAILS_REQUEST});
    const url = 'http://localhost:8888/api/v1/find-company/'+companyID;
    axios({
      method: 'get',
      url: url
    })
    .then(data => dispatch({type: FETCH_COMPANY_DETAILS_SUCCESS, company: data.data}))
    .catch(err => dispatch({type: FETCH_COMPANY_DETAILS_FAILURE, errorMessage: err.response.data}));
  }
}

export function postEmployeeRegistration(employee) {
  return dispatch => {
    dispatch({type: POST_EMPLOYEE_REGISTRATION_REQUEST});
    const url = 'http://localhost:8888/api/v1/employee/register';
    axios({
      method: 'post',
      url: url,
      headers: {'Content-Type': 'application/json'},
      data: employee
    })
    .then(data => {
      dispatch({type: POST_EMPLOYEE_REGISTRATION_SUCCESS});
    })
    .catch(err => dispatch({type: POST_EMPLOYEE_REGISTRATION_FAILURE, errorMessage: err}));
  }
}
