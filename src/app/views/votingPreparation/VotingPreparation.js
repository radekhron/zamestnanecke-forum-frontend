// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ErrorBox, LoadingBox } from "../../components";
import { Link } from "react-router-dom";

class VotingPreparation extends Component {
  componentDidMount() {
    const { fetchThemeList } = this.props;
    fetchThemeList();
  }

  componentWillUnmount() {
    const { resetList } = this.props;
    resetList();
  }

  render() {
    const { objectList, inProgress, inBuffer, next, finished } = this.props;
    const { isFetching, list, errorMessage } = objectList;
    return (
      <div className="col-md-12">
        <div className="col-md-6 col-md-offset-3 text-center">
          <h1>Přehled hlasování</h1>
        </div>
        {errorMessage && <ErrorBox errorMessage={errorMessage} />}
        {isFetching && <LoadingBox />}
        <div className="col-md-6 col-md-offset-3 well">
          <button
            className="btn btn-info btn-lg btn-block"
            onClick={() => {
              if (confirm("Opravdu chcete ukončit hlasování a spustit nové?")) {
                alert("Creating new season");
              }
            }}
          >
            Ukončit hlasovací sezonu a začít novou
          </button>
        </div>
        {next &&
          <div className="col-md-12">
            <h2>Témata pro příští sezonu</h2>
            {next.map(object =>
              <div className="col-md-4" key={object._id}>
                <div className="well">
                  <h3>
                    {object.name}
                  </h3>
                  <p>
                    {object.description}
                  </p>
                  <select className="form-control">
                    <option value="" disabled>
                      Vyberte stav
                    </option>
                    <option value="In buffer">V zásobníku</option>
                    <option value="Next voting season">
                      Hlasování v další sezoně
                    </option>
                    <option value="Voting in progress" disabled>
                      Probíhá hlasování
                    </option>
                    <option value="Finished" disabled>
                      Dokončeno
                    </option>
                  </select>
                </div>
              </div>
            )}
          </div>}

        {inBuffer &&
          <div className="col-md-12">
            <h2>Zásobník témat</h2>
            {inBuffer.map(object =>
              <div className="col-md-4" key={object._id}>
                <div className="well">
                  <pre>
                    {JSON.stringify(object, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>}

        {inProgress &&
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

        {finished &&
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
