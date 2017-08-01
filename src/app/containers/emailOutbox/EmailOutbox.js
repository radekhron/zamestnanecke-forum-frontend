// @flow weak

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { EmailOutbox } from "../../views";
import * as objectListActions from "../../redux/modules/objectList";

const mapStateToProps = state => {
  return {
    objectList: state.objectList
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchListByEndpoint: objectListActions.fetchListByEndpoint,
      resetList: objectListActions.resetList
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailOutbox);
