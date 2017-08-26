import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export default class ObjectState extends Component {
  render() {
    const { state, model } = this.props;
    return (
      <span className={"label label-" + _.get(model, state + ".style")}>
        {_.get(model, state + ".text")}
      </span>
    );
  }
}

ObjectState.propTypes = {
  state: PropTypes.string.isRequired,
  model: PropTypes.object.isRequired
};
