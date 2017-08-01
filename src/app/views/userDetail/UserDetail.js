// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ErrorBox, LoadingBox } from "../../components";
import { appConfig } from "../../config";
import { Link } from "react-router-dom";
import "./UserDetail.scss";

class UserList extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  componentDidMount() {
    const { fetchUserDetail } = this.props;
    fetchUserDetail(this.props.match.params.userID);
  }

  handleFormChange(event) {
    let { employmentConfirmationChangeAction } = this.props;
    employmentConfirmationChangeAction(event.target.value, event.target.name);
  }

  handleBackClick(event) {
    this.props.history.goBack();
  }

  render() {
    const { userDetailProp } = this.props;
    const { isFetching, userDetail, errorMessage } = userDetailProp;

    return (
      <div className="col-md-12">
        <div className="col-md-6 col-md-offset-3">
          <button
            className="btn btn-default btn-lg btn-block"
            onClick={this.handleBackClick}
          >
            Zpět
          </button>
        </div>
        {errorMessage && <ErrorBox errorMessage={errorMessage} />}
        {isFetching && <LoadingBox />}
        {userDetail &&
          <div className="col-md-6 col-md-offset-3">
            <div className="well">
              <h2>
                {userDetail.id}
              </h2>
              <p>
                <strong>
                  {userDetail.personalInformation.firstName}{" "}
                  {userDetail.personalInformation.lastName}
                </strong>
              </p>
              <p>
                Firma: {userDetail.company.name}
              </p>
              <p>
                IČO: {userDetail.company.companyID}
              </p>
              <p>
                Role: {userDetail.data.role}
              </p>
              <p>
                Stav:{" "}
                <span className="label label-success">
                  {userDetail.data.state}
                </span>
              </p>
              <div className="col-md-4 text-center">
                Potvrdil e-mail<br />
                {userDetail.data.emailConfirmed === true &&
                  <span className="label label-success">Ano</span>}
                {userDetail.data.emailConfirmed === false &&
                  <span className="label label-danger">Ne</span>}
              </div>
              <div className="col-md-4 text-center">
                Potvrzení o zaměstnání<br />
                {_.get(userDetail, "data.pathToEmploymentConfirmation") &&
                  <div>
                    <span className="label label-success">Ano</span>
                    <a
                      className="btn btn-info"
                      href={
                        appConfig.api.serverUrl +
                        appConfig.apiVersion +
                        _.get(userDetail,'data.pathToEmploymentConfirmation')
                      }
                    >
                      Zobrazit soubor
                    </a>
                  </div>}
                {_.isString(
                  _.get(userDetail, "data.pathToEmploymentConfirmation")
                ) === false && <span className="label label-danger">Ne</span>}
              </div>
              <div className="col-md-4 text-center">
                Ověřili jsme zaměstnání<br />
                <select
                  name="data.employmentConfirmed"
                  ref="data.employmentConfirmed"
                  value={userDetail.data.employmentConfirmed.toString()}
                  onChange={this.handleFormChange}
                >
                  <option value="true">Ano</option>
                  <option value="false">Ne</option>
                </select>
              </div>

              <p>
                <a href="mailto:{userDetail.personalInformation.email}">
                  {userDetail.personalInformation.email}
                </a>
              </p>
              <p>
                {userDetail.personalInformation.phone}
              </p>
              <p>
                Opt-out:
                {userDetail.personalInformation.optOut === true &&
                  <span className="label label-danger">Ano</span>}
                {userDetail.personalInformation.optOut === false &&
                  <span className="label label-success">Ne</span>}
              </p>
              <button
                className="btn btn-info btn-lg btn-block"
                onClick={this.handleFormChange}
              >
                Uložit
              </button>
              <pre>
                {JSON.stringify(userDetail, null, 2)}
              </pre>
            </div>
          </div>}

        <div className="col-md-12">
          <pre>
            {JSON.stringify(this.props, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}

UserList.propTypes = {
  fetchUserDetail: PropTypes.func.isRequired,
  postUserEdit: PropTypes.func
};

export default UserList;
