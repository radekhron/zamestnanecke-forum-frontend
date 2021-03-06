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
  ConnectedCompanyEdit,
  ConnectedUserDetail,
  ConnectedIssueList,
  ConnectedIssueEdit,
  ConnectedThemeList,
  ConnectedThemeEdit,
  ConnectedEmployeeHome,
  ConnectedEmailOutbox,
  ConnectedDataboxOutbox,
  ConnectedEmailConfirmation,
  ConnectedVotingPreparation,
  ConnectedCompanyThemeList,
  ConnectedCompanyIssueList,
  ConnectedEmployer,
  ConnectedEmployerCompanyIssue,
  ConnectedPublishCompanyIssue,
  ConnectedTaskList,
  ConnectedLaunchCompanyIssue
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
      <Route
        path="/zamestnavatel/registrovat/:registrationToken"
        component={ConnectedRegister}
      />
      <Route path="/admin/uzivatele/seznam" component={ConnectedUserList} />
      <Route path="/admin/uzivatele/:userID" component={ConnectedUserDetail} />
      <Route path="/admin/firmy/seznam" component={ConnectedCompanyList} />
      <Route path="/admin/firmy/:companyID" component={ConnectedCompanyEdit} />
      <Route path="/admin/sablony/seznam" component={ConnectedIssueList} />
      <Route path="/admin/sablony/vytvorit" component={ConnectedIssueEdit} />
      <Route path="/admin/sablony/:issueID" component={ConnectedIssueEdit} />
      <Route path="/admin/temata/seznam" component={ConnectedThemeList} />
      <Route path="/admin/temata/vytvorit" component={ConnectedThemeEdit} />
      <Route path="/admin/temata/:themeID" component={ConnectedThemeEdit} />
      <Route
        path="/admin/spustit-pozadavek/firma/:companyID"
        component={ConnectedLaunchCompanyIssue}
      />
      <Route
        path="/admin/temata-ve-firmach/seznam"
        component={ConnectedCompanyThemeList}
      />
      <Route
        path="/admin/pozadavky-ve-firmach/seznam"
        component={ConnectedCompanyIssueList}
      />
      <Route
        path="/admin/hlasovani/prehled"
        component={ConnectedVotingPreparation}
      />
      <Route path="/admin/ukoly" component={ConnectedTaskList} />
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
      <Route
        path="/zamestnavatel/sablony/:companyIssueID"
        component={ConnectedEmployerCompanyIssue}
      />
      <Route
        path="/admin/firemni-sablony/zpravy/:companyIssueID"
        component={ConnectedEmployerCompanyIssue}
      />
      <Route
        path="/admin/firemni-sablony/publikace/:companyIssueID"
        component={ConnectedPublishCompanyIssue}
      />
      <Route path="/zamestnavatel" component={ConnectedEmployer} />

      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};

export default MainRoutes;
