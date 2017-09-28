// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { CompanyLookup, AnonymousInvitation } from "../../components";
import { Link } from "react-router-dom";

class Home extends Component {
  static propTypes = {
    currentView: PropTypes.string.isRequired,
    enterHome: PropTypes.func.isRequired,
    leaveHome: PropTypes.func.isRequired,
    searchCompanies: PropTypes.func.isRequired
  };

  render() {
    const { searchCompanies, companyLookup, anonymousInvite } = this.props;
    return (
      <div>
        <CompanyLookup
          onCompanySearchClick={query => searchCompanies(query)}
          isFetching={companyLookup.isFetching}
          companies={companyLookup.companies}
        />
        <AnonymousInvitation
          onInviteClick={(email, companyID) => {
            anonymousInvite(email, companyID);
          }}
          companyID=""
          communicationState={this.props.anonymousInviteState}
        />
      </div>
    );
  }
}

export default Home;
