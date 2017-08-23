// @flow weak

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TaskList } from "../../views";
import * as objectEditActions from "../../redux/modules/objectEdit";

const mapStateToProps = state => {
  return {
    objectEdit: state.objectEdit
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchObjectDetail: objectEditActions.fetchObjectDetail
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
