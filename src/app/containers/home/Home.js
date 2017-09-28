// @flow weak

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as viewsActions from "../../redux/modules/views";
import * as companyLookupActions from "../../redux/modules/companySearch";
import * as anonymousInviteActions from "../../redux/modules/anonymousInvite";
import { Home } from "../../views";

const mapStateToProps = state => {
  return {
    currentView: state.views.currentView,
    companyLookup: state.companySearch,
    anonymousInviteState: state.anonymousInvite
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      enterHome: viewsActions.enterHome,
      leaveHome: viewsActions.leaveHome,
      searchCompanies: companyLookupActions.searchCompanies,
      anonymousInvite: anonymousInviteActions.anonymousInvite
    },
    dispatch
  );
};

/*
  without bindActionCreators:
 */
// const mapDispatchToProps = (dispatch) => {
//   return {
//     enterHome: () => dispatch(viewsActions.enterHome()),
//     leaveHome: () => dispatch(viewsActions.leaveHome())
//   };
// };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
