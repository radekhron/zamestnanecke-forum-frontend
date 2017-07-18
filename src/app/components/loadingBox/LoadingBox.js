// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';

const LoadingBox = () => {
  return (
    <div className="col-md-6 col-md-offset-3 alert alert-info">
      <h3>Nahrávám</h3>
      <div className="progress progress-striped active">
       <div className="progress-bar" style={{width: '70%'}}></div>
      </div>
    </div>
  );
};

LoadingBox.propTypes = {
};

export default LoadingBox;
