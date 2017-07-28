// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { EmployeeHome }               from '../../views';
import * as objectEditActions      from '../../redux/modules/objectEdit';



const mapStateToProps = (state) => {
  return {
    homepage: state.objectEdit
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchObjectDetail: objectEditActions.fetchObjectDetail,
      postEmploymentConfirmationUrl: objectEditActions.postEmploymentConfirmationUrl,
      deleteEmploymentConfirmation: objectEditActions.deleteEmploymentConfirmation
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
)(EmployeeHome);
