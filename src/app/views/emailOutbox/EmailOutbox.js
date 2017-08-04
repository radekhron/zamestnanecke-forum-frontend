// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ErrorBox, LoadingBox } from "../../components";
import { Link } from "react-router-dom";
import _ from "lodash";

class EmailOutbox extends Component {
  componentDidMount() {
    const { fetchListByEndpoint } = this.props;
    fetchListByEndpoint("/admin/emailOutbox/list");
  }

  componentWillUnmount() {
    const { resetList } = this.props;
    resetList();
  }

  render() {
    const { objectList } = this.props;
    const { isFetching, list, errorMessage } = objectList;
    return (
      <div className="col-md-12">
        <div className="col-md-6 col-md-offset-3 text-center">
          <h1>Seznam emailů</h1>
        </div>
        {errorMessage && <ErrorBox errorMessage={errorMessage} />}
        {isFetching && <LoadingBox />}
        <div className="col-md-12">
          {_.reverse(list).map(object =>
            <div className="col-md-12" key={object._id}>
              <div className="well">
                <pre>
                  {JSON.stringify(object, null, 2)}
                </pre>
                <Link
                  className="btn btn-info btn-lg btn-block"
                  to={"/admin/email/" + object._id}
                >
                  Prohlédnout
                </Link>
              </div>
            </div>
          )}
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

EmailOutbox.propTypes = {
  fetchListByEndpoint: PropTypes.func.isRequired
};

export default EmailOutbox;
