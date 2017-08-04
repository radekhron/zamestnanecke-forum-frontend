// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ErrorBox, LoadingBox } from "../../components";
import { appConfig } from "../../config";
import { Link } from "react-router-dom";
import { Control, Form, Errors, actions } from "react-redux-form";
import "./UserDetail.scss";

class UserList extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  componentDidMount() {
    const {
      fetchUserDetail,
      fetchObjectDetailAndUpdateFormModel,
      resetModelDetail
    } = this.props;
    resetModelDetail("formData.user");
    if (this.props.match.params.userID) {
      fetchObjectDetailAndUpdateFormModel(
        "/admin/employee/",
        this.props.match.params.userID,
        "formData.user"
      );
    }
  }

  handleFormChange(event) {
    let { employmentConfirmationChangeAction } = this.props;
    employmentConfirmationChangeAction(event.target.value, event.target.name);
  }

  handleBackClick(event) {
    this.props.history.goBack();
  }

  render() {
    const {
      userDetailProp,
      editationState,
      user,
      postObjectForCreateOrUpdate
    } = this.props;
    const { isFetching, errorMessage, isPosting } = editationState;

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
        {user &&
          <div className="col-md-6 col-md-offset-3 clearfix">
            <div className="well clearfix">
              <Form
                model="formData.user"
                onSubmit={v =>
                  postObjectForCreateOrUpdate(
                    "/admin/employee/",
                    v,
                    history,
                    "/admin/uzivatele/seznam"
                  )}
                className="form-horizontal"
              >
                <h2>
                  {user.id}
                </h2>
                <p>
                  <strong>
                    {user.personalInformation.firstName}{" "}
                    {user.personalInformation.lastName}
                  </strong>
                </p>
                <p>
                  Firma: {user.company.name}
                </p>
                <p>
                  IČO: {user.company.companyID}
                </p>
                <p>
                  Role: {user.data.role}
                </p>

                <div className="form-group">
                  <label htmlFor=".data.state" className="form-label">
                    Stav:
                  </label>
                  <Control.select
                    model=".data.state"
                    required
                    className="form-control"
                  >
                    <option value="" disabled>
                      Vyberte stav
                    </option>
                    <option value="New">Nový</option>
                    <option value="Active">Aktivní</option>
                    <option value="Suspended">Pozastavený</option>
                    <option value="Terminated">Ukončený</option>
                  </Control.select>
                </div>
                <div className="col-md-12">
                  <div className="col-md-4 text-center">
                    Potvrdil e-mail<br />
                    {user.data.emailConfirmed === true &&
                      <span className="label label-success">Ano</span>}
                    {user.data.emailConfirmed === false &&
                      <span className="label label-danger">Ne</span>}
                  </div>
                  <div className="col-md-4 text-center">
                    Potvrzení o zaměstnání<br />
                    {_.get(user, "data.pathToEmploymentConfirmation") &&
                      <div>
                        <span className="label label-success">Ano</span>
                        <a
                          className="btn btn-info"
                          href={
                            appConfig.api.serverUrl +
                            appConfig.apiVersion +
                            _.get(user, "data.pathToEmploymentConfirmation")
                          }
                        >
                          Zobrazit soubor
                        </a>
                      </div>}
                    {_.isString(
                      _.get(user, "data.pathToEmploymentConfirmation")
                    ) === false &&
                      <span className="label label-danger">Ne</span>}
                  </div>
                  <div className="col-md-4 text-center">
                    Ověřili jsme zaměstnání<br />
                    <Control.select
                      model=".data.employmentConfirmed"
                      required
                      className="form-control"
                    >
                      <option value="true">Ano</option>
                      <option value="false">Ne</option>
                    </Control.select>
                  </div>
                </div>

                <p>
                  <a href="mailto:{user.personalInformation.email}">
                    {user.personalInformation.email}
                  </a>
                </p>
                <p>
                  {user.personalInformation.phone}
                </p>
                <p>
                  Opt-out:
                  {user.personalInformation.optOut === true &&
                    <span className="label label-danger">Ano</span>}
                  {user.personalInformation.optOut === false &&
                    <span className="label label-success">Ne</span>}
                </p>
                {!isPosting &&
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-default btn-lg btn-block"
                    >
                      Uložit
                    </button>
                  </div>}
                {isPosting && <LoadingBox />}
                <pre>
                  {JSON.stringify(user, null, 2)}
                </pre>
              </Form>
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
