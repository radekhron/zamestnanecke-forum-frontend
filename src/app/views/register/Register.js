// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ErrorBox, LoadingBox, CompanyLookup } from "../../components";
import { commonPasswords } from "../../config";
import { Link } from "react-router-dom";
import { Control, Form, Errors, actions } from "react-redux-form";
import _ from "lodash";

class Register extends Component {
  componentDidMount() {
    const { fetchCompanyDetails, resetModelDetail } = this.props;
    resetModelDetail("formData.register");
    if (this.props.match.params.companyID) {
      fetchCompanyDetails(this.props.match.params.companyID);
    }
  }

  render() {
    const {
      registerState,
      registerForm,
      searchCompanies,
      companyLookup,
      postEmployeeRegistration,
      postEmployerRegistration,
      history
    } = this.props;
    const { isFetching, isPosting, errorMessage } = registerState;
    const { company } = registerForm;
    return (
      <div className="col-md-12">
        {errorMessage && <ErrorBox errorMessage={errorMessage} />}
        {isFetching && <LoadingBox />}
        {!this.props.match.params.companyID &&
          !this.props.match.params.registrationToken &&
          <CompanyLookup
            onCompanySearchClick={query => searchCompanies(query)}
            isFetching={companyLookup.isFetching}
            companies={companyLookup.companies}
          />}
        {(this.props.match.params.companyID ||
          this.props.match.params.registrationToken) &&
          <div className="col-md-6 col-md-offset-3">
            <div className="well">
              <pre>
                {JSON.stringify(registerForm, null, 2)}
              </pre>
              {!isFetching &&
                company &&
                <div>
                  <h3>
                    {company.name}
                  </h3>
                  <p>
                    IČO: {company.companyID}
                  </p>
                </div>}

              {this.props.match.params.companyID &&
                <div>
                  <h2>Veřejné informace</h2>
                  <div className="form-group">
                    <label>Zaměstnavatel vás uvidí jako:</label>
                    <input
                      type="text"
                      ref="idExample"
                      name="idExample"
                      disabled
                      placeholder="EM-Q42-DYT"
                    />
                  </div>

                  <h2>Skryté informace</h2>
                </div>}

              <Form
                model="formData.register"
                onSubmit={values => {
                  if (this.props.match.params.companyID) {
                    postEmployeeRegistration(values, history);
                  } else {
                    postEmployerRegistration(
                      values,
                      history,
                      this.props.match.params.registrationToken
                    );
                  }
                }}
                className="form-horizontal"
                validators={{
                  "": {
                    emailsMatch: values =>
                      values.email === values.emailConfirmation ||
                      !values.emailConfirmation ||
                      !values.emailConfirmation.length,
                    passwordsMatch: values =>
                      values.password === values.passwordConfirmation ||
                      !values.passwordConfirmation ||
                      !values.passwordConfirmation.length
                  }
                }}
              >
                <div className="form-group">
                  <label htmlFor=".firstName" className="form-label">
                    Křestní jméno:
                  </label>
                  <Control.text
                    model=".firstName"
                    required
                    validateOn={["blur", "change"]}
                    className="form-control"
                  />
                  <Errors
                    className="has-error"
                    component={props =>
                      <span className="help-block">
                        {props.children}
                      </span>}
                    model=".firstName"
                    messages={{
                      valueMissing: "Tato položka je povinná"
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor=".lastName" className="form-label">
                    Příjmení:
                  </label>
                  <Control.text
                    model=".lastName"
                    required
                    validateOn={["blur", "change"]}
                    className="form-control"
                  />
                  <Errors
                    className="has-error"
                    component={props =>
                      <span className="help-block">
                        {props.children}
                      </span>}
                    model=".lastName"
                    messages={{
                      valueMissing: "Tato položka je povinná"
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor=".email" className="form-label">
                    E-mail:
                  </label>
                  <Control.text
                    model=".email"
                    type="email"
                    placeholder="vase@adresa.cz"
                    required
                    validators={{
                      isEmail: email =>
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                          email
                        )
                    }}
                    validateOn={["blur", "change"]}
                    className="form-control"
                  />
                  <Errors
                    className="has-error"
                    component={props =>
                      <span className="help-block">
                        {props.children}
                      </span>}
                    model=".email"
                    show="touched"
                    messages={{
                      valueMissing: "Tato položka je povinná",
                      isEmail: "Zadejte e-mailovou adresu"
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor=".emailConfirmation" className="form-label">
                    E-mail pro potvrzení:
                  </label>
                  <Control.text
                    model=".emailConfirmation"
                    type="email"
                    placeholder="vase@adresa.cz"
                    required
                    validators={{
                      isEmail: email =>
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                          email
                        )
                    }}
                    validateOn={["blur", "change"]}
                    className="form-control"
                  />
                  <Errors
                    className="has-error"
                    component={props =>
                      <span className="help-block">
                        {props.children}
                      </span>}
                    model=".emailConfirmation"
                    show="touched"
                    messages={{
                      valueMissing: "Tato položka je povinná",
                      isEmail: "Zadejte e-mailovou adresu",
                      emailsMatch: "Emailové adresy musí být shodné"
                    }}
                  />
                  <Errors
                    className="has-error"
                    component={props =>
                      <span className="help-block">
                        {props.children}
                      </span>}
                    model="formData.register"
                    messages={{
                      emailsMatch: "Emailové adresy musí být shodné"
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor=".password" className="form-label">
                    Heslo:
                  </label>
                  <Control.text
                    model=".password"
                    type="password"
                    required
                    validators={{
                      longPassword: email => email.length > 7,
                      notCommonPassword: password =>
                        commonPasswords.find(value => value === password) ===
                        undefined
                    }}
                    validateOn={["blur", "change"]}
                    className="form-control"
                  />
                  <Errors
                    className="has-error"
                    component={props =>
                      <span className="help-block">
                        {props.children}
                      </span>}
                    model=".password"
                    show="touched"
                    messages={{
                      valueMissing: "Tato položka je povinná",
                      longPassword: "Zadejte heslo dlouhé alespoň 8 znaků",
                      notCommonPassword:
                        "Zadejte heslo, které není běžně používané na českém internetu"
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor=".passwordConfirmation" className="form-label">
                    Heslo pro potvrzení:
                  </label>
                  <Control.text
                    model=".passwordConfirmation"
                    type="password"
                    required
                    validators={{}}
                    validateOn={["blur", "change"]}
                    className="form-control"
                  />
                  <Errors
                    className="has-error"
                    component={props =>
                      <span className="help-block">
                        {props.children}
                      </span>}
                    model=".passwordConfirmation"
                    show="touched"
                    messages={{
                      valueMissing: "Tato položka je povinná"
                    }}
                  />
                  <Errors
                    className="has-error"
                    component={props =>
                      <span className="help-block">
                        {props.children}
                      </span>}
                    model="formData.register"
                    messages={{
                      passwordsMatch: "Hesla musí být shodné"
                    }}
                  />
                </div>
                {!isPosting &&
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-default btn-lg btn-block"
                    >
                      Registrovat
                    </button>
                  </div>}
                {isPosting && <LoadingBox />}
              </Form>
            </div>
            <div>
              <pre>
                {JSON.stringify(this.props, null, 2)}
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

  // handleClick(event) {
  //   event.preventDefault();
  //   const employee = {
  //     employee: {
  //       personalInformation: {
  //         firstName: this.refs.firstName.value.trim(),
  //         lastName: this.refs.lastName.value.trim(),
  //         email: this.refs.email.value.trim(),
  //         phone: this.refs.phone.value.trim()
  //       },
  //       company: {
  //         companyID: this.props.register.company.companyID,
  //         name: this.props.register.company.name
  //       },
  //       password: this.refs.password.value.trim()
  //     }
  //   }
  //   this.props.postEmployeeRegistration(employee)
  // }
}

Register.propTypes = {
  fetchCompanyDetails: PropTypes.func.isRequired,
  postEmployeeRegistration: PropTypes.func.isRequired
};

export default Register;
