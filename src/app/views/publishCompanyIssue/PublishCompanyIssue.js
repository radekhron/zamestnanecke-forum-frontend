// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ErrorBox, LoadingBox } from "../../components";
import { appConfig } from "../../config";
import { Link } from "react-router-dom";
import { Control, Form, Errors, actions } from "react-redux-form";
import _ from "lodash";
import DropzoneS3Uploader from "react-dropzone-s3-uploader";

class PublishCompanyIssue extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleFinishedUpload = this.handleFinishedUpload.bind(this);
  }

  componentDidMount() {
    const {
      resetModelDetail,
      match,
      fetchObjectDetailAndUpdateFormModel
    } = this.props;
    const { path } = match;
    fetchObjectDetailAndUpdateFormModel(
      "/admin/companyissue/",
      this.props.match.params.companyIssueID,
      "formData.companyIssuePublish.attachments",
      "attachments"
    );
    resetModelDetail("formData.companyIssuePublish");
  }

  handleBackClick(event) {
    this.props.history.goBack();
  }

  handleFinishedUpload = info => {
    const { pushItemToModel } = this.props;
    pushItemToModel("formData.companyIssuePublish.attachments", info.publicUrl);
  };

  render() {
    const {
      companyIssue,
      message,
      publish,
      postCompanyIssueForPublishAndForwardToTheList,
      userID,
      match,
      resetModelDetail,
      history
    } = this.props;
    const { isFetching, isPosting, errorMessage, object } = companyIssue;
    const { path } = match;
    const uploadOptions = {
      server: appConfig.api.serverUrl,
      s3Url: appConfig.api.serverUrl + appConfig.apiVersion + "/s3/uploads/",
      signingUrl: appConfig.apiVersion + "/s3/sign"
    };

    return (
      <div className="col-md-12">
        {object &&
          <div className="col-md-6 col-md-offset-3">
            <h2>
              {object.name}
            </h2>
            <h4>
              Firma IČO {object.companyID}
            </h4>
            <p>
              {object.description}
            </p>
          </div>}
        <div className="col-md-6 col-md-offset-3">
          <pre>
            {JSON.stringify(publish, null, 2)}
          </pre>
          <Form
            model="formData.companyIssuePublish"
            onSubmit={v => {
              postCompanyIssueForPublishAndForwardToTheList(
                object._id,
                v,
                history
              );
            }}
            className="form-horizontal"
          >
            <div className="form-group">
              <label htmlFor=".messageText" className="form-label">
                Vyjádření pro zaměstnance:
              </label>
              <Control.textarea
                model=".officialResponse"
                required
                validateOn={["blur", "change"]}
                className="form-control"
              />
              <Errors
                className="has-error"
                component={props =>
                  <span className="help-block">
                    {props.children}
                  </span>}
                model=".officialResponse"
                messages={{
                  valueMissing: "Tato položka je povinná"
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor=".state" className="form-label">
                Stav:
              </label>
              <Control.select model=".state" required className="form-control">
                <option value="" disabled>
                  Vyberte stav
                </option>
                <option value="Published">Zveřejnit</option>
                <option value="Unpublished">Schovat</option>
              </Control.select>
            </div>
            <h4>Přílohy k zveřejnění</h4>
            {publish.attachments.map((attachment, index) =>
              <div className="checkbox form-group" key={index}>
                <label>
                  <Control.checkbox
                    model=".attachmentsToBePublished[]"
                    value={attachment}
                  />
                  {_.last(_.split(attachment, "/"))}
                </label>
              </div>
            )}
            <div className="form-group">
              <DropzoneS3Uploader
                maxSize={1024 * 1024 * 5}
                s3Url={
                  appConfig.api.serverUrl +
                  appConfig.apiVersion +
                  "/s3/uploads/"
                }
                upload={uploadOptions}
                onFinish={this.handleFinishedUpload}
                style={{
                  width: "100%",
                  height: 80,
                  marginTop: 20,
                  marginBottom: "20px",
                  borderWidth: "2px",
                  borderColor: "#666",
                  borderStyle: "dashed",
                  borderRadius: "5px"
                }}
                className="text-center"
                passChildrenProps={false}
              >
                <span>Nahrát soubor</span>
              </DropzoneS3Uploader>
            </div>
            {!isPosting &&
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-default btn-lg btn-block"
                >
                  Zveřejnit odpověď na požadavek
                </button>
              </div>}
            {isPosting && <LoadingBox />}
          </Form>
        </div>
        {object &&
          (_.get(object, "messaging")
            ? _.get(object, "messaging").length > 0
            : false) &&
          <div className="section">
            <div className="col-md-12">
              <h3>Předchozí zprávy</h3>
              {object.messaging.map((message, index) =>
                <div
                  className={
                    message.messageBy === userID
                      ? "col-md-7 col-md-offset-5"
                      : "col-md-7"
                  }
                  key={index}
                >
                  <div
                    className={
                      "panel " +
                      (message.messageBy === userID
                        ? "panel-info"
                        : "panel-success")
                    }
                  >
                    <div className="panel-heading">
                      Zpráva od: {message.messageBy}
                    </div>
                    <div className="panel-body">
                      {message.messageText}
                      {message.messageAttachments.length > 0 &&
                        <div>
                          <h5>Přílohy:</h5>
                          {message.messageAttachments.map(attachment =>
                            <div key={attachment}>
                              <a
                                href={
                                  appConfig.api.serverUrl +
                                  appConfig.apiVersion +
                                  attachment
                                }
                              >
                                {_.last(_.split(attachment, "/"))}
                              </a>
                            </div>
                          )}
                        </div>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>}
      </div>
    );
  }
}

PublishCompanyIssue.propTypes = {
  // fetchUserDetail: PropTypes.func.isRequired,
  // postUserEdit: PropTypes.func
};

export default PublishCompanyIssue;
