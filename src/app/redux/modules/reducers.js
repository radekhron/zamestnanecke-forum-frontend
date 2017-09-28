// @flow weak

import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { combineForms } from "react-redux-form";
import views from "./views";
import companySearch from "./companySearch";
import fakeModuleWithFetch from "./fakeModuleWithFetch";
import register from "./register";
import login from "./login";
import userList from "./userList";
import userDetail from "./userDetail";
import objectList from "./objectList";
import issueEdit from "./issueEdit";
import objectEdit from "./objectEdit";
import voting from "./voting";
import anonymousInvite from "./anonymousInvite";
import { initialFormState } from "./formInitialValues";

export const reducers = {
  voting,
  views,
  companySearch,
  fakeModuleWithFetch,
  register,
  login,
  userList,
  userDetail,
  objectList,
  issueEdit,
  objectEdit,
  anonymousInvite
};

export default combineReducers({
  ...reducers,
  formData: combineForms(initialFormState, "formData"),
  routing: routerReducer
});
