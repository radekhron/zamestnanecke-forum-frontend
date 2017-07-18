// @flow weak

import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';
import {ErrorBox, LoadingBox} from '../../components';
import { Link }       from 'react-router-dom';
import './UserDetail.scss'

class UserList extends Component {

  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleEmploymentConfirmationChange = this.handleEmploymentConfirmationChange.bind(this);
  }

  componentDidMount() {
    const { fetchUserDetail } = this.props;
    fetchUserDetail(this.props.match.params.userID);
  }

  handleEmploymentConfirmationChange(event) {
    console.log(event.target.name);
    let { employmentConfirmationChangeAction } = this.props;
    employmentConfirmationChangeAction(event.target.value,event.target.name);
  }

  render() {
    const { userDetailProp } = this.props;
    const { isFetching, userDetail, errorMessage } = userDetailProp;

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
        {userDetail &&
          <div className="col-md-6 col-md-offset-3">
            <div className="well">
              <h2>{userDetail.id}</h2>
              <p><strong>{userDetail.personalInformation.firstName} {userDetail.personalInformation.lastName}</strong></p>
              <p>Firma: {userDetail.company.companyName}</p>
              <p>IČO: {userDetail.company.companyID}</p>
              <p>Role: {userDetail.data.role}</p>
              <p>Stav: <span className="label label-success">{userDetail.data.state}</span></p>
              <div className="col-md-4 text-center">
                Potvrdil e-mail<br/>
                {userDetail.data.emailConfirmed === true &&
                  <span className="label label-success">Ano</span>
                }
                {userDetail.data.emailConfirmed === false &&
                  <span className="label label-danger">Ne</span>
                }
              </div>
              <div className="col-md-4 text-center">
                Potvrzení o zaměstnání<br/>
                {userDetail.data.pathToEmploymentConfirmation &&
                  <a href={userDetail.data.pathToEmploymentConfirmation} className="button button-info">Stáhnout</a>
                }
                {userDetail.data.emailConfirmed === false &&
                  <span className="label label-danger">Ne</span>
                }
              </div>
              <div className="col-md-4 text-center">
                Ověřili jsme zaměstnání<br/>
                <select name="data.employmentConfirmed" ref="data.employmentConfirmed" value={userDetail.data.employmentConfirmed.toString()} onChange={this.handleEmploymentConfirmationChange}>
                  <option value="true">Ano</option>
                  <option value="false">Ne</option>
                </select>
              </div>
              <pre>{JSON.stringify(userDetail, null, 2)}</pre>
            </div>
          </div>
        }

        <div className="col-md-12">
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        </div>
      </div>

    );

  }


}

UserList.propTypes = {
  fetchUserDetail: PropTypes.func.isRequired,
  postUserEdit: PropTypes.func
}

export default UserList;
