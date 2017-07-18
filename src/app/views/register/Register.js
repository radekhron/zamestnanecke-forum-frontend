// @flow weak

import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';
import { Link }       from 'react-router-dom';

class Register extends Component {

  componentDidMount() {
    const { fetchCompanyDetails } = this.props;
    fetchCompanyDetails(this.props.match.params.companyID);
  }



  render() {
    const { register } = this.props;
    const { isFetching, company, employeeRegistered } = register;
    return(
      <div className="col-md-6 col-md-offset-3">
        <div className="well">
          {!employeeRegistered &&
            isFetching &&
              <h2>Nahrávám detail firmy...</h2>
          }
          {!employeeRegistered && !isFetching && company &&
              <div>
                <h3>{company.name}</h3>
                <p>IČO: {company.companyID}</p>
              </div>

          }
          {!employeeRegistered &&
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
        {employeeRegistered &&
          <div className="alert alert-success">Děkujeme, jste úspěšně registrovaní. Pokračovat na přihlášení.</div>
        }

        <div>
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        </div>
      </div>

    );
  }

  handleClick(event) {
    event.preventDefault();
    const employee = {
      employee: {
        personalInformation: {
          firstName: this.refs.firstName.value.trim(),
          lastName: this.refs.lastName.value.trim(),
          email: this.refs.email.value.trim(),
          phone: this.refs.phone.value.trim()
        },
        company: {
          companyID: this.props.register.company.companyID,
          name: this.props.register.company.name
        },
        password: this.refs.password.value.trim()
      }
    }
    this.props.postEmployeeRegistration(employee)
  }


}

Register.propTypes = {
  fetchCompanyDetails: PropTypes.func.isRequired,
  postEmployeeRegistration: PropTypes.func.isRequired
}

export default Register;
