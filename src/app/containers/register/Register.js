// @flow weak

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Register } from "../../views";
import * as registerActions from "../../redux/modules/register";
import * as companyLookupActions from "../../redux/modules/companySearch";
import * as objectEditActions from "../../redux/modules/objectEdit";

const mapStateToProps = state => {
  return {
    registerForm: state.formData.register,
    registerState: state.register,
    companyLookup: state.companySearch
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCompanyDetails: registerActions.fetchCompanyDetails,
      postEmployeeRegistration: registerActions.postEmployeeRegistration,
      postEmployerRegistration: registerActions.postEmployerRegistration,
      searchCompanies: companyLookupActions.searchCompanies,
      resetModelDetail: objectEditActions.resetModelDetail
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
