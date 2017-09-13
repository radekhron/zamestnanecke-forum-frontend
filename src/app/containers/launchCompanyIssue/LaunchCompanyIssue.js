// @flow weak

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { LaunchCompanyIssue } from "../../views";
import * as objectListActions from "../../redux/modules/objectList";
import * as objectEditActions from "../../redux/modules/objectEdit";

const mapStateToProps = state => {
  return {
    objectEdit: state.objectEdit,
    issueList: state.objectList,
    launchCompanyIssue: state.formData.launchCompanyIssue
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchIssueList: objectListActions.fetchIssueList,
      fetchObjectDetail: objectEditActions.fetchObjectDetail,
      postObjectToEndpoint: objectEditActions.postObjectToEndpoint,
      mergeDataWithModel: objectEditActions.mergeDataWithModel
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

export default connect(mapStateToProps, mapDispatchToProps)(LaunchCompanyIssue);
