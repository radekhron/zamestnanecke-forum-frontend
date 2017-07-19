// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { IssueList }               from '../../views';
import * as objectListActions      from '../../redux/modules/objectList';



const mapStateToProps = (state) => {
  return {
    objectList: state.objectList
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchIssueList: objectListActions.fetchIssueList
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
)(IssueList);
