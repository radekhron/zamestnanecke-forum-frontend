// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  ErrorBox,
  LoadingBox,
  ObjectState,
  ObjectCreatedDate
} from "../../components";
import { appConfig } from "../../config";
import { Link } from "react-router-dom";
import { Control, Form, Errors, actions } from "react-redux-form";
import _ from "lodash";
import moment from "moment";
import DropzoneS3Uploader from "react-dropzone-s3-uploader";

class EmployeeHome extends Component {
  constructor(props) {
    super(props);

    this.handleFinishedUpload = this.handleFinishedUpload.bind(this);
    this.handleFileDelete = this.handleFileDelete.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    const { fetchObjectDetail } = this.props;
    fetchObjectDetail("/employee/protected/homepage", null);
  }

  handleFinishedUpload = info => {
    const { postEmploymentConfirmationUrl } = this.props;
    postEmploymentConfirmationUrl(info.publicUrl);
  };

  handleFileDelete = () => {
    const { deleteEmploymentConfirmation, fetchObjectDetail } = this.props;
    deleteEmploymentConfirmation();
  };

  handleVote = e => {
    const { fetchVoteStatus } = this.props;
    fetchVoteStatus(
      "/employee/protected/vote",
      e.target.getAttribute("data-id"),
      e.target.getAttribute("data-type")
    );
  };

  render() {
    const { homepage, votedFor, votableThemes } = this.props;
    const { isFetching, isPosting, object, errorMessage } = homepage;
    const uploadOptions = {
      server: appConfig.api.serverUrl,
      s3Url: appConfig.api.serverUrl + appConfig.apiVersion + "/s3/uploads/",
      signingUrl: appConfig.apiVersion + "/s3/sign"
    };

    return (
      <div className="col-md-12">
        {errorMessage && <ErrorBox errorMessage={errorMessage} />}
        {isFetching && <LoadingBox />}
        {_.get(object, "homepageType") === "New Employee" &&
          <div className="col-md-6 col-md-offset-3">
            <div className="well clearfix">
              <div className="col-md-4 text-center">
                Potvrzený e-mail<br />
                {_.get(object, "emailConfirmed") === true &&
                  <span className="label label-success">Ano</span>}
                {_.get(object, "emailConfirmed") === false &&
                  <span className="label label-danger">Ne</span>}
              </div>
              <div className="col-md-4 text-center">
                Nahrané potvrzení o zaměstnání<br />
                {_.get(object, "employmentConfirmationUploaded") === true &&
                  <div>
                    <span className="label label-success">Ano</span>
                    <a
                      className="btn btn-info"
                      href={
                        appConfig.api.serverUrl +
                        appConfig.apiVersion +
                        object.pathToEmploymentConfirmation
                      }
                    >
                      Zobrazit soubor
                    </a>
                    <button
                      className="btn btn-danger"
                      onClick={this.handleFileDelete}
                    >
                      Smazat
                    </button>
                  </div>}
                {_.get(object, "employmentConfirmationUploaded") === false &&
                  <div>
                    <span className="label label-danger">Ne</span>
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
                  </div>}
              </div>
              <div className="col-md-4 text-center">
                ZamForum ověřilo zaměstnání<br />
                {_.get(object, "employmentConfirmed") === true &&
                  <span className="label label-success">Ano</span>}
                {_.get(object, "employmentConfirmed") === false &&
                  <span className="label label-danger">Ne</span>}
              </div>
              <div className="col-md-12">
                <pre>
                  {JSON.stringify(uploadOptions, null, 2)}
                </pre>
              </div>
              <div className="col-md-12">
                <pre>
                  {JSON.stringify(object, null, 2)}
                </pre>
              </div>
              <div className="col-md-12">
                <p>
                  Získat potvrzení o zaměstnání je jednoduché. Stačí si stáhnout
                  jeden z pěti vzorových formulářů, vytisknout ho a zajít na
                  účetní oddělení.
                </p>
                <ul>
                  <li>Ověření do školky</li>
                  <li>Ověření od banky</li>
                  <li>Ověření pro městský úřad</li>
                  <li>Ověření pro </li>
                  <li>Ověření pro </li>
                </ul>
              </div>
            </div>
          </div>}

        {_.get(object, "homepageType") === "Waiting company" &&
          <div className="col-md-6 col-md-offset-3 alert alert-info">
            <h3>
              Ve vaší firmě {object.company.name} je už potvrzeno celkem{" "}
              {object.company.approvedEmployees} ze 3 požadovaných zaměstnanců
            </h3>
            <div className="progress progress-striped active">
              <div
                className="progress-bar"
                style={{ width: "{object.company.approvedEmployees / 3}%" }}
              />
            </div>
          </div>}

        {_.get(object, "homepageType") === "Active company" &&
          <div className="col-md-12">
            <h3>Hlasovat můžete pro následující témata:</h3>
            <h4>
              Zbývající pozitivní hlasy{" "}
              {3 - _.filter(votedFor, ["type", "positive"]).length}
            </h4>
            <h4>
              Zbývající negativní hlasy{" "}
              {1 - _.filter(votedFor, ["type", "negative"]).length}
            </h4>
            {_.chunk(votableThemes, 3).map((row, index) =>
              <div className="row" key={index}>
                {row.map(theme =>
                  <div className="col-md-4" key={theme._id}>
                    <div className="well">
                      <h3>
                        {theme.name}
                      </h3>
                      <p>
                        {theme.description}
                      </p>
                      <p>
                        Celková bilance hlasů: {theme.votes.total}
                      </p>
                      <button
                        className={
                          "btn btn-default" +
                          " " +
                          (_.find(votedFor, {
                            companyThemeID: theme._id,
                            type: "positive"
                          })
                            ? "btn-success"
                            : "")
                        }
                        onClick={this.handleVote}
                        data-id={theme._id}
                        data-type="positive"
                      >
                        +
                      </button>
                      <button
                        className={
                          "btn btn-default" +
                          " " +
                          (_.find(votedFor, {
                            companyThemeID: theme._id,
                            type: "negative"
                          })
                            ? "btn-danger"
                            : "")
                        }
                        onClick={this.handleVote}
                        data-id={theme._id}
                        data-type="negative"
                      >
                        -
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <h3>Požadavky na zaměstnavatele</h3>
            {_.chunk(_.get(object, "issues"), 3).map((row, index) =>
              <div className="row" key={index}>
                {row.map(issue =>
                  <div className="col-md-4" key={issue._id}>
                    <div className="well">
                      <h3>
                        {issue.name}
                      </h3>
                      <p>
                        {issue.description}
                      </p>
                      <p>
                        <strong>Požadavek zaslán zaměstnavateli:</strong>
                        <br />
                        <ObjectCreatedDate mongodbID={issue._id} />
                      </p>
                      {issue.lastEditDate &&
                        <p>
                          <strong>Poslední aktivita:</strong>
                          <br />
                          {moment(issue.lastEditDate).format("D. M. YYYY")}
                        </p>}
                      <p>
                        <strong>Stav:</strong>
                        <br />
                        <ObjectState
                          state={issue.state}
                          model={{
                            Created: {
                              style: "info",
                              text: "Zadán zaměstnavateli"
                            },
                            "To rework": {
                              style: "warning",
                              text: "K přepracování"
                            },
                            Published: {
                              style: "success",
                              text: "Zveřejněné výsledky"
                            }
                          }}
                        />
                      </p>
                      {issue.officialResponse &&
                        <p>
                          <strong>Vyjádření zaměstnavatele:</strong>
                          <br />
                          {issue.officialResponse}
                        </p>}
                      <p>
                        <strong>Přílohy:</strong>
                      </p>
                      <ul>
                        {issue.attachmentsToBePublished.map(attachment =>
                          <li key={attachment}>
                            <a
                              href={
                                appConfig.api.serverUrl +
                                appConfig.apiVersion +
                                attachment
                              }
                            >
                              {_.last(_.split(attachment, "/"))}
                            </a>
                          </li>
                        )}
                      </ul>
                      <pre>
                        {JSON.stringify(issue, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>}
      </div>
    );
  }
}

EmployeeHome.propTypes = {};

export default EmployeeHome;
