/*
 * osx-quit
 * https://github.com/shidel-dev/osx-quit
 *
 * Copyright (c) 2014 shidel.dev
 * Licensed under the MIT license.
 */

'use strict';
var exec = require('child_process').exec;
var quit = require("commander");

// Exec function as a string in osa
quit.osa = function(osaFunction) {
  var args = Array.prototype.slice.call(arguments, 1, arguments.length);
  var jsonArgs = args.map(JSON.stringify);
  var functionCallString = 'JSON.stringify((' + osaFunction.toString() + ')(' + jsonArgs.join(',') + '));';
  var escapedCall = functionCallString.replace(/^\s+/g, ' ').replace(/\n/g, '').replace(/'/g, "'\\''");
  var executeString = "osascript -l JavaScript -e '" + escapedCall + "'";
  console.log(executeString);
  exec(executeString);
};

quit.version("0.1.0");

quit
  .command("*")
  .action(function(app){
    quit.osa(quit.quitApp, app)
  })


quit.quitApp = function(app) {
  Application(app).quit();
};

quit.parse(process.argv);



