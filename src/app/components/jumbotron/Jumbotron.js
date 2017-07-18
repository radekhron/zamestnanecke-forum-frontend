// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';

const Jumbotron = (props) => {
  return (
    <div className="jumbotron col-md-12">
      {props.children}
    </div>
  );
};

Jumbotron.propTypes = {
  children: PropTypes.node
};

export default Jumbotron;
