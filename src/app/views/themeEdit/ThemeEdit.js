// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ErrorBox, LoadingBox } from "../../components";
import { Link } from "react-router-dom";
import { Control, Form, Errors, actions } from "react-redux-form";
import _ from "lodash";

class ThemeEdit extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  componentDidMount() {
    const {
      fetchIssueList,
      fetchObjectDetailAndUpdateFormModel,
      resetModelDetail
    } = this.props;
    resetModelDetail("formData.theme");
    fetchIssueList();
    if (this.props.match.params.themeID) {
      fetchObjectDetailAndUpdateFormModel(
        "/admin/theme/",
        this.props.match.params.themeID,
        "formData.theme"
      );
    }
  }

  handleBackClick(event) {
    this.props.history.goBack();
  }

  render() {
    const { editationState, postObjectForCreateOrUpdate, history } = this.props;
    const { isFetching, isPosting, errorMessage } = editationState;

    return (
      <div className="col-md-12">
        <div className="col-md-6 col-md-offset-3">
          <button
            className="btn btn-default btn-lg btn-block"
            onClick={this.handleBackClick}
          >
            Zpět
          </button>
        </div>
        {errorMessage && <ErrorBox errorMessage={errorMessage} />}
        {isFetching && <LoadingBox />}
        <div className="col-md-6 col-md-offset-3">
          <div className="well">
            <Form
              model="formData.theme"
              onSubmit={v =>
                postObjectForCreateOrUpdate(
                  "/admin/theme/",
                  v,
                  history,
                  "/admin/temata/seznam"
                )}
              className="form-horizontal"
            >
              <div className="form-group">
                <label htmlFor=".name" className="form-label">
                  Nadpis tématu:
                </label>
                <Control.text
                  model=".name"
                  required
                  id="theme.name"
                  validateOn={["blur", "change"]}
                  className="form-control"
                />
                <Errors
                  className="has-error"
                  component={props =>
                    <span className="help-block">
                      {props.children}
                    </span>}
                  model=".name"
                  messages={{
                    valueMissing: "Tato položka je povinná"
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor=".description" className="form-label">
                  Detail tématu:
                </label>
                <Control.textarea
                  model=".description"
                  required
                  id="theme.description"
                  validateOn={["blur", "change"]}
                  className="form-control"
                />
                <Errors
                  className="has-error"
                  component={props =>
                    <span className="help-block">
                      {props.children}
                    </span>}
                  model=".description"
                  messages={{
                    valueMissing: "Tato položka je povinná"
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor=".linkedIssue" className="form-label">
                  Navázaný požadavek:
                </label>
                <Control.select
                  model=".linkedIssue"
                  required
                  className="form-control"
                  validators={{ valueMissing: val => val.length > 0 }}
                  validateOn="blur"
                >
                  <option value="" disabled>
                    Vyberte požadavek
                  </option>
                  {_.filter(this.props.issueList.list, {
                    state: "Active",
                    default: false
                  }).map(issue =>
                    <option value={issue._id} key={issue._id}>
                      {issue.name}
                    </option>
                  )}
                </Control.select>
                <Errors
                  className="has-error"
                  component={props =>
                    <span className="help-block">
                      {props.children}
                    </span>}
                  model=".linkedIssue"
                  messages={{
                    valueMissing: "Tato položka je povinná"
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor=".state" className="form-label">
                  Stav:
                </label>
                <Control.select
                  model=".state"
                  required
                  className="form-control"
                >
                  <option value="" disabled>
                    Vyberte stav
                  </option>
                  <option value="In buffer">V zásobníku</option>
                  <option value="Next voting season">
                    Hlasování v další sezoně
                  </option>
                  <option value="Voting in progress" disabled>
                    Probíhá hlasování
                  </option>
                  <option value="Finished" disabled>
                    Dokončeno
                  </option>
                </Control.select>
              </div>

              {!isPosting &&
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-default btn-lg btn-block"
                  >
                    {this.props.match.path === "/admin/temata/vytvorit" &&
                      <span>Vytvořit </span>}
                    {this.props.match.path != "/admin/temata/vytvorit" &&
                      <span>Upravit </span>}
                    téma
                  </button>
                </div>}
              {isPosting && <LoadingBox />}
            </Form>
            <pre>
              {JSON.stringify(this.props.data, null, 2)}
            </pre>
          </div>
        </div>
        <div className="col-md-12">
          <pre>
            {JSON.stringify(this.props, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}

ThemeEdit.propTypes = {};

export default ThemeEdit;
