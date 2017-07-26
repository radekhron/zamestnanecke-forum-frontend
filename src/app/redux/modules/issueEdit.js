import axios from 'axios';
import _ from 'lodash';


// /////////////////////
// constants
// /////////////////////

const CHANGE_FORM_VALUE  = 'CHANGE_FORM_VALUE';

// /////////////////////
// reducer
// /////////////////////
const initialState = {
  isFetching:  false,
  json: {
    name: null,
    description: null,
    state: 'Draft',
    default: false,
    defaultForSpecificNACE: null
  },
  errorMessage: null
};

export default function (state = initialState, action) {
  switch(action.type) {
    case CHANGE_FORM_VALUE:
      let newJson = _.set(Object.assign({},state.json),action.target,action.newValue);
      return Object.assign({},state,{
        isFetching:  false,
        json: newJson,
        errorMessage: null
      })
    default:
      return state
  }
}

// /////////////////////
// action creators
// /////////////////////

export function formChangeAction(value, target) {
  return dispatch => {
    dispatch({type: CHANGE_FORM_VALUE, newValue: value, target: target});
  }
}
