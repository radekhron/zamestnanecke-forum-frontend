// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThemeEdit }               from '../../views';
import * as objectListActions      from '../../redux/modules/objectList';
import * as objectEditActions      from '../../redux/modules/objectEdit';



const mapStateToProps = (state) => {
  return {
    data: state.formData.theme,
    editationState: state.objectEdit,
    issueList: state.objectList
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchIssueList: objectListActions.fetchIssueList,
      fetchObjectDetailAndUpdateFormModel: objectEditActions.fetchObjectDetailAndUpdateFormModel,
      resetModelDetail: objectEditActions.resetModelDetail,
      postObjectForCreateOrUpdate: objectEditActions.postObjectForCreateOrUpdate
      // formChangeAction: issueEditActions.formChangeAction
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeEdit);
