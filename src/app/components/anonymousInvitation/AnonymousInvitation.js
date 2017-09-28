import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ErrorBox, LoadingBox } from "../.";

export default class AnonymousInvitation extends Component {
  render() {
    const { onInviteClick, communicationState } = this.props;
    const { isPosting, wasPosting, errorMessage } = communicationState;
    return (
      <div>
        {errorMessage && <ErrorBox errorMessage={errorMessage} />}
        {isPosting && <LoadingBox />}
        <div className="col-md-6 col-md-offset-3">
          <div className="well">
            {wasPosting && (
              <div className="alert alert-success">
                Kolegu {communicationState.object} jste úspěšně pozvali
              </div>
            )}
            <form className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <label>
                    E-mailová adresa:
                    <input type="email" ref="email" name="email" />
                  </label>
                  <button
                    onClick={event => this.handleClick(event)}
                    className="btn btn-primary"
                  >
                    Pozvat anonymně kolegu
                  </button>
                </div>
              </fieldset>
            </form>
            <h3>
              Vašemu kolegovi pošleme jednoduchou zprávu v následujícím znění
            </h3>
            <div className="mock-email">
              <h4>Předmět: Kolega vás pozval do anonymních odborů</h4>
              <h4>Odesílatel: info@zamforum.cz</h4>
              <p>Drahý kolego,</p>
              <p>
                v naší firmě vznikají anonymní odbory. V případě zájmu se
                podívej na zamforum.cz. Odbory můžou přinést mnoho dobrého.
                Například transparentní informace o proplácení přesčasů.
              </p>
              <p>
                Jestli chceš zůstat v anonymitě, doporučuji prohlédnout tuto
                webovou stránku až doma. Kde tě nemůže náš zaměstnavatel
                sledovat.
              </p>
              <p>S pozdravy,</p>
              <p>Jeden z tvých kolegů </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleClick(event) {
    event.preventDefault();
    const email = this.refs.email.value.trim();
    const companyID = this.props.companyID;
    this.props.onInviteClick(email, companyID);
  }
}

AnonymousInvitation.propTypes = {
  onInviteClick: PropTypes.func.isRequired
};
