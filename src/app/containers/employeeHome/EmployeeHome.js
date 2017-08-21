// @flow weak

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { EmployeeHome } from "../../views";
import * as objectEditActions from "../../redux/modules/objectEdit";
import * as votingActions from "../../redux/modules/voting";
import _ from "lodash";

const mapStateToProps = state => {
  return {
    homepage: state.objectEdit,
    votableThemes: _.filter(_.get(state.objectEdit, "object.themes"), [
      "state",
      "Voting in progress"
    ]),
    votedFor: _.get(state.objectEdit, "object.votedFor"),
    voteStatus: state.voting
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchObjectDetail: objectEditActions.fetchObjectDetail,
      postEmploymentConfirmationUrl:
        objectEditActions.postEmploymentConfirmationUrl,
      deleteEmploymentConfirmation:
        objectEditActions.deleteEmploymentConfirmation,
      fetchVoteStatus: votingActions.fetchVoteStatus
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeHome);
