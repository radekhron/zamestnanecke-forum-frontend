import React, { Component, PropTypes } from 'react'

export default class TestComponent extends Component {

  render() {

    return (
      <div className="col-md-6 col-md-offset-3">
        <div className="well">
          <form className="form-horizontal">
            <fieldset>
              <div className="form-group">
                <label>
                  Jméno firmy:
                  <input type="text" ref="companyName" name="companyName" />
                </label>
                <button
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
}

TestComponent.propTypes = {

}
