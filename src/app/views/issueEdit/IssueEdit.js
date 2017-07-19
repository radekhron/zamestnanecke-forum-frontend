// @flow weak

import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';
import {ErrorBox, LoadingBox} from '../../components';
import { Link }       from 'react-router-dom';
import _ from 'lodash';

class IssueEdit extends Component {

  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  componentDidMount() {
    // const { fetchUserDetail } = this.props;
    // fetchUserDetail(this.props.match.params.userID);
  }

  handleFormChange(event) {
    let { formChangeAction } = this.props;
    formChangeAction(event.target.value,event.target.name);
  }

  handleBackClick(event) {
    this.props.history.goBack()
  }

  render() {
    const { issueEdit } = this.props;
    const { isFetching, json, errorMessage } = issueEdit;



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
            <form className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <label className="form-label">Nadpis šablony:</label>
                  <input className="form-control" type="text" name="name" value={json.name} onChange={this.handleFormChange}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Popis šablony:</label><br/>
                  <textarea className="form-control" name="description" onChange={this.handleFormChange}>{json.description}</textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Stav:</label><br/>
                  <select className="form-control" name="state" value={json.state} onChange={this.handleFormChange}>
                    <option value="Draft">Pracovní verze</option>
                    <option value="Active">Aktivní šablona</option>
                    <option value="Suspended">Zastavená šablona</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Standardní šablona:</label><br/>
                  <select className="form-control" name="default" value={json.default} onChange={this.handleFormChange}>
                    <option value="true">Ano</option>
                    <option value="false">Ne</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Standardní šablona pro NACE:</label><br/>
                  <input className="form-control" type="text" name="defaultForSpecificNACE" value={json.defaultForSpecificNACE} onChange={this.handleFormChange}/>
                </div>
                <div className="form-group">
                  <button className="btn btn-default btn-lg btn-block" onClick={this.handleUpdateClick}>
                  {this.props.match.path === '/admin/sablony/vytvorit' && <span>Vytvořit</span>}
                  {this.props.match.path != '/admin/sablony/vytvorit' && <span>Upravit</span>}
                  </button>
                </div>
              </fieldset>
            </form>
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
