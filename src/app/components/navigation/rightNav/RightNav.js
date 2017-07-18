// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';
import RightNavButton     from './rightNavButton/RightNavButton';

const RightNav = ({
  rightLinks,
  onRightNavButtonClick,
  onLogoutClick,
  isAuthenticated,
  role
}) => {
  return (
    <ul className="nav navbar-nav navbar-right">
      {
        rightLinks.map(
          (aLinkBtn, index) => {
            if (
              (isAuthenticated === false && aLinkBtn.isAuthenticated === false) ||
              (isAuthenticated === true && aLinkBtn.isAuthenticated === true && (aLinkBtn.role === null || aLinkBtn.role === role))
            ) {
              if (aLinkBtn.label === 'Odhlásit') {
                var handleClickFunction = onLogoutClick;
              } else {
                var handleClickFunction = onRightNavButtonClick;
              }
              return (
                <RightNavButton
                  key={index}
                  link={aLinkBtn.link}
                  label={aLinkBtn.label}
                  viewName={aLinkBtn.view}
                  onClick={handleClickFunction}
                />
              );
            }
          }
        )
      }
    </ul>
  );
};

RightNav.propTypes = {
  rightLinks: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      label: PropTypes.string,
      viewName: PropTypes.string,
      isAuthenticated: PropTypes.bool,
      role: PropTypes.string
    })
  ),
  onRightNavButtonClick: PropTypes.func
};

export default RightNav;
