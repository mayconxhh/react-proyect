/* eslint linebreak-style: ["error", "windows"]*/
import http from 'http';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import Pages from './pages/containers/Page';
import Layout from './pages/components/Layout';

import messages from './messages.json';

function requestHandler(req, res) {
  const locale = req.headers['accept-language'].indexOf('es') >= 0 ? 'es' : 'en';
  const context = {};

  let html = renderToString(
    <IntlProvider locale={locale} messages={messages[locale]}>
      <StaticRouter location={req.url} context={context}>
        <Pages />
      </StaticRouter>
    </IntlProvider>,
  );

  res.setHeader('Content-Type', 'text/html');

  if (context.redirect) {
    res.writeHead(301, {
      Location: context.redirect.pathname,
    });
    res.end();
  }

  if (context.missed) {
    res.writeHead(404);

    html = renderToString(
      <IntlProvider locale={locale} messages={messages[locale]}>
        <StaticRouter location={req.url} context={context}>
          <Pages />
        </StaticRouter>
      </IntlProvider>,
    );
  }

  res.write(
    renderToStaticMarkup(
      <Layout
        title="Aplicación"
        content={html}
      />,
    ),
  );
  res.end();
}

const server = http.createServer(requestHandler);

server.listen(5000, (err) => {
  if (err) {
    console.log('Ocurrió un error al iniciar el servidor.');
    return;
  }

  console.log('Corriendo servidor en el puerto: 5000');
});
