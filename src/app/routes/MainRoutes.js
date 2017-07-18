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
  ConnectedUserDetail
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
      <Route path="/admin/uzivatele/seznam" component={ConnectedUserList} />
      <Route path="/admin/uzivatele/:userID" component={ConnectedUserDetail} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};

export default MainRoutes;
