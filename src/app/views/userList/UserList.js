// @flow weak

import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';
import {ErrorBox, LoadingBox} from '../../components';
import { Link }       from 'react-router-dom';

class UserList extends Component {

  componentDidMount() {
    const { fetchUserList } = this.props;
    fetchUserList();
  }



  render() {
    const { userListProp } = this.props;
    const {isFetching, userList, errorMessage} = userListProp;
    return(
      <div className="col-md-12">
        {errorMessage &&
          <ErrorBox
            errorMessage={errorMessage}
          />
        }
        {isFetching &&
          <LoadingBox/>
        }
        {userList.map((user) =>
          <div className="col-md-4" key={user.id}>
            <div className="well">
              <h3>{user.id}</h3>
              <p><strong>{user.personalInformation.firstName} {user.personalInformation.lastName}</strong></p>
              <p>Firma: {user.company.companyName}</p>
              <p>IČO: {user.company.companyID}</p>
              <p>Role: {user.data.role}</p>
              <p>Stav: {user.data.state}</p>
              <Link
                className="btn btn-info"
                to={'/admin/uzivatele/'+user.id}>
                Detail/Editace
              </Link>
            </div>
          </div>
        )}

        <div className="col-md-12">
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        </div>
      </div>

    );
  }

  handleClick(event) {

  }


}

UserList.propTypes = {
  fetchUserList: PropTypes.func.isRequired,
}

export default UserList;
