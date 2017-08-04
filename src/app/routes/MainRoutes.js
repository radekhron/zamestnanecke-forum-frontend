// @flow weak

import React from "react";
import { Route, Switch } from "react-router";
import {
  ConnectedHome,
  ConnectedAbout,
  ConnectedCompanyLookup,
  ConnectedRegister,
  ConnectedLogin,
  ConnectedUserList,
  ConnectedCompanyList,
  ConnectedUserDetail,
  ConnectedIssueList,
  ConnectedIssueEdit,
  ConnectedThemeList,
  ConnectedThemeEdit,
  ConnectedEmployeeHome,
  ConnectedEmailOutbox,
  ConnectedDataboxOutbox,
  ConnectedEmailConfirmation
} from "../containers";
import { PageNotFound, Logout } from "../views";

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ConnectedHome} />
      <Route path="/about" component={ConnectedAbout} />
      <Route path="/prihlasit" component={ConnectedLogin} />
      <Route path="/odhlaseni" component={Logout} />
      <Route path="/registrovat/:companyID" component={ConnectedRegister} />
      <Route path="/registrovat" component={ConnectedRegister} />
      <Route path="/admin/uzivatele/seznam" component={ConnectedUserList} />
      <Route path="/admin/uzivatele/:userID" component={ConnectedUserDetail} />
      <Route path="/admin/firmy/seznam" component={ConnectedCompanyList} />
      <Route path="/admin/firmy/:userID" component={ConnectedCompanyList} />
      <Route path="/admin/sablony/seznam" component={ConnectedIssueList} />
      <Route path="/admin/sablony/vytvorit" component={ConnectedIssueEdit} />
      <Route path="/admin/sablony/:issueID" component={ConnectedIssueEdit} />
      <Route path="/admin/temata/seznam" component={ConnectedThemeList} />
      <Route path="/admin/temata/vytvorit" component={ConnectedThemeEdit} />
      <Route path="/admin/temata/:themeID" component={ConnectedThemeEdit} />
      <Route path="/admin/emaily/seznam" component={ConnectedEmailOutbox} />
      <Route
        path="/potvrzeni-emailu/:id"
        component={ConnectedEmailConfirmation}
      />
      <Route
        path="/admin/datova-schranka/seznam"
        component={ConnectedDataboxOutbox}
      />
      <Route path="/hlavni-stranka" component={ConnectedEmployeeHome} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};

export default MainRoutes;
