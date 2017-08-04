// @flow weak

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { UserDetail } from "../../views";
import * as userDetailActions from "../../redux/modules/userDetail";
import * as objectEditActions from "../../redux/modules/objectEdit";

const mapStateToProps = state => {
  return {
    userDetailProp: state.userDetail,
    editationState: state.objectEdit,
    user: state.formData.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchUserDetail: userDetailActions.fetchUserDetail,
      employmentConfirmationChangeAction:
        userDetailActions.employmentConfirmationChangeAction,
      fetchObjectDetailAndUpdateFormModel:
        objectEditActions.fetchObjectDetailAndUpdateFormModel,
      resetModelDetail: objectEditActions.resetModelDetail,
      postObjectForCreateOrUpdate: objectEditActions.postObjectForCreateOrUpdate
      // postUserEdit: userDetailActions.postUserEdit
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
