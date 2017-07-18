// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserList }               from '../../views';
import * as userListActions      from '../../redux/modules/userList';



const mapStateToProps = (state) => {
  return {
    userListProp: state.userList
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchUserList: userListActions.fetchUserList
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
)(UserList);
