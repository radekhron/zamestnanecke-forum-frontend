// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Register }               from '../../views';
import * as registerActions      from '../../redux/modules/register';



const mapStateToProps = (state) => {
  return {
    register: state.register
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchCompanyDetails: registerActions.fetchCompanyDetails,
      postEmployeeRegistration: registerActions.postEmployeeRegistration
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
)(Register);
