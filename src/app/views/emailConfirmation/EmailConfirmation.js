// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ErrorBox, LoadingBox } from "../../components";
import { Link } from "react-router-dom";

class EmailConfirmation extends Component {
  componentDidMount() {
    const { fetchObjectDetail } = this.props;
    fetchObjectDetail("/employee/confirm-email/", this.props.match.params.id);
  }

  render() {
    const { objectDetail } = this.props;
    const { isFetching, object, errorMessage } = objectDetail;
    return (
      <div className="col-md-12">
        {errorMessage && <ErrorBox errorMessage={errorMessage} />}
        {isFetching && <LoadingBox />}
        {object === "email confirmed" &&
          <div className="col-md-6 col-md-offset-3 alert alert-success">
            E-mailová adresa je úspěšně potvrzena
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

EmailConfirmation.propTypes = {
  fetchObjectDetail: PropTypes.func.isRequired
};

export default EmailConfirmation;
