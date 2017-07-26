// @flow weak

import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';
import {ErrorBox, LoadingBox} from '../../components';
import { Link }       from 'react-router-dom';
import { Control, Form, Errors, actions } from 'react-redux-form';

class IssueEdit extends Component {

  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  componentDidMount() {
    const { fetchObjectDetailAndUpdateFormModel, resetModelDetail } = this.props;
    resetModelDetail('formData.issue');
    if (this.props.match.params.issueID) {
      fetchObjectDetailAndUpdateFormModel('/admin/issue/',this.props.match.params.issueID,'formData.issue');
    }

  }

  handleBackClick(event) {
    this.props.history.goBack()
  }

  render() {
    const { editationState, postObjectForCreateOrUpdate, history } = this.props;
    const { isFetching, isPosting, errorMessage } = editationState;

    return(
      <div className="col-md-12">
        <div className="col-md-6 col-md-offset-3">
          <button className="btn btn-default btn-lg btn-block" onClick={this.handleBackClick}>Zpět</button>
        </div>
        {errorMessage &&
          <ErrorBox
            errorMessage={errorMessage}
          />
        }
        {isFetching &&
          <LoadingBox/>
        }
        <div className="col-md-6 col-md-offset-3">
          <div className="well">
            <Form
              model="formData.issue"
              onSubmit={v => postObjectForCreateOrUpdate('/admin/issue/',v, history, '/admin/sablony/seznam')}
              className="form-horizontal"
            >
              <div className="form-group">
                <label htmlFor=".name" className="form-label">Nadpis šablony:</label>
                <Control.text
                  model=".name"
                  required
                  id="theme.name"
                  validateOn={["blur","change"]}
                  className="form-control"
                />
                <Errors
                  className="has-error"
                  component={(props) => <span className="help-block">{props.children}</span>}
                  model=".name"
                  messages={{
                    valueMissing: 'Tato položka je povinná'
                  }}
                />
              </div>
              <pre>{JSON.stringify(this.props.data, null, 2)}</pre>
            </Form>
          </div>
        </div>
        <div className="col-md-12">
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        </div>
      </div>

    );

  }


}

IssueEdit.propTypes = {
  // fetchUserDetail: PropTypes.func.isRequired,
  // postUserEdit: PropTypes.func
}

export default IssueEdit;
