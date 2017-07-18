// @flow weak

import { routerReducer }    from 'react-router-redux';
import { combineReducers }  from 'redux';
import views                from './views';
import companySearch        from './companySearch';
import fakeModuleWithFetch  from './fakeModuleWithFetch';
import register             from './register';
import login             from './login';
import userList from './userList';
import userDetail from './userDetail';


export const reducers = {
  views,
  companySearch,
  fakeModuleWithFetch,
  register,
  login,
  userList,
  userDetail
};

export default combineReducers({
  ...reducers,
  routing: routerReducer
});
