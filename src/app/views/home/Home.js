// @flow weak

import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';
import {CompanyLookup} from '../../components';
import { Link }       from 'react-router-dom';

class Home extends Component {
  static propTypes= {
    currentView:  PropTypes.string.isRequired,
    enterHome:    PropTypes.func.isRequired,
    leaveHome:    PropTypes.func.isRequired,
    searchCompanies: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { enterHome } = this.props;
    enterHome();
  }

  componentWillUnmount() {
    const { leaveHome } = this.props;
    leaveHome();
  }



  render() {
    const { searchCompanies, companyLookup } = this.props;
    return(
      <div>
        <CompanyLookup
          onCompanySearchClick={ query => searchCompanies(query)}
          isFetching={companyLookup.isFetching}
          companies={companyLookup.companies}
        />
      </div>
    );
  }
}

export default Home;
