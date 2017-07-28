// @flow weak

import React from 'react';
import {
  Route,
  Switch
 }                              from 'react-router';
import {
  ConnectedHome,
  ConnectedAbout,
  ConnectedCompanyLookup,
  ConnectedRegister,
  ConnectedLogin,
  ConnectedUserList,
  ConnectedUserDetail,
  ConnectedIssueList,
  ConnectedIssueEdit,
  ConnectedThemeList,
  ConnectedThemeEdit,
  ConnectedEmployeeHome
}                               from '../containers';
import {
  PageNotFound,
  Logout
}                               from '../views';

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
      <Route path="/admin/sablony/seznam" component={ConnectedIssueList} />
      <Route path="/admin/sablony/vytvorit" component={ConnectedIssueEdit} />
      <Route path="/admin/sablony/:issueID" component={ConnectedIssueEdit} />
      <Route path="/admin/temata/seznam" component={ConnectedThemeList} />
      <Route path="/admin/temata/vytvorit" component={ConnectedThemeEdit} />
      <Route path="/admin/temata/:themeID" component={ConnectedThemeEdit} />
      <Route path="/hlavni-stranka" component={ConnectedEmployeeHome} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};

export default MainRoutes;
