/* eslint linebreak-style: ["error", "windows"]*/
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedHTMLMessage } from 'react-intl';

const Error = () => (
  <div className="Error">
    <h1>Error</h1>
    <ul>
      <li>
        <Link to="/">
          <FormattedHTMLMessage id="error.404" />
        </Link>
      </li>
    </ul>
  </div>
);

export default Error;
