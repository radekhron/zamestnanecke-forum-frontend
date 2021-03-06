// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { IssueEdit }               from '../../views';
import * as objectEditActions      from '../../redux/modules/objectEdit';


const mapStateToProps = (state) => {
  return {
    data: state.formData.issue,
    editationState: state.objectEdit
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchObjectDetailAndUpdateFormModel: objectEditActions.fetchObjectDetailAndUpdateFormModel,
      resetModelDetail: objectEditActions.resetModelDetail,
      postObjectForCreateOrUpdate: objectEditActions.postObjectForCreateOrUpdate
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
)(IssueEdit);
