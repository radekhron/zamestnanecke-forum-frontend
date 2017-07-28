 // @flow weak

import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';
import {ErrorBox, LoadingBox} from '../../components';
import { appConfig }      from '../../config';
import { Link }       from 'react-router-dom';
import { Control, Form, Errors, actions } from 'react-redux-form';
import _ from 'lodash';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'

class EmployeeHome extends Component {

  constructor(props) {
    super(props);

    this.handleFinishedUpload = this.handleFinishedUpload.bind(this);
    this.handleFileDelete = this.handleFileDelete.bind(this);
  }

  componentDidMount() {
    const { fetchObjectDetail } = this.props;
    fetchObjectDetail('/employee/protected/homepage', null);
  }

  handleFinishedUpload = info => {
    const { postEmploymentConfirmationUrl } = this.props;
    postEmploymentConfirmationUrl(info.publicUrl);
  }

  handleFileDelete = () => {
    const { deleteEmploymentConfirmation, fetchObjectDetail } = this.props;
    deleteEmploymentConfirmation();
  }


  render() {
    const { homepage } = this.props;
    const { isFetching, isPosting, object, errorMessage } = homepage;
    const uploadOptions = {
      server: appConfig.api.serverUrl,
      s3Url: appConfig.api.serverUrl+appConfig.apiVersion+'/s3/uploads/',
      signingUrl: appConfig.apiVersion + '/s3/sign'
    }

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
        {_.get(object,'homepageType') === "New Employee" &&
          <div className="col-md-6 col-md-offset-3">
            <div className="well clearfix">
              <div className="col-md-4 text-center">
                Potvrzený e-mail<br/>
                {_.get(object,'emailConfirmed') === true &&
                  <span className="label label-success">Ano</span>
                }
                {_.get(object,'emailConfirmed') === false &&
                  <span className="label label-danger">Ne</span>
                }
              </div>
              <div className="col-md-4 text-center">
                Nahrané potvrzení o zaměstnání<br/>
                {_.get(object,'employmentConfirmationUploaded') === true &&
                  <div>
                    <span className="label label-success">Ano</span>
                    <a
                    className="btn btn-info"
                    href= {
                      appConfig.api.serverUrl
                      + appConfig.apiVersion
                      + object.pathToEmploymentConfirmation
                    }>
                      Zobrazit soubor
                    </a>
                    <button className="btn btn-danger" onClick={this.handleFileDelete}>Smazat</button>
                  </div>
                }
                {_.get(object,'employmentConfirmationUploaded') === false &&
                  <div>
                    <span className="label label-danger">Ne</span>
                    <DropzoneS3Uploader
                      maxSize={1024 * 1024 * 5}
                      s3Url={appConfig.api.serverUrl+appConfig.apiVersion+'/s3/uploads/'}
                      upload={uploadOptions}
                      onFinish={this.handleFinishedUpload}
                      style={{width:'100%', height: 80,
                              'marginTop': 20,
                              borderWidth: '2px',
                              borderColor: '#666',
                              borderStyle: 'dashed',
                              borderRadius: '5px'}}
                      className='text-center'
                      passChildrenProps={false}
                    >
                      <span>Nahrát soubor</span>
                    </DropzoneS3Uploader>
                  </div>
                }
              </div>
              <div className="col-md-4 text-center">
                ZamForum ověřilo zaměstnání<br/>
                {_.get(object,'employmentConfirmed') === true &&
                  <span className="label label-success">Ano</span>
                }
                {_.get(object,'employmentConfirmed') === false &&
                  <span className="label label-danger">Ne</span>
                }
              </div>
              <div className="col-md-12"><pre>{JSON.stringify(uploadOptions, null, 2)}</pre></div>
              <div className="col-md-12"><pre>{JSON.stringify(object, null, 2)}</pre></div>
              <div className="col-md-12">
                <p>Získat potvrzení o zaměstnání je jednoduché. Stačí si stáhnout jeden z pěti vzorových formulářů, vytisknout ho a zajít na účetní oddělení.</p>
                <ul>
                  <li>Ověření do školky</li>
                  <li>Ověření od banky</li>
                  <li>Ověření pro městský úřad</li>
                  <li>Ověření pro </li>
                  <li>Ověření pro </li>
                </ul>
              </div>
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

EmployeeHome.propTypes = {

}

export default EmployeeHome;
