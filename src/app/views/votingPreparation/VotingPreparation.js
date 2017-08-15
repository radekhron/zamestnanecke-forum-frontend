// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  ErrorBox,
  LoadingBox,
  VotingPreparationThemeBoxes
} from "../../components";
import { Link } from "react-router-dom";

class VotingPreparation extends Component {
  constructor(props) {
    super(props);
    this.handleThemeStateChange = this.handleThemeStateChange.bind(this);
  }

  componentDidMount() {
    const { fetchThemeList } = this.props;
    fetchThemeList();
  }

  componentWillUnmount() {
    const { resetList } = this.props;
    resetList();
  }

  handleThemeStateChange(e) {
    const {
      postObjectForUpdateAndFetchList,
      fetchThemeList,
      postObjectForCreateOrUpdate
    } = this.props;
    // postObjectForCreateOrUpdate("/admin/theme/", {
    //   _id: e.target.getAttribute("data-id"),
    //   state: e.target.value
    // });
    // fetchThemeList();
    postObjectForUpdateAndFetchList(
      "/admin/theme/",
      {
        _id: e.target.getAttribute("data-id"),
        state: e.target.value
      },
      "/admin/theme/list"
    );
  }

  render() {
    const {
      objectList,
      inProgress,
      inBuffer,
      next,
      finished,
      fetchObjectDetail,
      newSeasonStatus
    } = this.props;
    const { isFetching, list, errorMessage } = objectList;
    return (
      <div className="col-md-12">
        <div className="col-md-6 col-md-offset-3 text-center">
          <h1>Přehled hlasování</h1>
        </div>
        {errorMessage && <ErrorBox errorMessage={errorMessage} />}
        {(isFetching || newSeasonStatus.isFetching) && <LoadingBox />}
        <div className="col-md-6 col-md-offset-3 well">
          <button
            className="btn btn-info btn-lg btn-block"
            onClick={() => {
              if (confirm("Opravdu chcete ukončit hlasování a spustit nové?")) {
                fetchObjectDetail("/admin/voting/new-season", null);
              }
            }}
          >
            Ukončit hlasovací sezonu a začít novou
          </button>
        </div>
        {next.length > 0 &&
          <div className="col-md-12">
            <h2>Témata pro příští sezonu</h2>
            <VotingPreparationThemeBoxes
              list={next}
              handleThemeStateChange={this.handleThemeStateChange}
            />
          </div>}

        {inBuffer.length > 0 &&
          <div className="col-md-12">
            <h2>Zásobník témat</h2>
            <VotingPreparationThemeBoxes
              list={inBuffer}
              handleThemeStateChange={this.handleThemeStateChange}
            />
          </div>}

        {inProgress.length > 0 &&
          <div className="col-md-12">
            <h2>Probíhá hlasování</h2>
            {inProgress.map(object =>
              <div className="col-md-4" key={object._id}>
                <div className="well">
                  <pre>
                    {JSON.stringify(object, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>}

        {finished.length > 0 &&
          <div className="col-md-12">
            <h2>Minulá témata</h2>
            {finished.map(object =>
              <div className="col-md-4" key={object._id}>
                <div className="well">
                  <pre>
                    {JSON.stringify(object, null, 2)}
                  </pre>
                </div>
              </div>
            )}
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

VotingPreparation.propTypes = {
  fetchThemeList: PropTypes.func.isRequired
};

export default VotingPreparation;
