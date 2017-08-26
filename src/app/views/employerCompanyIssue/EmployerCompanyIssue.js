// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ErrorBox, LoadingBox } from "../../components";
import { appConfig } from "../../config";
import { Link } from "react-router-dom";
import { Control, Form, Errors, actions } from "react-redux-form";
import _ from "lodash";
import DropzoneS3Uploader from "react-dropzone-s3-uploader";

class EmployerCompanyIssue extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleFinishedUpload = this.handleFinishedUpload.bind(this);
    this.handleFileDelete = this.handleFileDelete.bind(this);
  }

  componentDidMount() {
    const { fetchObjectDetail, resetModelDetail, match } = this.props;
    const { path } = match;
    if (path === "/admin/firemni-sablony/zpravy/:companyIssueID") {
      fetchObjectDetail(
        "/admin/companyissue/message/",
        this.props.match.params.companyIssueID
      );
    } else {
      fetchObjectDetail(
        "/employer/companyissue/",
        this.props.match.params.companyIssueID
      );
    }
    resetModelDetail("formData.companyIssueMessage");
  }

  handleBackClick(event) {
    this.props.history.goBack();
  }

  handleFinishedUpload = info => {
    const { pushItemToModel } = this.props;
    pushItemToModel(
      "formData.companyIssueMessage.messageAttachments",
      info.publicUrl
    );
  };

  handleFileDelete = index => {
    const { removeItemFromModel } = this.props;
    removeItemFromModel(
      "formData.companyIssueMessage.messageAttachments",
      index
    );
  };

  render() {
    const {
      companyIssue,
      message,
      postObjectToEndpointAndUpdate,
      userID,
      match,
      resetModelDetail
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
            <p>
              {object.description}
            </p>
          </div>}
        {object &&
          (_.get(object, "messaging")
            ? _.get(object, "messaging").length > 0
            : false) &&
          <div className="section">
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
          </div>}
        <div className="col-md-6 col-md-offset-3">
          <Form
            model="formData.companyIssueMessage"
            onSubmit={v => {
              if (path === "/admin/firemni-sablony/zpravy/:companyIssueID") {
                postObjectToEndpointAndUpdate(
                  "/admin/companyissue/message",
                  object._id,
                  v
                );
              } else {
                postObjectToEndpointAndUpdate(
                  "/employer/companyissue",
                  object._id,
                  v
                );
              }
              resetModelDetail("formData.companyIssueMessage");
            }}
            className="form-horizontal"
          >
            <div className="form-group">
              <label htmlFor=".messageText" className="form-label">
                Vaše zpráva:
              </label>
              <Control.textarea
                model=".messageText"
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
                model=".messageText"
                messages={{
                  valueMissing: "Tato položka je povinná"
                }}
              />
            </div>
            {message.messageAttachments.map((attachment, index) =>
              <div className="form-group" key={index}>
                <button
                  type="button"
                  className="btn btn-danger btn-xs"
                  onClick={() => {
                    this.handleFileDelete({ index });
                  }}
                >
                  X
                </button>{" "}
                {_.last(_.split(attachment, "/"))}
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
                  Uložit odpověď
                </button>
              </div>}
            {isPosting && <LoadingBox />}
          </Form>
        </div>
      </div>
    );
  }
}

EmployerCompanyIssue.propTypes = {
  // fetchUserDetail: PropTypes.func.isRequired,
  // postUserEdit: PropTypes.func
};

export default EmployerCompanyIssue;
