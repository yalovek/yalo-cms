import app from 'yalo-app';
import logger from 'yalo-logger';
import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import routes from './src/routes';

app.get('*', (req, res, next) => {
  match({
    routes,
    location: req.url,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      logger.error(`500 ${error.message}`);

      res.status(500).send(error.message);
    } else if (redirectLocation) {
      const url = redirectLocation.pathname + redirectLocation.search;

      logger.info(`302 ${url}`);

      res.redirect(302, url);
    } else if (renderProps) {
      res.status(200).send(renderToString(<RouterContext {...renderProps} />));
    } else {
      logger.warn('404');

      res.status(404).send(req.url);
    }
  });
});

export default app;
