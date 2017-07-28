// @flow weak

import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';
import {ErrorBox, LoadingBox, CompanyLookup} from '../../components';
import { Link }       from 'react-router-dom';
import { Control, Form, Errors, actions } from 'react-redux-form';
import _ from 'lodash';

class Register extends Component {

  componentDidMount() {
    const { fetchCompanyDetails } = this.props;
    if (this.props.match.params.companyID) {
      fetchCompanyDetails(this.props.match.params.companyID);
    }
  }

  render() {
    const { registerState, registerForm, searchCompanies, companyLookup } = this.props;
    const { isFetching, isPosting, errorMessage } = registerState;
    const { company } = registerForm;
    return(
      <div className="col-md-12">
        {errorMessage &&
          <ErrorBox
            errorMessage={errorMessage}
          />
        }
        {isFetching &&
          <LoadingBox/>
        }
        {!this.props.match.params.companyID &&
          <CompanyLookup
            onCompanySearchClick={ query => searchCompanies(query)}
            isFetching={companyLookup.isFetching}
            companies={companyLookup.companies}
          />
        }
        {this.props.match.params.companyID &&
          <div className="col-md-6 col-md-offset-3">
            <div className="well">
              <pre>{JSON.stringify(registerState, null, 2)}</pre>
              <pre>{JSON.stringify(registerForm, null, 2)}</pre>
              {!isFetching && company &&
                  <div>
                    <h3>{company.name}</h3>
                    <p>IČO: {company.companyID}</p>
                  </div>

              }

              <h2>Veřejné informace</h2>
              <div className="form-group">
                <label>Zaměstnavatel vás uvidí jako:</label>
                <input type="text" ref="idExample" name="idExample" disabled placeholder="EM-Q42-DYT"/>
              </div>

              <h2>Skryté informace</h2>

              <Form
                model="formData.register"
                onSubmit={values => postEmployeeRegistration(values, history)}
                className="form-horizontal"
                validators={{
                  '': {
                    emailsMatch: (values) => values.email === values.emailConfirmation || !values.emailConfirmation || !values.emailConfirmation.length
                  }
                }}
              >
                <div className="form-group">
                  <label htmlFor=".firstName" className="form-label">Křestní jméno:</label>
                  <Control.text
                    model=".firstName"
                    required
                    validateOn={["blur","change"]}
                    className="form-control"
                  />
                  <Errors
                    className="has-error"
                    component={(props) => <span className="help-block">{props.children}</span>}
                    model=".firstName"
                    messages={{
                      valueMissing: 'Tato položka je povinná'
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor=".lastName" className="form-label">Příjmení:</label>
                  <Control.text
                    model=".lastName"
                    required
                    validateOn={["blur","change"]}
                    className="form-control"
                  />
                  <Errors
                    className="has-error"
                    component={(props) => <span className="help-block">{props.children}</span>}
                    model=".lastName"
                    messages={{
                      valueMissing: 'Tato položka je povinná'
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor=".email" className="form-label">E-mail:</label>
                  <Control.text
                    model=".email"
                    type="email"
                    placeholder="vase@adresa.cz"
                    required
                    validators={{
                      isEmail: (email) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
                    }}
                    validateOn={["blur","change"]}
                    className="form-control"
                  />
                  <Errors
                    className="has-error"
                    component={(props) => <span className="help-block">{props.children}</span>}
                    model=".email"
                    show="touched"
                    messages={{
                      valueMissing: 'Tato položka je povinná',
                      isEmail: 'Zadejte e-mailovou adresu'
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor=".emailConfirmation" className="form-label">E-mail pro potvrzení:</label>
                  <Control.text
                    model=".emailConfirmation"
                    type="email"
                    placeholder="vase@adresa.cz"
                    required
                    validators={{
                      isEmail: (email) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
                    }}
                    validateOn={["blur","change"]}
                    className="form-control"
                  />
                  <Errors
                    className="has-error"
                    component={(props) => <span className="help-block">{props.children}</span>}
                    model=".emailConfirmation"
                    show="touched"
                    messages={{
                      valueMissing: 'Tato položka je povinná',
                      isEmail: 'Zadejte e-mailovou adresu',
                      emailsMatch: 'Emailové adresy musí být shodné'
                    }}
                  />
                  <Errors
                    className="has-error"
                    component={(props) => <span className="help-block">{props.children}</span>}
                    model="formData.register"
                    messages={{
                      emailsMatch: 'Emailové adresy musí být shodné'
                    }}
                  />

                </div>
                {!isPosting &&
                  <div className="form-group">
                    <button type="submit" className="btn btn-default btn-lg btn-block">
                       Registrovat
                    </button>
                  </div>
                }
                {isPosting &&
                  <LoadingBox/>
                }
              </Form>


              {
                <form className="form-horizontal">
                  <fieldset>
                    <h2>Veřejné informace</h2>
                    <div className="form-group">
                      <label>Zaměstnavatel vás uvidí jako:</label>
                      <input type="text" ref="idExample" name="idExample" disabled placeholder="EM-Q42-DYT"/>
                    </div>
                    <h2>Skryté informace</h2>
                    <div className="form-group">
                      <label>
                        Křestní jméno:<br/>
                        <input type="text" ref="firstName" name="firstName" />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Příjmení:<br/>
                        <input type="text" ref="lastName" name="lastName" />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        E-mailová adresa:<br/>
                        <input type="text" ref="email" name="email" />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        E-mailová adresa pro potvrzení:<br/>
                        <input type="text" ref="emailInputConfirmation" name="emailConfirmation" />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Telefonní číslo:<br/>
                        <input type="text" ref="phone" name="phone" />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Heslo:<br/>
                        <input type="password" ref="password" name="password" />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Heslo pro potvrzení:<br/>
                        <input type="password" ref="passwordInputConfirmation" name="passwordInputConfirmation" />
                      </label>
                    </div>
                    <button onClick={(event) => this.handleClick(event)}
                     className="btn btn-primary">
                      Registrovat
                    </button>
                  </fieldset>
                </form>
              }


            </div>
            <div>
              <pre>{JSON.stringify(this.props, null, 2)}</pre>
            </div>
          </div>
        }
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
}

export default Register;
