// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ErrorBox, LoadingBox } from "../../components";
import { Link } from "react-router-dom";

class CompanyIssueList extends Component {
  componentDidMount() {
    const { fetchListByEndpoint } = this.props;
    fetchListByEndpoint("/admin/companyissue/list");
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
          <h1>Seznam požadavků ve firmách</h1>
        </div>
        {errorMessage && <ErrorBox errorMessage={errorMessage} />}
        {isFetching && <LoadingBox />}
        <div className="col-md-12">
          {list.map(object =>
            <div className="col-md-4" key={object._id}>
              <div className="well">
                <pre>
                  {JSON.stringify(object, null, 2)}
                </pre>
                <Link
                  className="btn btn-info btn-lg btn-block"
                  to={"/admin/firemni-sablony/zpravy/" + object._id}
                >
                  Odpovědět
                </Link>
                <Link
                  className="btn btn-success btn-lg btn-block"
                  to={"/admin/firemni-sablony/publikace/" + object._id}
                >
                  Připravit k zveřejnění
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

CompanyIssueList.propTypes = {
  fetchListByEndpoint: PropTypes.func.isRequired
};

export default CompanyIssueList;
