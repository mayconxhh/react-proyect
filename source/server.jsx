/* eslint linebreak-style: ["error", "windows"]*/
import http from 'http';
import React from 'react';
import fs from 'fs';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import Pages from './pages/containers/Page';
import Layout from './pages/components/Layout';
import messages from './messages.json';

function requestHandler(req, res) {
  const locale = req.headers['accept-language'].indexOf('es') >= 0 ? 'es' : 'en';
  const context = {};
  if (req.url === '/app.js') {
    const routeApp = './build//statics/app.js';
    fs.exists(routeApp, (bolean) => {
      if (bolean) {
        fs.readFile(routeApp, (err, content) => {
          if (err) {
            res.writeHead(500, 'text/plain');
            res.end('Error interno');
          } else {
            res.writeHead(200, 'text/javascript');
            res.write(content);
            res.end();
          }
        });
      }
    });
  } else {
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
          title="Mi primera aplicación"
          content={html}
        />,
      ),
    );
    res.end();
  }
}
const server = http.createServer(requestHandler);
const port = process.env.PORT || 5000;
server.listen(port, (err) => {
  if (err) {
    console.log('Ocurrió un error al iniciar el servidor.');
    return;
  }
  console.log(`Corriendo servidor en el puerto: ${port}`);
});
