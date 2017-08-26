// @flow weak

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PublishCompanyIssue } from "../../views";
import * as objectEditActions from "../../redux/modules/objectEdit";

const mapStateToProps = state => {
  return {
    companyIssue: state.objectEdit,
    message: state.formData.companyIssueMessage,
    publish: state.formData.companyIssuePublish,
    userID: state.login.userID
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchObjectDetailAndUpdateFormModel:
        objectEditActions.fetchObjectDetailAndUpdateFormModel,
      postObjectToEndpointAndUpdate:
        objectEditActions.postObjectToEndpointAndUpdate,
      resetModelDetail: objectEditActions.resetModelDetail,
      pushItemToModel: objectEditActions.pushItemToModel,
      removeItemFromModel: objectEditActions.removeItemFromModel,
      postCompanyIssueForPublishAndForwardToTheList:
        objectEditActions.postCompanyIssueForPublishAndForwardToTheList
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

export default connect(mapStateToProps, mapDispatchToProps)(
  PublishCompanyIssue
);
