// @flow weak

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { EmailConfirmation } from "../../views";
import * as objectEditActions from "../../redux/modules/objectEdit";

const mapStateToProps = state => {
  return {
    objectDetail: state.objectEdit
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmation);
