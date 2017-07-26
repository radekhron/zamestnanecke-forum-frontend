// @flow weak

import { routerReducer }    from 'react-router-redux';
import { combineReducers }  from 'redux';
import { combineForms } from 'react-redux-form';
import views                from './views';
import companySearch        from './companySearch';
import fakeModuleWithFetch  from './fakeModuleWithFetch';
import register             from './register';
import login             from './login';
import userList from './userList';
import userDetail from './userDetail';
import objectList from './objectList';
import issueEdit from './issueEdit';
import objectEdit from './objectEdit';


export const reducers = {
  views,
  companySearch,
  fakeModuleWithFetch,
  register,
  login,
  userList,
  userDetail,
  objectList,
  issueEdit,
  objectEdit
};

const initialThemeState = {
  name: '',
  description: '',
  linkedIssue: '',
  state: 'In buffer'
}

const initialIssueState = {
  name: '',
  description: '',
  state: 'In buffer',
  default: false,
  defaultForSpecificNACE: ''
}

export default combineReducers({
  ...reducers,
  formData: combineForms({
    theme: initialThemeState,
    issue: initialIssueState
  }, 'formData'),
  routing: routerReducer
});
