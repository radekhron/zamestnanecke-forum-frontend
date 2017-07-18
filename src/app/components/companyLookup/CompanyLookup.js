import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { Link }       from 'react-router-dom';


export default class CompanyLookup extends Component {

  render() {
    const {isFetching, companies} = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <div className="well">
          {!isFetching &&
          <form className="form-horizontal">
            <fieldset>
              <div className="form-group">
                <label>
                  Jméno firmy:
                  <input type="text" ref="companyName" name="companyName" />
                </label>
                <button onClick={(event) => this.handleClick(event)}
                 className="btn btn-primary">
                  Hledat
                </button>
              </div>
            </fieldset>
          </form>
          }
          {isFetching &&
            <h2>Nahrávám seznam firem...</h2>
          }
        </div>
        {companies.length > 0 &&
          <div className="col-md-12">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>IČ</th>
                  <th>Jméno společnosti</th>
                  <th>ZamForum</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) =>
                  <tr key={company.companyID}>
                    <td>{company.companyID}</td>
                    <td>{company.name}</td>
                    <td>
                      <Link
                        className="btn btn-success"
                        to={'/registrovat/'+company.companyID}>
                        Připojit se
                      </Link>
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        }

      </div>
    )
  }

  handleClick(event) {
    event.preventDefault();
    const companyName = this.refs.companyName
    const query = { search: companyName.value.trim() }
    this.props.onCompanySearchClick(query)
  }
}

CompanyLookup.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  onCompanySearchClick: PropTypes.func.isRequired
}
