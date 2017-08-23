// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ErrorBox, LoadingBox } from "../../components";
import { Link } from "react-router-dom";

class TaskList extends Component {
  componentDidMount() {
    const { fetchObjectDetail } = this.props;
    fetchObjectDetail("/admin/tasks", null);
  }

  componentWillUnmount() {}

  render() {
    const { objectEdit } = this.props;
    const { isFetching, object, errorMessage } = objectEdit;
    return (
      <div className="col-md-12">
        <div className="col-md-6 col-md-offset-3 text-center">
          <h1>Seznam úkolů</h1>
        </div>
        {errorMessage && <ErrorBox errorMessage={errorMessage} />}
        {isFetching && <LoadingBox />}
        {_.get(object, "companyIssues") &&
          <div className="col-md-12">
            <h2>Požadavky s odpovědí zaměstnavatele</h2>
            {_.get(object, "companyIssues").map(object =>
              <div className="col-md-4" key={object._id}>
                <div className="well">
                  <h4>
                    {object.name}
                  </h4>
                  <h5>
                    IČO {object.companyID}
                  </h5>
                  <Link
                    className="btn btn-danger btn-lg btn-block"
                    to={"/admin/sablony/" + object._id}
                  >
                    Odpovědět
                  </Link>
                  <Link
                    className="btn btn-danger btn-lg btn-block"
                    to={"/admin/sablony/" + object._id}
                  >
                    Připravit k zveřejnění
                  </Link>
                </div>
              </div>
            )}
          </div>}

        {_.get(object, "employees") &&
          <div className="col-md-12">
            <h2>Žádosti o potvrzení zaměstnání</h2>
            {_.get(object, "employees").map(object =>
              <div className="col-md-4" key={object._id}>
                <div className="well">
                  <h4>
                    {object._id}
                  </h4>
                  <h5>
                    {object.company.name}
                  </h5>
                  <Link
                    className="btn btn-info btn-lg btn-block"
                    to={"/admin/uzivatele/" + object._id}
                  >
                    Prohlédnout
                  </Link>
                </div>
              </div>
            )}
          </div>}

        <div className="col-md-12">
          <pre>
            {JSON.stringify(
              _.get(this.props, "objectEdit.object.employees"),
              null,
              2
            )}
          </pre>
        </div>
      </div>
    );
  }
}

TaskList.propTypes = {
  fetchObjectDetail: PropTypes.func.isRequired
};

export default TaskList;
