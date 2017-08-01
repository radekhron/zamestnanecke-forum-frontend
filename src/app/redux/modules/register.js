import axios from 'axios';
import { actions } from 'react-redux-form'
import _ from 'lodash'



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
  isPosting: false,
  employeeRegistered: false,
  errorMessage: ''
};

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_COMPANY_DETAILS_REQUEST:
      return Object.assign({},state,{
        isFetching: true,
        isPosting: false,
        employeeRegistered: false,
        errorMessage: ''
      })
    case FETCH_COMPANY_DETAILS_SUCCESS:
      return Object.assign({},state,{
        isFetching: false,
        isPosting: false,
        employeeRegistered: false,
        errorMessage: ''
      })
    case FETCH_COMPANY_DETAILS_FAILURE:
    case POST_EMPLOYEE_REGISTRATION_FAILURE:
      return Object.assign({},state,{
        isFetching:  false,
        isPosting: false,
        employeeRegistered: false,
        errorMessage: action.errorMessage
      })
    case POST_EMPLOYEE_REGISTRATION_REQUEST:
      return Object.assign({},state,{
        isFetching:  false,
        isPosting: true,
        employeeRegistered: false,
        errorMessage: ''
      })
      case POST_EMPLOYEE_REGISTRATION_SUCCESS:
        return Object.assign({},state,{
          isFetching:  false,
          isPosting: false,
          employeeRegistered: true,
          errorMessage: ''
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
    .then(data => {
      dispatch({type: FETCH_COMPANY_DETAILS_SUCCESS})
      dispatch(actions.reset('formData.register'))
      dispatch(actions.merge('formData.register',{company: data.data}))
    })
    .catch(err => dispatch({type: FETCH_COMPANY_DETAILS_FAILURE, errorMessage: err.response.data}));
  }
}

export function postEmployeeRegistration(employee, history) {
  return dispatch => {
    dispatch({type: POST_EMPLOYEE_REGISTRATION_REQUEST});
    const url = 'http://localhost:8888/api/v1/employee/register';
    axios({
      method: 'post',
      url: url,
      headers: {'Content-Type': 'application/json'},
      data: {
        employee: {
          personalInformation: {
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phone: employee.phone,
          },
          company: {
            companyID: employee.company.companyID,
          },
          password: employee.password
        }
      }
    })
    .then(data => {
      dispatch({type: POST_EMPLOYEE_REGISTRATION_SUCCESS});
      history.push('/prihlasit');
    })
    .catch(err => dispatch({type: POST_EMPLOYEE_REGISTRATION_FAILURE, errorMessage: _.get(err, 'response.data') }));
  }
}
