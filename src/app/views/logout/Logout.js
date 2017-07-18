// @flow weak

import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';
import { Link }       from 'react-router-dom';

class Logout extends Component {




  render() {
    return(
      <div className="col-md-6 col-md-offset-3">
         <div className="alert alert-success">Jste odhlášení.</div>
        <div>
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        </div>
      </div>

    );
  }

  handleClick(event) {
    event.preventDefault();
    const loginData = {
      email: this.refs.email.value.trim(),
      password: this.refs.password.value.trim()
    }
    this.props.postEmployeeLogin(loginData);
  }


}

Logout.propTypes = {
}

export default Logout;
