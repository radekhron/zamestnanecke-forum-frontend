import axios from 'axios';


// /////////////////////
// constants
// /////////////////////
const COMPANY_SEARCH_REQUEST  = 'COMPANY_SEARCH_REQUEST';
const COMPANY_SEARCH_SUCCESS  = 'COMPANY_SEARCH_SUCCESS';
const COMPANY_SEARCH_FAILURE  = 'COMPANY_SEARCH_FAILURE';

// /////////////////////
// reducer
// /////////////////////
const initialState = {
  isFetching:  false,
  companies:    [],
  errorMessage: {}
};

export default function (state = initialState, action) {
  switch(action.type) {
    case COMPANY_SEARCH_REQUEST:
      return Object.assign({},state,{
        isFetching: true,
        companies: [],
        errorMessage: {}
      })
    case COMPANY_SEARCH_SUCCESS:
      return Object.assign({},state,{
        isFetching: false,
        companies: action.companies,
        errorMessage: {}
      })
    case COMPANY_SEARCH_FAILURE:
      return Object.assign({},state,{
        isFetching:  false,
        companies:    [],
        errorMessage: action.message
      })
    default:
      return state
  }
}

// /////////////////////
// action creators
// /////////////////////
export function searchCompanies(query) {
  return dispatch => {
    dispatch({type: COMPANY_SEARCH_REQUEST});
    axios.post('http://localhost:8888/api/v1/search-companies', query, {headers: {'Content-Type': 'application/json'}})
    .then(data => dispatch({type: COMPANY_SEARCH_SUCCESS, companies: data.data}))
    .catch(err => dispatch({type: COMPANY_SEARCH_FAILURE, errorMessage: err}));
  }
}

function receiveCompanies(companies) {
  return {
    type: COMPANY_SEARCH_SUCCESS,
    isFetching: false,
    companies: companies,
    errorMessage: {}
  }
}
