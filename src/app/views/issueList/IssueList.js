// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ErrorBox, LoadingBox } from "../../components";
import { Link } from "react-router-dom";

class IssueList extends Component {
  componentDidMount() {
    const { fetchIssueList } = this.props;
    fetchIssueList();
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
          <h1>Seznam požadavků</h1>
        </div>
        {errorMessage && <ErrorBox errorMessage={errorMessage} />}
        {isFetching && <LoadingBox />}
        <div className="col-md-6 col-md-offset-3 well">
          <Link
            className="btn btn-info btn-lg btn-block"
            to={"/admin/sablony/vytvorit"}
          >
            Vytvořit nový požadavek
          </Link>
        </div>
        {list.map(object =>
          <div className="col-md-4" key={object._id}>
            <div className="well">
              <pre>
                {JSON.stringify(object, null, 2)}
              </pre>
              <Link
                className="btn btn-info btn-lg btn-block"
                to={"/admin/sablony/" + object._id}
              >
                Upravit
              </Link>
            </div>
          </div>
        )}

        <div className="col-md-12">
          <pre>
            {JSON.stringify(this.props, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}

IssueList.propTypes = {
  fetchIssueList: PropTypes.func.isRequired
};

export default IssueList;
