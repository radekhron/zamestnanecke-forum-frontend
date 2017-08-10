// @flow weak

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { VotingPreparation } from "../../views";
import * as objectListActions from "../../redux/modules/objectList";
import _ from "lodash";

const mapStateToProps = state => {
  return {
    objectList: state.objectList,
    next: _.filter(state.objectList.list, ["state", "Next voting season"]),
    inBuffer: _.filter(state.objectList.list, ["state", "In buffer"]),
    inProgress: _.filter(state.objectList.list, [
      "state",
      "Voting in progress"
    ]),
    finished: _.filter(state.objectList.list, ["state", "Finished"])
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchThemeList: objectListActions.fetchThemeList,
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

export default connect(mapStateToProps, mapDispatchToProps)(VotingPreparation);
