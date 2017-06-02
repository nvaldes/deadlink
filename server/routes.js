/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  var proxy = require('http-proxy-middleware');
  // Insert routes below
  app.use('/api', proxy({
    target: "https://www.staging.c21.weblinc.com",
    changeOrigin: true,
    headers: {
      "X-WEBLINCTOKEN": "362d77d05bca2fcdeb6a35f11fccc1b5"
    }
  }));
  // All undefined asset or api routes should return a 404
  app.route('/:url(auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
