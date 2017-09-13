// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ErrorBox, LoadingBox, ObjectState } from "../../components";
import { Link } from "react-router-dom";
import { Control, Form, Errors, actions } from "react-redux-form";

class CompanyEdit extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  componentDidMount() {
    const {
      fetchObjectDetailAndUpdateFormModel,
      resetModelDetail
    } = this.props;
    resetModelDetail("formData.company");
    if (this.props.match.params.companyID) {
      fetchObjectDetailAndUpdateFormModel(
        "/admin/company/",
        this.props.match.params.companyID,
        "formData.company"
      );
    }
  }

  handleBackClick(event) {
    this.props.history.goBack();
  }

  render() {
    const {
      editationState,
      postObjectForCreateOrUpdate,
      history,
      data
    } = this.props;
    const { isFetching, isPosting, errorMessage } = editationState;

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
        <div className="col-md-6 col-md-offset-3">
          <button
            className="btn btn-info btn-lg btn-block"
            onClick={this.handleBackClick}
          >
            Spustit nový požadavek
          </button>
        </div>
        {errorMessage && <ErrorBox errorMessage={errorMessage} />}
        {isFetching && <LoadingBox />}
        <div className="col-md-6 col-md-offset-3">
          <div className="well">
            <Form
              model="formData.company"
              onSubmit={v => console.log("TODO update company")}
              className="form-horizontal"
            >
              <div className="form-group">
                <p>
                  <strong>IČO firmy:</strong> {data.companyID}
                </p>
              </div>
              <div className="form-group">
                <label htmlFor=".name" className="form-label">
                  Obchodní název firmy:
                </label>
                <Control.text
                  model=".name"
                  required
                  id="theme.name"
                  validateOn={["blur", "change"]}
                  className="form-control"
                />
                <Errors
                  className="has-error"
                  component={props =>
                    <span className="help-block">
                      {props.children}
                    </span>}
                  model=".name"
                  messages={{
                    valueMissing: "Tato položka je povinná"
                  }}
                />
              </div>
              <div className="form-group">
                <p>
                  <strong>Stav firmy:</strong>{" "}
                  <ObjectState
                    state={data.state}
                    model={{
                      "Waiting for employees": {
                        style: "warning",
                        text: "Čeká na potvrzené zaměstnance"
                      },
                      Suspended: {
                        style: "danger",
                        text: "Pozastavená"
                      },
                      Approved: {
                        style: "success",
                        text: "Potvrzená bez registrovaného zaměstnavatele"
                      },
                      Active: {
                        style: "success",
                        text: "Plně aktivní"
                      }
                    }}
                  />
                </p>
              </div>
              <div className="form-group">
                <p>
                  <strong>Čekajících zaměstnanců:</strong>{" "}
                  {data.waitingEmployees}
                </p>
              </div>
              <div className="form-group">
                <p>
                  <strong>Potvrzených zaměstnanců:</strong>{" "}
                  {data.approvedEmployees}
                </p>
              </div>
              <div className="form-group">
                <label
                  htmlFor=".contactInformation.dataBoxID"
                  className="form-label"
                >
                  Datová schránka:
                </label>
                <Control.text
                  model=".contactInformation.dataBoxID"
                  validateOn={["blur", "change"]}
                  className="form-control"
                  required
                />
                <Errors
                  className="has-error"
                  component={props =>
                    <span className="help-block">
                      {props.children}
                    </span>}
                  model=".contactInformation.dataBoxID"
                  show="touched"
                  messages={{
                    valueMissing: "Tato položka je povinná"
                  }}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor=".contactInformation.email"
                  className="form-label"
                >
                  Kontaktní e-mail:
                </label>
                <Control.text
                  model=".contactInformation.email"
                  validateOn={["blur", "change"]}
                  className="form-control"
                  validators={{
                    isEmail: email =>
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                        email
                      )
                  }}
                />
                <Errors
                  className="has-error"
                  component={props =>
                    <span className="help-block">
                      {props.children}
                    </span>}
                  model=".contactInformation.email"
                  show="touched"
                  messages={{
                    isEmail: "Zadejte e-mailovou adresu"
                  }}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor=".contactInformation.phone"
                  className="form-label"
                >
                  Kontaktní telefon:
                </label>
                <Control.text
                  model=".contactInformation.phone"
                  validateOn={["blur", "change"]}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor=".contactInformation.street"
                  className="form-label"
                >
                  Adresa - ulice a číslo:
                </label>
                <Control.text
                  model=".contactInformation.street"
                  validateOn={["blur", "change"]}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor=".contactInformation.city"
                  className="form-label"
                >
                  Adresa - město/obec:
                </label>
                <Control.text
                  model=".contactInformation.city"
                  validateOn={["blur", "change"]}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor=".contactInformation.zip" className="form-label">
                  Adresa - PSČ:
                </label>
                <Control.text
                  model=".contactInformation.zip"
                  validateOn={["blur", "change"]}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor=".contactInformation.country"
                  className="form-label"
                >
                  Adresa - země:
                </label>
                <Control.text
                  model=".contactInformation.country"
                  validateOn={["blur", "change"]}
                  className="form-control"
                />
              </div>
            </Form>
            <pre>
              {JSON.stringify(this.props.data, null, 2)}
            </pre>
          </div>
        </div>
        <div className="col-md-12">
          <pre>
            {JSON.stringify(this.props, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}

CompanyEdit.propTypes = {
  // fetchUserDetail: PropTypes.func.isRequired,
  // postUserEdit: PropTypes.func
};

export default CompanyEdit;
