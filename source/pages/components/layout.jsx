/* eslint linebreak-style: ["error", "windows"]*/
import React from 'react';
import PropTypes from 'prop-types';

function Layout(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
      </head>
      <body>
        <div
          id="render-target"
          dangerouslySetInnerHTML={{
            __html: props.content,
          }}
        />
        <script src="/app.js" />
      </body>
    </html>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

Layout.defaultProps = {
  title: null,
  content: null,
};

export default Layout;
