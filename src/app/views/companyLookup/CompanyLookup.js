import React, { Component } from 'react'
import PropTypes            from 'prop-types'

class CompanyLookup extends Component {

  render() {

    return (
      <div className="col-md-6 col-md-offset-3">
        <div className="well">
          <form className="form-horizontal">
            <fieldset>
              <div className="form-group">
                <label>
                  Jméno firmy v kontajneru:
                  <input type="text" ref="companyName" name="companyName" />
                </label>
                <button onClick={(event) => this.handleClick(event)}
                type="submit" className="btn btn-primary">
                  Hledat
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }

  handleClick(event) {
    const companyName = this.refs.companyName
    const query = { search: companyName.value.trim() }
  }
}

CompanyLookup.propTypes = {
  enterHome: PropTypes.func.isRequired,
  leaveHome: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

export default CompanyLookup
