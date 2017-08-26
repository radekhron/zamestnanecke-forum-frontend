// @flow weak

import React, {
  Component
  // PropTypes
} from "react";
import { NavigationBar, BackToTop } from "../../components";
import navigationModel from "../../models/navigation.json";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as viewsActions from "../../redux/modules/views";
import * as loginActions from "../../redux/modules/login";
import MainRoutes from "../../routes/MainRoutes";
import { withRouter } from "react-router";

class App extends Component {
  state = {
    navModel: navigationModel
  };

  render() {
    const { navModel } = this.state;

    return (
      <div id="appContainer">
        <NavigationBar
          brand={navModel.brand}
          navModel={navModel}
          isAuthenticated={this.props.isAuthenticated}
          role={this.props.role}
          handleLeftNavItemClick={this.handleLeftNavItemClick}
          handleRightNavItemClick={this.handleRightNavItemClick}
          handleLogoutClick={this.handleLogoutClick}
        />
        <div className="container">
          <MainRoutes />
        </div>
        <footer className="footer">
          <div className="container">
            <p className="text-muted">Copyright 2017 ZamForum</p>
          </div>
        </footer>
        <BackToTop minScrollY={40} scrollTo={"appContainer"} />
      </div>
    );
  }

  handleLeftNavItemClick = (event, viewName) => {
    // something to do here?
  };

  handleRightNavItemClick = (event, viewName) => {
    // something to do here?
  };

  handleLogoutClick = event => {
    this.props.actions.employeeLogout();
  };
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.login.isAuthenticated,
    role: state.login.role
  };
};

// "bindActionCreators" use-case is to pass dispatch to "store non aware children components" (but I feel like it is a good habbit to use it everytime)
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...viewsActions,
        employeeLogout: loginActions.employeeLogout
      },
      dispatch
    )
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
