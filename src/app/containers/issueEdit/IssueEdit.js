// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { IssueEdit }               from '../../views';
import * as issueEditActions      from '../../redux/modules/issueEdit';



const mapStateToProps = (state) => {
  return {
    issueEdit: state.issueEdit
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      formChangeAction: issueEditActions.formChangeAction
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
