// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ErrorBox, LoadingBox } from "../../components";
import { Link } from "react-router-dom";

class Login extends Component {
  componentDidMount() {}

  render() {
    const { login } = this.props;
    const { isFetching, isAuthenticated, errorMessage } = login;
    return (
      <div className="col-md-12">
        {errorMessage && <ErrorBox errorMessage={errorMessage} />}
        {isFetching && <LoadingBox />}
        <div className="col-md-6 col-md-offset-3">
          {!isAuthenticated &&
            <div className="well">
              <form className="form-horizontal">
                <fieldset>
                  <div className="form-group">
                    <label>
                      E-mailová adresa:<br />
                      <input type="text" ref="email" name="email" />
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      Heslo:<br />
                      <input type="password" ref="password" name="password" />
                    </label>
                  </div>
                  <button
                    onClick={event => this.handleClick(event)}
                    className="btn btn-primary"
                  >
                    Přihlásit
                  </button>
                </fieldset>
              </form>
            </div>}
          {isAuthenticated &&
            <div className="alert alert-success">
              Jste přihlášení. Můžete pokračovat na hlavní stránku.
            </div>}
          {isFetching &&
            <div>
              <h3>Přihlašuji</h3>
              <div className="progress progress-striped active">
                <div className="progress-bar" style={{ width: "45%" }} />
              </div>
            </div>}

          <div>
            <pre>
              {JSON.stringify(this.props, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  handleClick(event) {
    event.preventDefault();
    const loginData = {
      email: this.refs.email.value.trim(),
      password: this.refs.password.value.trim()
    };
    this.props.postEmployeeLogin(loginData);
  }
}

Login.propTypes = {};

export default Login;
