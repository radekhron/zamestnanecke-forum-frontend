// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ErrorBox, LoadingBox } from "../../components";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Control, Form, Errors, actions } from "react-redux-form";

class LaunchCompanyIssue extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  componentDidMount() {
    const {
      fetchIssueList,
      fetchObjectDetail,
      mergeDataWithModel
    } = this.props;
    fetchIssueList();
    fetchObjectDetail("/admin/company/", this.props.match.params.companyID);
    mergeDataWithModel("formData.launchCompanyIssue", {
      companyID: this.props.match.params.companyID
    });
  }

  handleBackClick(event) {
    this.props.history.goBack();
  }

  render() {
    const {
      objectEdit,
      launchCompanyIssue,
      issueList,
      history,
      postObjectToEndpoint
    } = this.props;
    const { isFetching, isPosting, errorMessage } = objectEdit;

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
        <div className="col-md-6 col-md-offset-3">
          <div className="well">
            <Form
              model="formData.launchCompanyIssue"
              onSubmit={formValues =>
                postObjectToEndpoint("/admin/launch-companyissue", formValues)}
              className="form-horizontal"
            >
              <div className="form-group">
                <label htmlFor=".issueID" className="form-label">
                  Navázaný požadavek:
                </label>
                <Control.select
                  model=".issueID"
                  required
                  className="form-control"
                  validators={{ valueMissing: val => val.length > 0 }}
                  validateOn="blur"
                >
                  <option value="" disabled>
                    Vyberte požadavek
                  </option>
                  {_.filter(issueList.list, {
                    state: "Active",
                    default: false
                  }).map(issue =>
                    <option value={issue._id} key={issue._id}>
                      {issue.name}
                    </option>
                  )}
                </Control.select>
                <Errors
                  className="has-error"
                  component={props =>
                    <span className="help-block">
                      {props.children}
                    </span>}
                  model=".linkedIssue"
                  messages={{
                    valueMissing: "Tato položka je povinná"
                  }}
                />
              </div>
              {!isPosting &&
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-default btn-lg btn-block"
                  >
                    Poslat firmě požadavek
                  </button>
                </div>}
            </Form>
            {JSON.stringify(launchCompanyIssue, null, 2)}
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

LaunchCompanyIssue.propTypes = {};

export default LaunchCompanyIssue;
