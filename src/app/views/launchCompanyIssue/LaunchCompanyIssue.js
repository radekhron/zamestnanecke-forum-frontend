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
    const { objectEdit, launchCompanyIssue, objectList, history } = this.props;
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
