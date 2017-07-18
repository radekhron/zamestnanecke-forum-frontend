// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Login }               from '../../views';
import * as loginActions      from '../../redux/modules/login';



const mapStateToProps = (state) => {
  return {
    login: state.login
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      postEmployeeLogin: loginActions.postEmployeeLogin
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
)(Login);
