import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";

export default class ObjectCreatedDate extends Component {
  render() {
    const { mongodbID } = this.props;
    const date = moment
      .unix(parseInt(mongodbID.substring(0, 8), 16))
      .format("D. M. YYYY");
    return (
      <span>
        {date}
      </span>
    );
  }
}

ObjectCreatedDate.propTypes = {
  mongodbID: PropTypes.string.isRequired
};
