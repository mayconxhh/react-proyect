/* eslint linebreak-style: ["error", "windows"]*/
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const Header = () => (
  <header className="Header">
    <h1>
      <FormattedMessage id="title" />
    </h1>
    <nav role="navigation">
      <Link to="/">
        <FormattedMessage id="header.nav.home" />
      </Link>
    </nav>
  </header>
);

export default Header;
