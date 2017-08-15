import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export default class VotingPreparationThemeBoxes extends Component {
  render() {
    return (
      <div>
        {_.chunk(this.props.list, 3).map((row, index) =>
          <div className="row" key={index}>
            {row.map(object =>
              <div className="col-md-4" key={object._id}>
                <div className="well">
                  <h3>
                    {object.name}
                  </h3>
                  <p>
                    {object.description}
                  </p>
                  <select
                    className="form-control"
                    value={object.state}
                    data-id={object._id}
                    onChange={this.props.handleThemeStateChange}
                  >
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
          </div>
        )}
      </div>
    );
  }
}

VotingPreparationThemeBoxes.propTypes = {
  handleThemeStateChange: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired
};
