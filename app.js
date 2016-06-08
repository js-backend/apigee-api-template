'use strict';

var a127 = require('a127-magic');
var express = require('express');
var app = express();

module.exports = app; // for testing

// initialize a127 framework

a127.init(function(config) {

  // include a127 middleware
  app.use(a127.middleware(config));

  // adding ui options
  // install swagger ui https://github.com/apigee-127/magic/issues/6
  var swaggerTools = config['a127.magic'].swaggerTools;
  app.use(swaggerTools.swaggerUi({
    swaggerUi: config.ui.swaggerUi,
    apiDocs: config.ui.apiDocs
  }));

  // error handler to emit errors as a json string
  app.use(function(err, req, res, next) {
    if (typeof err !== 'object') {
      // If the object is not an Error, create a representation that appears to be
      err = {
        message: String(err) // Coerce to string
      };
    } else {
      // Ensure that err.message is enumerable (It is not by default)
      Object.defineProperty(err, 'message', { enumerable: true });
    }

    // Return a JSON representation of #/definitions/ErrorResponse
    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(err));
  });

  var ip = process.env.IP || 'localhost';
  var port = process.env.PORT || 10010;
  // begin listening for client requests
  //  app.listen(port, ip);
  app.listen(port, function() {
    console.log('Express server listening on port: ' + port);
    return console.log('env = ' + app.get('env') + '\n__dirname = ' + __dirname + '\nprocess.cwd = ' + process.cwd());
  });

  console.log('try this:\ncurl http://' + ip + ':' + port + '/hello?name=Scott');
});
