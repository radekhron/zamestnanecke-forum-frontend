// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';

const ErrorBox = ({errorMessage}) => {
  return (
    <div className="col-md-6 col-md-offset-3 alert alert-danger">
      {errorMessage}
    </div>
  );
};

ErrorBox.propTypes = {
  errorMessage: PropTypes.string
};

export default ErrorBox;
